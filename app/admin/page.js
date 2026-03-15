'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const STATUSES = ['Pending', 'Confirmed', 'Completed']

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
}

export default function Admin() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [form, setForm] = useState({
    customer_name: '', customer_phone: '', customer_email: '', date: '',
    cake_size: '6" 2 layer', flavor: 'Strawberry', filling: 'No filling',
    notes: '', deposit: false, status: 'Pending'
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('pickup_date', { ascending: true })
    if (error) console.error('Error fetching orders:', error)
    else setOrders(data || [])
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async () => {
    if (!form.customer_name || !form.pickup_date) return
    if (selectedOrder) {
      const { error } = await supabase
        .from('orders')
        .update({
          customer_name: form.customer_name,
          customer_phone: form.customer_phone,
          customer_email: form.customer_email,
          pickup_date: form.pickup_date,
          cake_size: form.cake_size,
          flavor: form.flavor,
          filling: form.filling,
          notes: form.notes,
          deposit: form.deposit,
          status: form.status,
        })
        .eq('id', selectedOrder.id)
      if (error) console.error('Update error:', error)
    } else {
      const { error } = await supabase
        .from('orders')
        .insert([{
          customer_name: form.customer_name,
          customer_phone: form.customer_phone,
          customer_email: form.customer_email,
          pickup_date: form.pickup_date,
          cake_size: form.cake_size,
          flavor: form.flavor,
          filling: form.filling,
          notes: form.notes,
          deposit: form.deposit,
          status: form.status,
        }])
      if (error) console.error('Insert error:', error)
    }
    await fetchOrders()
    setShowForm(false)
    setSelectedOrder(null)
    setForm({
      customer_name: '', customer_phone: '', customer_email: '', pickup_date: '',
      cake_size: '6" 2 layer', flavor: 'Strawberry', filling: 'No filling',
      notes: '', deposit: false, status: 'Pending'
    })
  }

  const handleEdit = (order) => {
    setSelectedOrder(order)
    setForm(order)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) console.error('Delete error:', error)
    await fetchOrders()
    setSelectedOrder(null)
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#C0392B] font-medium tracking-widest uppercase text-xs mb-1">bake o&apos;clock</p>
            <h1 className="text-3xl font-bold text-[#2C2C2A]">Order Dashboard</h1>
          </div>
          <button
            onClick={() => {
              setShowForm(true)
              setSelectedOrder(null)
              setForm({
                customer_name: '', customer_phone: '', customer_email: '', pickup_date: '',
                cake_size: '6" 2 layer', flavor: 'Strawberry', filling: 'No filling',
                notes: '', deposit: false, status: 'Pending'
              })
            }}
            className="bg-[#C0392B] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#a93226] transition-colors"
          >
            + New Order
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: orders.length },
            { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
            { label: 'Deposits Paid', value: orders.filter(o => o.deposit).length },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-[#F9C4C4] text-center">
              <p className="text-3xl font-bold text-[#C0392B]">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-[#2C2C2A] opacity-50">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-[#2C2C2A] opacity-50">No orders yet!</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 border border-[#F9C4C4] flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-[#2C2C2A]">{order.customer_name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                    {order.deposit && <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800 font-medium">Deposit paid</span>}
                  </div>
                  <p className="text-sm text-[#2C2C2A] opacity-60">
                    {order.customer_phone} · Pickup: {order.pickup_date ? new Date(order.pickup_date + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '—'}
                  </p>
                  <p className="text-sm text-[#2C2C2A] opacity-60">{order.cake_size} · {order.flavor} · {order.filling}</p>
                  {order.notes && <p className="text-sm text-[#2C2C2A] opacity-40 mt-1 italic">{order.notes}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(order)} className="text-xs border border-[#F9C4C4] px-4 py-2 rounded-xl hover:border-[#C0392B] transition-colors">Edit</button>
                  <button onClick={() => handleDelete(order.id)} className="text-xs border border-red-200 text-red-400 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-lg border border-[#F9C4C4] shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-[#2C2C2A] mb-6">{selectedOrder ? 'Edit Order' : 'New Order'}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Customer name</label>
                    <input name="customer_name" value={form.customer_name} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Phone</label>
                    <input name="customer_phone" value={form.customer_phone} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Email</label>
                  <input name="customer_email" value={form.customer_email} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Pickup date</label>
                    <input type="date" name="pickup_date" value={form.pickup_date} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]">
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Cake size</label>
                    <select name="cake_size" value={form.cake_size} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]">
                      {['6" 2 layer','6" 3 layer','8" 2 layer','8" 3 layer','10" 3 layer','Vintage 6"','Vintage 8"'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widests text-[#2C2C2A] opacity-60 mb-1 block">Flavor</label>
                    <select name="flavor" value={form.flavor} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]">
                      {['Strawberry','Vanilla','Funfetti','Chocolate','Red Velvet','Pistachio','Banana','Coconut','Piña Colada','Cookies & Cream'].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Filling</label>
                  <select name="filling" value={form.filling} onChange={handleChange} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]">
                    {['No filling','Strawberry glaze','Banana pudding','Cream cheese','Fresh fruit','Pistachio pudding','Coconut pudding','Cheesecake pudding','Cookies & cream pudding','Chocolate ganache','Nutella'].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-1 block">Design notes</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full border border-[#F9C4C4] rounded-xl px-4 py-2 text-sm bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B] resize-none" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="deposit" checked={form.deposit} onChange={handleChange} className="w-4 h-4 accent-[#C0392B]" />
                  <span className="text-sm text-[#2C2C2A]">Deposit paid</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSubmit} className="flex-1 bg-[#C0392B] text-white py-3 rounded-xl font-semibold hover:bg-[#a93226] transition-colors">
                  {selectedOrder ? 'Save changes' : 'Add order'}
                </button>
                <button onClick={() => setShowForm(false)} className="flex-1 border border-[#F9C4C4] text-[#2C2C2A] py-3 rounded-xl font-semibold hover:border-[#C0392B] transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}