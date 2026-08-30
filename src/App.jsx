import { useEffect, useRef, useState } from 'react'
import './App.css'
import deepOrangeBottle from './assets/bottles/hero-bottle-deep-cutout.png'
import brightOrangeBottle from './assets/bottles/hero-bottle-bright-cutout.png'
import goldenBottle from './assets/bottles/hero-bottle-golden-cutout.png'

const navigation = [
  ['Juices', '#juices'], ['Ingredients', '#ingredients'], ['How it works', '#how-it-works'],
  ['Delivery', '#delivery'], ['About', '#about'], ['FAQ', '#faq'],
]

// This shared product list powers both the juice menu and the order builder.
const juices = [
  { id: 'beet-veggie', name: 'Beet & Veggie', type: 'Bottle', size: 'TBD', price: 12, description: 'Beet blended with our veggie trio.', ingredients: ['Beet', 'Celery', 'Cucumber', 'Broccoli'], tone: 'beet', mark: 'B' },
  { id: 'carrot-veggie', name: 'Carrot & Veggie', type: 'Bottle', size: 'TBD', price: 12, description: 'Carrot blended with our veggie trio.', ingredients: ['Carrot', 'Celery', 'Cucumber', 'Broccoli'], tone: 'carrot', mark: 'C' },
  { id: 'watermelon', name: 'Watermelon', type: 'Bottle', size: 'TBD', price: 10, description: 'A simple bottle made with watermelon.', ingredients: ['Watermelon'], tone: 'watermelon', mark: 'W' },
  { id: 'carrot', name: 'Carrot', type: 'Bottle', size: 'TBD', price: 10, description: 'A simple bottle made with carrot.', ingredients: ['Carrot'], tone: 'orange', mark: 'C' },
  { id: 'ginger-shot', name: 'Ginger Shot', type: 'Shot', size: 'TBD', price: 5, description: 'A small shot made with ginger.', ingredients: ['Ginger'], tone: 'ginger', mark: 'G' },
  { id: 'turmeric-shot', name: 'Turmeric Shot', type: 'Shot', size: 'TBD', price: 5, description: 'A small shot made with turmeric.', ingredients: ['Turmeric'], tone: 'gold', mark: 'T' },
  { id: 'ginger-turmeric-shot', name: 'Ginger & Turmeric Shot', type: 'Shot', size: 'TBD', price: 7, description: 'A small shot combining ginger and turmeric.', ingredients: ['Ginger', 'Turmeric'], tone: 'sunrise', mark: 'G+T' },
  { id: 'veggie-bottle', name: 'Veggie Bottle', type: 'Bottle', size: 'TBD', price: 12, description: 'Our veggie trio in one bottle.', ingredients: ['Celery', 'Cucumber', 'Broccoli'], tone: 'veggie', mark: 'V' },
]

const ingredients = [
  { name: 'Watermelon', icon: '◒', color: 'red' }, { name: 'Beet', icon: '●', color: 'purple' },
  { name: 'Ginger', icon: '✦', color: 'yellow' }, { name: 'Turmeric', icon: '✺', color: 'gold' },
  { name: 'Carrot', icon: '▲', color: 'orange' }, { name: 'Celery', icon: '〽', color: 'green' },
  { name: 'Cucumber', icon: '○', color: 'cucumber' }, { name: 'Broccoli', icon: '♣', color: 'broccoli' },
]

// Replace each placeholder answer after the owner confirms the business details.
const faqs = [
  'How fresh is the juice?', 'When is the juice made?', 'How long does the juice stay fresh?',
  'Does the juice need to stay refrigerated?', 'Is separation normal?', 'Should I shake the bottle before drinking?',
  'What size are the bottles?', 'What ingredients are used?', 'Can I customize a juice?',
  'Can I request an ingredient to be left out?', 'Do you add sugar?', 'Do you add preservatives?',
  'Where do you deliver?', 'Do you deliver to Palatka?', 'How much does delivery cost?',
  'Is there a minimum order?', 'What days do you deliver?', 'Can I pick my order up instead?',
  'How far in advance should I order?', 'What payment methods do you accept?',
  'Do I pay before or after the juice is made?', 'What happens if I need to cancel my order?',
  'Do you accept returns or refunds?', 'How should I store my juice?',
].map((question) => ({ question, answer: 'Answer coming soon.' }))

const businessDetails = {
  serviceArea: 'Serving Satsuma, Palatka, Florida, and surrounding communities.',
  delivery: [
    ['Delivery Radius', 'Coming soon'], ['Delivery Fee', 'Coming soon'], ['Minimum Order', 'Coming soon'],
    ['Delivery Days', 'Coming soon'], ['Delivery Hours', 'Coming soon'], ['Pickup Availability', 'Coming soon'],
  ],
}

const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="Spears N Sprouts home"><span className="brand-mark" aria-hidden="true">S</span><span>Spears N Sprouts <small>Fresh Juice Company</small></span></a>
    <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}><span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span><span aria-hidden="true" className={menuOpen ? 'menu-icon open' : 'menu-icon'}><i /><i /><i /></span></button>
    <nav id="site-navigation" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-order" href="#order" onClick={() => setMenuOpen(false)}>Build an order</a></nav>
  </header>
}

function SectionHeading({ kicker, title, children, light = false }) {
  return <div className={`section-heading${light ? ' light' : ''}`}><p>{kicker}</p><h2>{title}</h2>{children && <div>{children}</div>}</div>
}

function JuiceCard({ juice }) {
  return <article className={`juice-card tone-${juice.tone}`}>
    <div className="juice-card-top"><span>{juice.type}</span><strong>{formatCurrency(juice.price)}</strong></div>
    <div className="juice-seal" aria-hidden="true"><i>{juice.mark}</i><span /></div>
    <h3>{juice.name}</h3><p>{juice.description}</p>
    <dl><div><dt>Size</dt><dd>{juice.size}</dd></div><div><dt>Ingredients</dt><dd>{juice.ingredients.join(', ')}</dd></div></dl>
    <a className="button button-dark" href="#order" onClick={() => window.dispatchEvent(new CustomEvent('spears-select-juice', { detail: juice.id }))}>Add to order <span aria-hidden="true">→</span></a>
  </article>
}

function QuantityControl({ juice, quantity, onChange }) {
  return <div className={`order-product tone-${juice.tone}`}>
    <div className="order-product-copy"><span>{juice.type} · {juice.size}</span><strong>{juice.name}</strong><small>{formatCurrency(juice.price)} each</small></div>
    <div className="quantity-control">
      <button type="button" onClick={() => onChange(juice.id, quantity - 1)} disabled={quantity === 0} aria-label={`Remove one ${juice.name}`}>−</button>
      <label><span className="sr-only">Quantity for {juice.name}</span><input type="number" inputMode="numeric" min="0" max="99" value={quantity} onChange={(event) => onChange(juice.id, event.target.value)} /></label>
      <button type="button" onClick={() => onChange(juice.id, quantity + 1)} aria-label={`Add one ${juice.name}`}>+</button>
    </div>
  </div>
}

function TestOrderModal({ open, onClose, closeButtonRef }) {
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <dialog open className="test-modal" aria-modal="true" aria-labelledby="test-modal-title" aria-describedby="test-modal-description">
      <span className="modal-bubbles" aria-hidden="true" /><p className="modal-kicker">Test order only</p><h2 id="test-modal-title">Nothing was sent.</h2>
      <p id="test-modal-description">The Spears N Sprouts ordering system is still being set up. No order was sent, and none of your information was submitted or saved. This was only a test of the ordering process.</p>
      <button ref={closeButtonRef} className="button modal-close" type="button" onClick={onClose}>Close test order</button>
    </dialog>
  </div>
}

function OrderSection() {
  const [quantities, setQuantities] = useState(() => Object.fromEntries(juices.map((juice) => [juice.id, 0])))
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', day: '', time: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const submitButtonRef = useRef(null)
  const modalCloseRef = useRef(null)
  const selectedItems = juices.filter((juice) => quantities[juice.id] > 0)
  const total = selectedItems.reduce((sum, juice) => sum + juice.price * quantities[juice.id], 0)
  const itemCount = selectedItems.reduce((sum, juice) => sum + quantities[juice.id], 0)

  const updateQuantity = (id, value) => {
    const parsed = Number.parseInt(value, 10)
    const safeValue = Number.isNaN(parsed) ? 0 : Math.min(99, Math.max(0, parsed))
    setQuantities((current) => ({ ...current, [id]: safeValue }))
    setErrors((current) => ({ ...current, order: undefined }))
  }

  useEffect(() => {
    const addJuice = (event) => setQuantities((current) => ({ ...current, [event.detail]: Math.min(99, (current[event.detail] ?? 0) + 1) }))
    window.addEventListener('spears-select-juice', addJuice)
    return () => window.removeEventListener('spears-select-juice', addJuice)
  }, [])

  useEffect(() => {
    if (!modalOpen) return undefined
    modalCloseRef.current?.focus()
    const submitButton = submitButtonRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event) => event.key === 'Escape' && setModalOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = previousOverflow; submitButton?.focus() }
  }, [modalOpen])

  const updateCustomer = ({ target: { name, value } }) => {
    setCustomer((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const validateOrder = () => {
    const nextErrors = {}
    if (!customer.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!customer.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    if (!customer.address.trim()) nextErrors.address = 'Please enter a delivery address or area.'
    if (selectedItems.length === 0) nextErrors.order = 'Choose at least one juice to continue.'
    return nextErrors
  }

  // Connect future real submission behavior here. For now, this only validates and opens the test modal.
  const handleSubmitOrder = (event) => {
    event.preventDefault()
    const nextErrors = validateOrder()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const firstError = ['order', 'name', 'phone', 'address'].find((key) => nextErrors[key])
      document.getElementById(`${firstError}-error`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setModalOpen(true)
  }

  return <section className="order-section liquid-section" id="order">
    <div className="order-intro">
      <SectionHeading kicker="Build your fresh lineup" title="Plan your order." light>Choose as many different juices as you like. This is a preview—nothing will be sent.</SectionHeading>
      <aside className="order-total" aria-live="polite" aria-label="Live order summary"><span>Your order</span>
        {selectedItems.length ? <ul>{selectedItems.map((juice) => <li key={juice.id}><span>{quantities[juice.id]} × {juice.name}</span><b>{formatCurrency(quantities[juice.id] * juice.price)}</b></li>)}</ul> : <p>No juices selected yet.</p>}
        <div className="summary-total"><small>{itemCount} {itemCount === 1 ? 'item' : 'items'}</small><strong>{formatCurrency(total)}</strong></div>
      </aside>
      <div className="contact-card"><h3>Questions first?</h3><p>Business contact details are coming soon.</p></div>
    </div>
    <form className="order-form" onSubmit={handleSubmitOrder} noValidate>
      <fieldset className="product-picker" aria-describedby={errors.order ? 'order-error' : undefined}><legend>Choose your juices</legend><p className="picker-help">Use the minus and plus buttons—or enter a quantity directly.</p>
        <div className="order-products">{juices.map((juice) => <QuantityControl key={juice.id} juice={juice} quantity={quantities[juice.id]} onChange={updateQuantity} />)}</div>
        {errors.order && <p className="field-error order-error" id="order-error" role="alert">{errors.order}</p>}
      </fieldset>
      <div className="customer-details"><h3>Your delivery details</h3>
        <div className="form-row"><label>Name<input name="name" type="text" autoComplete="name" value={customer.name} onChange={updateCustomer} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" value={customer.phone} onChange={updateCustomer} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} /></label></div>
        <div className="form-row error-row"><div>{errors.name && <p className="field-error" id="name-error" role="alert">{errors.name}</p>}</div><div>{errors.phone && <p className="field-error" id="phone-error" role="alert">{errors.phone}</p>}</div></div>
        <label>Delivery address or delivery area<input name="address" type="text" autoComplete="street-address" value={customer.address} onChange={updateCustomer} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : undefined} placeholder="Street address, Satsuma, Palatka, or nearby area" /></label>
        {errors.address && <p className="field-error" id="address-error" role="alert">{errors.address}</p>}
        <div className="form-row"><label>Preferred delivery day<input name="day" type="text" value={customer.day} onChange={updateCustomer} placeholder="Day preference" /></label><label>Preferred delivery time<input name="time" type="text" value={customer.time} onChange={updateCustomer} placeholder="Time preference" /></label></div>
        <label>Notes / special instructions<textarea name="notes" rows="4" value={customer.notes} onChange={updateCustomer} placeholder="Anything Spears N Sprouts should know?" /></label>
      </div>
      <div className="form-summary"><span>Estimated total</span><strong>{formatCurrency(total)}</strong></div>
      <button ref={submitButtonRef} className="button submit-button" type="submit">Submit Order <span aria-hidden="true">→</span></button>
      <p className="form-disclaimer">Test experience only. No order, personal information, or payment is sent or saved.</p>
    </form>
    <TestOrderModal open={modalOpen} onClose={() => setModalOpen(false)} closeButtonRef={modalCloseRef} />
  </section>
}

function App() {
  return <><Header /><main>
    <section className="hero" id="home"><div className="hero-swirls" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-copy"><p className="eyebrow">Handmade in Satsuma, Florida</p><h1>Fresh juice with a <em>local squeeze.</em></h1><p className="hero-tagline">Pressed fresh. Made locally. Brought to your door.</p><div className="hero-actions"><a className="button button-cream" href="#juices">See our juices <span aria-hidden="true">↓</span></a><a className="button button-outline" href="#order">Build an order <span aria-hidden="true">→</span></a></div></div>
      <div className="bottle-stage"><div className="bottle-floaters" aria-label="Three colorful bottles of fresh juice"><span className="bottle-shadow shadow-one" aria-hidden="true" /><span className="bottle-shadow shadow-two" aria-hidden="true" /><span className="bottle-shadow shadow-three" aria-hidden="true" /><img className="hero-bottle bottle-one" src={deepOrangeBottle} alt="Deep orange fresh juice bottle" fetchPriority="high" /><img className="hero-bottle bottle-two" src={brightOrangeBottle} alt="Bright orange fresh juice bottle" fetchPriority="high" /><img className="hero-bottle bottle-three" src={goldenBottle} alt="Golden yellow fresh juice bottle" fetchPriority="high" /></div><p>Spears N Sprouts • fresh & local</p></div>
      <a className="hero-scroll" href="#juices"><span>Explore</span><i aria-hidden="true">↓</i></a>
    </section>
    <section className="juices-section liquid-section" id="juices"><div className="section-copy"><SectionHeading kicker="Our juices & shots" title="A colorful pour for every mood.">Choose from fruit, vegetable blends, and small ginger or turmeric shots.</SectionHeading><div className="juice-note"><span aria-hidden="true">✺</span><p><strong>Our veggie trio:</strong><br />Celery, cucumber, and broccoli.</p></div></div><div className="juice-grid">{juices.map((juice) => <JuiceCard juice={juice} key={juice.id} />)}</div></section>
    <section className="ingredients-section liquid-section" id="ingredients"><SectionHeading kicker="Color from the garden" title="Fresh things we may pour.">Examples of ingredients Spears N Sprouts may use—each one bright, simple, and recognizable.</SectionHeading><div className="ingredient-cloud">{ingredients.map((ingredient, index) => <div className={`ingredient-sticker ${ingredient.color}`} style={{ '--tilt': `${index % 2 ? 4 : -4}deg` }} key={ingredient.name}><span aria-hidden="true">{ingredient.icon}</span><strong>{ingredient.name}</strong></div>)}</div><p className="ingredient-note">The veggie blend includes celery, cucumber, and broccoli.</p></section>
    <section className="how-section liquid-section" id="how-it-works"><SectionHeading kicker="From our juicer to your door" title="Fresh is this simple." light /><ol className="steps"><li><span>01</span><h3>Pick your juice</h3><p>Choose from what’s currently available.</p></li><li><span>02</span><h3>Plan your order</h3><p>Build your lineup and share your delivery preferences.</p></li><li><span>03</span><h3>We make it fresh</h3><p>Your juice is made locally by the owner.</p></li><li><span>04</span><h3>We bring it to you</h3><p>Delivery details will be confirmed once real ordering opens.</p></li></ol></section>
    <section className="delivery-section liquid-section" id="delivery"><div className="delivery-map" aria-hidden="true"><div className="map-ring ring-one" /><div className="map-ring ring-two" /><span className="map-pin pin-one"><i />Satsuma</span><span className="map-pin pin-two"><i />Palatka</span><div className="map-road" /></div><div className="delivery-content"><SectionHeading kicker="Your neighborhood juice stop" title="Very local. Very fresh.">{businessDetails.serviceArea}</SectionHeading><div className="detail-grid">{businessDetails.delivery.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><p className="placeholder-hint">Final delivery details are coming soon.</p></div></section>
    <section className="about-section liquid-section" id="about"><div className="about-art" aria-hidden="true"><span className="about-sun" /><span className="about-leaf leaf-one" /><span className="about-leaf leaf-two" /><strong>Made<br />with care</strong></div><div className="about-copy"><SectionHeading kicker="Meet the maker" title="About Spears N Sprouts">Our story is coming soon.</SectionHeading><p>This space is intentionally waiting for the owner’s own words.</p>{/* Owner: replace this placeholder with the final Spears N Sprouts story when it is ready. */}</div></section>
    <section className="faq-section liquid-section" id="faq"><div className="faq-intro"><SectionHeading kicker="Good questions" title="The juicy details.">The questions are ready. The owner’s answers are coming soon.</SectionHeading><div className="faq-fruit" aria-hidden="true"><span>?</span></div></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div></section>
    <OrderSection />
  </main>
  <footer><div className="footer-brand"><span className="footer-mark" aria-hidden="true">S</span><div><strong>Spears N Sprouts</strong><p>{businessDetails.serviceArea}</p></div></div><nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#juices">Juices</a><a href="#delivery">Delivery</a><a href="#faq">FAQ</a><a href="#order">Order</a></nav><div className="footer-contact"><strong>Contact details coming soon</strong><span>Phone · Email · Facebook · Instagram</span></div><p className="copyright">© {new Date().getFullYear()} Spears N Sprouts. Fresh juice, made locally.</p></footer>
  </>
}

export default App
