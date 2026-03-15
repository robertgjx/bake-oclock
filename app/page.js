'use client'
import { supabase } from './supabase'
import emailjs from '@emailjs/browser'
import { useState } from 'react'

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-screen bg-[#FFF8F0]">

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-[#F9C4C4] shadow-2xl">
            <div className="w-20 h-20 bg-[#F9C4C4] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#C0392B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2C2C2A] mb-2">Order received! 🎂</h3>
            <p className="text-[#2C2C2A] opacity-60 mb-2">Thank you for your order request.</p>
            <p className="text-[#2C2C2A] opacity-60 mb-8">Stefanie will reach out to you shortly to confirm your order and collect the 50% deposit.</p>
            <div className="bg-[#FFF8F0] rounded-2xl p-4 mb-8 border border-[#F9C4C4]">
              <p className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-50 mb-1">Payment via</p>
              <p className="text-sm text-[#2C2C2A] font-medium">Cashapp: $bakeoclockk</p>
              <p className="text-sm text-[#2C2C2A] font-medium">Zelle: (956) 600-4653</p>
            </div>
            <button
              onClick={() => {
                setShowSuccess(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="bg-[#C0392B] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#a93226] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-[#C0392B] font-bold text-2xl tracking-tight">
          bake o&apos;clock
        </div>
        <div className="flex gap-8 text-[#2C2C2A] font-medium">
          <a href="#gallery" className="hover:text-[#C0392B] transition-colors">Gallery</a>
          <a href="#menu" className="hover:text-[#C0392B] transition-colors">Menu</a>
          <a href="#about" className="hover:text-[#C0392B] transition-colors">About</a>
          <a href="#order" className="hover:text-[#C0392B] transition-colors">Order</a>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-8 py-24">
        <p className="text-[#C0392B] font-medium tracking-widest uppercase text-sm mb-4">
          custom cakes &amp; sweets · est. 2019
        </p>
        <h1 className="text-7xl font-bold text-[#2C2C2A] leading-tight mb-6">
          bake o&apos;clock
        </h1>
        <p className="text-xl text-[#2C2C2A] opacity-70 max-w-xl mb-10">
          Handcrafted buttercream cakes made with love in Mission, TX.
          No fondant. Just beautiful, delicious cakes for your special moments.
        </p>
        <a href="#order" className="bg-[#C0392B] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#a93226] transition-colors">
          Order a cake
        </a>
      </section>

      <div className="w-full h-2 bg-[#F9C4C4]" />

      <section id="gallery" className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#C0392B] font-medium tracking-widest uppercase text-sm text-center mb-2">
            our work
          </p>
          <h2 className="text-4xl font-bold text-[#2C2C2A] text-center mb-12">
            made with buttercream & love
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              '/9DA2CAB3-FCA5-4B1F-A662-4D7E5B284BB3.JPG',
              '/F7A9CD8B-263E-48D0-A2FF-42226F83F13B.JPG',
              '/FCCBDC04-0C24-4907-9144-EDC8BD8D6FA2.JPG',
              '/IMG_2046.jpeg',
              '/IMG_2068.jpeg',
              '/IMG_2142.jpeg',
              '/IMG_2453.jpeg',
            ].map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img
                  src={src}
                  alt={`Bake O'Clock cake ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="px-8 py-20 bg-[#FFF8F0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#C0392B] font-medium tracking-widest uppercase text-sm text-center mb-2">
            the menu
          </p>
          <h2 className="text-4xl font-bold text-[#2C2C2A] text-center mb-4">
            cake flavors & options
          </h2>
          <p className="text-center text-[#2C2C2A] opacity-50 mb-16 text-sm">
            All cakes made with signature Swiss Meringue Buttercream · choose up to 2 icing colors
          </p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-3xl p-8 border border-[#F9C4C4] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#F9C4C4] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#C0392B]" />
                </div>
                <h3 className="text-lg font-bold text-[#2C2C2A] uppercase tracking-widest text-sm">Round Cakes</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { size: '6" · 2 layer', serves: "serves 8-10", price: "$50" },
                  { size: '6" · 3 layer', serves: "serves 15-20", price: "$60" },
                  { size: '8" · 2 layer', serves: "serves 20-25", price: "$70" },
                  { size: '8" · 3 layer', serves: "serves 25-30", price: "$80" },
                  { size: '10" · 3 layer', serves: "serves 40-45", price: "$130" },
                ].map(item => (
                  <li key={item.size} className="flex items-center justify-between py-2 border-b border-[#F9C4C4] last:border-0">
                    <div>
                      <span className="font-semibold text-[#2C2C2A]">{item.size}</span>
                      <span className="text-xs text-[#2C2C2A] opacity-50 ml-2">{item.serves}</span>
                    </div>
                    <span className="font-bold text-[#C0392B]">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#F9C4C4] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#F9C4C4] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#C0392B]" />
                </div>
                <h3 className="text-lg font-bold text-[#2C2C2A] uppercase tracking-widest text-sm">Vintage Style</h3>
              </div>
              <p className="text-xs text-[#2C2C2A] opacity-50 mb-4 uppercase tracking-widest">Heart or Round</p>
              <ul className="space-y-3">
                {[
                  { size: '6" · 2 layer', serves: "serves 8-10", price: "$60" },
                  { size: '8" · 2 layer', serves: "serves 20-25", price: "$75" },
                ].map(item => (
                  <li key={item.size} className="flex items-center justify-between py-2 border-b border-[#F9C4C4] last:border-0">
                    <div>
                      <span className="font-semibold text-[#2C2C2A]">{item.size}</span>
                      <span className="text-xs text-[#2C2C2A] opacity-50 ml-2">{item.serves}</span>
                    </div>
                    <span className="font-bold text-[#C0392B]">{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-50 mb-3">Flavors</p>
                <div className="flex flex-wrap gap-2">
                  {["Strawberry", "Vanilla", "Funfetti", "Chocolate", "Red Velvet"].map(f => (
                    <span key={f} className="bg-[#FFF8F0] border border-[#F9C4C4] text-[#2C2C2A] text-xs px-3 py-1 rounded-full">{f}</span>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-50 mb-3 mt-4">Specialty <span className="text-[#C0392B]">+$5</span></p>
                <div className="flex flex-wrap gap-2">
                  {["Pistachio", "Banana", "Coconut", "Piña Colada", "Cookies & Cream"].map(f => (
                    <span key={f} className="bg-[#FFF8F0] border border-[#F9C4C4] text-[#2C2C2A] text-xs px-3 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-3xl p-8 border border-[#F9C4C4] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#F9C4C4] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#C0392B]" />
                </div>
                <h3 className="text-sm font-bold text-[#2C2C2A] uppercase tracking-widest">Fillings <span className="text-[#C0392B]">+$5</span></h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Strawberry glaze", "Banana pudding", "Cream cheese", "Fresh fruit", "Pistachio pudding", "Coconut pudding", "Cheesecake pudding", "Cookies & cream pudding", "Chocolate ganache", "Nutella"].map(f => (
                  <span key={f} className="bg-[#FFF8F0] border border-[#F9C4C4] text-[#2C2C2A] text-xs px-3 py-1 rounded-full">{f}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#F9C4C4] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#F9C4C4] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#C0392B]" />
                </div>
                <h3 className="text-sm font-bold text-[#2C2C2A] uppercase tracking-widest">Add-ons <span className="text-[#C0392B]">+$5</span></h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Gold leaf", "Writing", "Glitter", "Cherries", "Flowers (price varies)"].map(f => (
                  <span key={f} className="bg-[#FFF8F0] border border-[#F9C4C4] text-[#2C2C2A] text-xs px-3 py-1 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#C0392B] rounded-3xl p-8 text-white text-center space-y-1">
            <p className="font-bold text-lg mb-3">good to know</p>
            <p className="opacity-90 text-sm">50% deposit required upon ordering · non-refundable</p>
            <p className="opacity-90 text-sm">3 day notice required · $10 rush fee applies otherwise</p>
            <p className="opacity-90 text-sm">Payment via Cashapp: <span className="font-bold">bakeoclockk</span> · Zelle: <span className="font-bold">(956) 600-4653</span></p>
          </div>
        </div>
      </section>

      <section id="about" className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            <img
              src="/42CCD4F7-EE8C-45DC-B29D-3AD58561570F.jpg"
              alt="Stefanie"
              className="w-full rounded-3xl object-contain"
            />
            <div>
              <p className="text-[#C0392B] font-medium tracking-widest uppercase text-sm mb-2">
                the baker
              </p>
              <h2 className="text-4xl font-bold text-[#2C2C2A] leading-tight mb-6">
                hi, I&apos;m Stefanie
              </h2>
              <p className="text-[#2C2C2A] opacity-70 leading-relaxed mb-4">
                I&apos;m a buttercream type of girly based in Mission, TX. Since 2019
                I&apos;ve been crafting custom cakes and sweets for birthdays,
                celebrations, and every sweet moment in between.
              </p>
              <p className="text-[#2C2C2A] opacity-70 leading-relaxed mb-8">
                No fondant here — just beautiful, handcrafted buttercream cakes
                made with love out of my home kitchen. Every cake is made to order
                and designed just for you.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#C0392B]">6+</p>
                  <p className="text-xs text-[#2C2C2A] opacity-50 uppercase tracking-widest">years baking</p>
                </div>
                <div className="w-px bg-[#F9C4C4]" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#C0392B]">1,800+</p>
                  <p className="text-xs text-[#2C2C2A] opacity-50 uppercase tracking-widest">followers</p>
                </div>
                <div className="w-px bg-[#F9C4C4]" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#C0392B]">100%</p>
                  <p className="text-xs text-[#2C2C2A] opacity-50 uppercase tracking-widest">buttercream</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="px-8 py-20 bg-[#FFF8F0]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#C0392B] font-medium tracking-widest uppercase text-sm text-center mb-2">
            place an order
          </p>
          <h2 className="text-4xl font-bold text-[#2C2C2A] text-center mb-4">
            let&apos;s make your cake
          </h2>
          <p className="text-center text-[#2C2C2A] opacity-50 mb-12 text-sm">
            3 day notice required · 50% deposit due upon ordering
          </p>

          <div className="bg-white rounded-3xl p-10 border border-[#F9C4C4] shadow-sm space-y-6">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Your name</label>
                <input id="order-name" type="text" placeholder="Your name" className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Phone number</label>
                <input id="order-phone" type="tel" placeholder="(956) 000-0000" className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Your email</label>
              <input id="order-email" type="email" placeholder="your@email.com" className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
            </div>

            <div className="grid grid-cols-2 gap-4"> 
              <div>
                <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Pickup date</label>
                <input id="order-date" type="date" className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Cake size</label>
                <select id="order-size" className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]">
                  <option>6" 2 layer — $50</option>
                  <option>6" 3 layer — $60</option>
                  <option>8" 2 layer — $70</option>
                  <option>8" 3 layer — $80</option>
                  <option>10" 3 layer — $130</option>
                  <option>Vintage 6" — $60</option>
                  <option>Vintage 8" — $75</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Cake flavor</label>
                <select id="order-flavor" className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]">
                  <option>Strawberry</option>
                  <option>Vanilla</option>
                  <option>Funfetti</option>
                  <option>Chocolate</option>
                  <option>Red Velvet</option>
                  <option>Pistachio +$5</option>
                  <option>Banana +$5</option>
                  <option>Coconut +$5</option>
                  <option>Piña Colada +$5</option>
                  <option>Cookies & Cream +$5</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Filling</label>
                <select id="order-filling" className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B]">
                  <option>No filling</option>
                  <option>Strawberry glaze +$5</option>
                  <option>Banana pudding +$5</option>
                  <option>Cream cheese +$5</option>
                  <option>Fresh fruit +$5</option>
                  <option>Pistachio pudding +$5</option>
                  <option>Coconut pudding +$5</option>
                  <option>Cheesecake pudding +$5</option>
                  <option>Cookies & cream pudding +$5</option>
                  <option>Chocolate ganache +$5</option>
                  <option>Nutella +$5</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-[#2C2C2A] opacity-60 mb-2 block">Design notes & add-ons</label>
              <textarea id="order-notes" rows={4} placeholder="Describe your cake design, colors, add-ons, or any special requests..." className="w-full border border-[#F9C4C4] rounded-2xl px-4 py-3 text-[#2C2C2A] bg-[#FFF8F0] focus:outline-none focus:border-[#C0392B] resize-none" />
            </div>

            <button
              onClick={async () => {
                const name = document.getElementById('order-name').value || 'Not provided'
                const phone = document.getElementById('order-phone').value || 'Not provided'
                const email = document.getElementById('order-email').value || 'Not provided'
                const rawDate = document.getElementById('order-date').value
                const date = rawDate ? new Date(rawDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'Not provided'
                const size = document.getElementById('order-size').value
                const flavor = document.getElementById('order-flavor').value
                const filling = document.getElementById('order-filling').value
                const notes = document.getElementById('order-notes').value || 'None'

                setLoading(true)
                try {
                  await emailjs.send(
                    'service_aypdnhe',
                    'template_aad9f66',
                    {
                      customer_name: name,
                      customer_phone: phone,
                      customer_email: email,
                      pickup_date: date,
                      cake_size: size,
                      flavor: flavor,
                      filling: filling,
                      notes: notes,
                    },
                    'SnRPAxULuUoC1J4e-'
                  )
                  await emailjs.send(
                    'service_aypdnhe',
                    'template_2xt112r',
                    {
                      customer_name: name,
                      customer_email: email,
                      pickup_date: date,
                      cake_size: size,
                      flavor: flavor,
                      filling: filling,
                      notes: notes,
                    },
                    'SnRPAxULuUoC1J4e-'
                  )
                  const { data, error } = await supabase.from('orders').insert([{
                    customer_name: name,
                    customer_phone: phone,
                    customer_email: email,
                    pickup_date: date,
                    cake_size: size,
                    flavor: flavor,
                    filling: filling,
                    notes: notes,
                    status: 'Pending',
                    deposit: false,
                  }])
                  if (error) console.error('Supabase error:', JSON.stringify(error))
                  else console.log('Order saved!', data)
                  setLoading(false)
                  setShowSuccess(true)
                } catch (err) {
                  setLoading(false)
                  console.error('EmailJS error:', JSON.stringify(err))
                  alert('Something went wrong. Please try again or contact us directly.')
                }
              }}
              className="block w-full bg-[#C0392B] text-white text-center py-4 rounded-2xl font-semibold text-lg hover:bg-[#a93226] transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Place your order'}
            </button>

            <p className="text-center text-xs text-[#2C2C2A] opacity-40">
              You&apos;ll receive a confirmation email once your order is submitted
            </p>

          </div>
        </div>
      </section>

      <footer className="bg-[#2C2C2A] px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold text-2xl mb-3">bake o&apos;clock</h3>
              <p className="text-white opacity-50 text-sm leading-relaxed">
                Custom cakes & sweets made with love in Mission, TX. Est. 2019.
              </p>
            </div>
            <div>
              <p className="text-white opacity-50 uppercase tracking-widest text-xs mb-4">Quick links</p>
              <ul className="space-y-2">
                {['Gallery', 'Menu', 'About', 'Order'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white opacity-70 hover:opacity-100 transition-opacity text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white opacity-50 uppercase tracking-widest text-xs mb-4">Find us</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.instagram.com/bakeoclockk" target="_blank" rel="noopener noreferrer" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                    Instagram: @bakeoclockk
                  </a>
                </li>
                <li className="text-white opacity-70">Cashapp: $bakeoclockk</li>
                <li className="text-white opacity-70">Zelle: (956) 600-4653</li>
                <li className="text-white opacity-70">Mission, TX · Local pickup only</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 pt-8 flex items-center justify-between">
            <p className="text-white opacity-30 text-xs">© 2026 Bake O&apos;Clock · All rights reserved</p>
            <p className="text-white opacity-30 text-xs">Made with love 🎂</p>
          </div>
        </div>
      </footer>

    </main>
  )
}