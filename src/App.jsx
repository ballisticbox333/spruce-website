import { useEffect, useState } from 'react'
import './App.css'
import deepOrangeBottle from './assets/bottles/hero-bottle-deep-cutout.png'
import brightOrangeBottle from './assets/bottles/hero-bottle-bright-cutout.png'
import goldenBottle from './assets/bottles/hero-bottle-golden-cutout.png'
import { createOrderMailto } from './orderEmail.js'
import { products } from './data/products.js'

const navigation = [
  ['Juices', '#juices'], ['Ingredients', '#ingredients'], ['How it works', '#how-it-works'],
  ['Delivery', '#delivery'], ['About', '#about'], ['FAQ', '#faq'],
]

const ingredients = [
  { name: 'Watermelon', icon: '◒', color: 'red' }, { name: 'Beet', icon: '●', color: 'purple' },
  { name: 'Ginger', icon: '✦', color: 'yellow' }, { name: 'Turmeric', icon: '✺', color: 'gold' },
  { name: 'Carrot', icon: '▲', color: 'orange' }, { name: 'Celery', icon: '〽', color: 'green' },
  { name: 'Cucumber', icon: '○', color: 'cucumber' }, { name: 'Broccoli', icon: '♣', color: 'broccoli' },
]

const faqs = [
  ['How fresh is the juice?', 'The juice is made fresh the evening before delivery or pickup. It is normally frozen immediately after it is made unless an unfrozen order has been requested and agreed upon.'],
  ['When is the juice made?', 'Juice is made the evening before the scheduled delivery or pickup.'],
  ['How long does the juice stay fresh?', 'Frozen juice may be stored in the freezer for up to 6 months. Once thawed, or if provided unfrozen, it should be consumed within 4 days of the day it was made or thawed.'],
  ['Does the juice need to stay refrigerated?', 'Yes. Once unfrozen or thawed, the juice needs to remain refrigerated until it is consumed.'],
  ['Is separation normal?', 'Yes. Separation is normal because of the naturally fibrous parts of the juice.'],
  ['Should I shake the bottle before drinking?', 'Yes. Shake the bottle before drinking to recombine the natural fibrous parts of the juice that may have settled.'],
  ['What size are the bottles?', 'Regular juice bottles are 16 oz. Juice shots are 2 oz.'],
  ['What ingredients are used?', 'Ingredients are fresh and vary depending on the type of juice.'],
  ['Can I customize a juice?', 'Yes. Juices may be customized by request. Pricing may vary depending on the ingredients requested, and the final price will be confirmed before payment.'],
  ['Can I request an ingredient to be left out?', 'Yes. You may request that ingredients be left out of a juice.'],
  ['Do you add sugar?', 'No. No sugar or other sweeteners are added.'],
  ['Do you add preservatives?', 'No. Spears N Sprouts does not add preservatives.'],
  ['Where do you deliver?', 'Delivery is available within Putnam County, Florida.'],
  ['Do you deliver to Palatka?', 'Yes. Palatka is within the Putnam County delivery area.'],
  ['How much does delivery cost?', 'Delivery costs $2.'],
  ['Is there a minimum order?', 'Yes. Delivery orders require a minimum of 2 bottles.'],
  ['What days do you deliver?', 'Deliveries are made on Wednesdays and Fridays between 4:00 PM and 6:30 PM. Orders for that week’s delivery must be submitted by Monday at 8:00 PM.'],
  ['Can I pick my order up instead?', 'Yes. Pickup is available on Thursdays from 3:30 PM to 5:30 PM at the Palatka Post Office, 1105 Saint Johns Avenue, Palatka, Florida 32177. Orders for Thursday pickup must be submitted by Monday at 8:00 PM.'],
  ['How far in advance should I order?', 'Orders for Wednesday or Friday delivery and Thursday pickup must be submitted by Monday at 8:00 PM for that week.'],
  ['What payment methods do you accept?', 'Spears N Sprouts accepts Cash App, PayPal, and cash. Payment is made after the order has been confirmed.'],
  ['Do I pay before or after the juice is made?', 'Payment is made after Spears N Sprouts confirms the order. Additional bottles may be available for purchase at pickup depending on availability.'],
  ['What happens if I need to cancel my order?', 'Orders may be canceled within 24 hours of being placed. Orders cannot be canceled on the scheduled delivery or pickup day because the juice has already been prepared and ingredients have already been purchased.'],
  ['Do you accept returns or refunds?', 'Because the products are perishable and Spears N Sprouts wants to maintain product quality, products do not need to be physically returned. Refunds may be issued for qualifying cancellations made within the cancellation period. Customers who fail to pick up their order are not eligible for a refund.'],
  ['How should I store my juice?', 'Juice may be kept frozen for up to 6 months. Once thawed, or if provided unfrozen, keep it refrigerated and consume it within 4 days.'],
].map(([question, answer]) => ({ question, answer }))

const businessDetails = {
  email: 'spearsnsprouts@gmail.com',
  serviceArea: 'Delivery throughout Putnam County, Florida, with pickup in Palatka.',
  delivery: [
    ['Delivery Area', 'Putnam County'], ['Delivery Fee', '$2'], ['Minimum Delivery', '2 bottles'],
    ['Delivery Days', 'Wednesday & Friday'], ['Delivery Window', '4:00–6:30 PM'], ['Order Cutoff', 'Monday at 8:00 PM'],
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
  return <article className={`juice-card tone-${juice.tone}${juice.available ? '' : ' is-unavailable'}`}>
    <div className="juice-card-top"><span>{juice.type}</span><strong>{formatCurrency(juice.price)}</strong></div>
    {!juice.available && <span className="stock-badge">Out of stock</span>}
    <div className="juice-seal" aria-hidden="true"><i>{juice.mark}</i><span /></div>
    <h3>{juice.name}</h3><p>{juice.description}</p>
    <dl><div><dt>Size</dt><dd>{juice.size}</dd></div><div><dt>Ingredients</dt><dd>{juice.ingredients.join(', ')}</dd></div></dl>
    {juice.available
      ? <a className="button button-dark" href="#order" onClick={() => window.dispatchEvent(new CustomEvent('spears-select-juice', { detail: juice.id }))}>Add to order <span aria-hidden="true">→</span></a>
      : <span className="button button-dark stock-disabled" aria-disabled="true">Unavailable</span>}
  </article>
}

function QuantityControl({ juice, quantity, onChange }) {
  const disabled = !juice.available
  return <div className={`order-product tone-${juice.tone}${disabled ? ' is-unavailable' : ''}`}>
    <div className="order-product-copy"><span>{juice.type} · {juice.size}</span><strong>{juice.name}</strong><small>{disabled ? 'OUT OF STOCK' : `${formatCurrency(juice.price)} each`}</small></div>
    <div className="quantity-control">
      <button type="button" onClick={() => onChange(juice.id, quantity - 1)} disabled={disabled || quantity === 0} aria-label={`Remove one ${juice.name}`}>−</button>
      <label><span className="sr-only">Quantity for {juice.name}</span><input type="number" inputMode="numeric" min="0" max="99" value={disabled ? 0 : quantity} onChange={(event) => onChange(juice.id, event.target.value)} disabled={disabled} /></label>
      <button type="button" onClick={() => onChange(juice.id, quantity + 1)} disabled={disabled} aria-label={`Add one ${juice.name}`}>+</button>
    </div>
  </div>
}

function OrderSection() {
  const [quantities, setQuantities] = useState(() => Object.fromEntries(products.map((product) => [product.id, 0])))
  const [customer, setCustomer] = useState({ name: '', phone: '', fulfillment: 'delivery', address: '', day: '', time: '', frozen: 'Frozen', customization: '', notes: '' })
  const [errors, setErrors] = useState({})
  const selectedItems = products.filter((product) => product.available && quantities[product.id] > 0)
  const subtotal = selectedItems.reduce((sum, juice) => sum + juice.price * quantities[juice.id], 0)
  const itemCount = selectedItems.reduce((sum, juice) => sum + quantities[juice.id], 0)
  const bottleCount = selectedItems.filter((juice) => juice.type === 'Bottle').reduce((sum, juice) => sum + quantities[juice.id], 0)
  const deliveryFee = customer.fulfillment === 'delivery' && itemCount > 0 ? 2 : 0
  const total = subtotal + deliveryFee
  const hasCustomization = customer.customization.trim().length > 0

  const updateQuantity = (id, value) => {
    const product = products.find((item) => item.id === id)
    if (!product?.available) {
      setQuantities((current) => ({ ...current, [id]: 0 }))
      return
    }
    const parsed = Number.parseInt(value, 10)
    const safeValue = Number.isNaN(parsed) ? 0 : Math.min(99, Math.max(0, parsed))
    setQuantities((current) => ({ ...current, [id]: safeValue }))
    setErrors((current) => ({ ...current, order: undefined }))
  }

  useEffect(() => {
    const addJuice = (event) => {
      const product = products.find((item) => item.id === event.detail)
      if (!product?.available) return
      setQuantities((current) => ({ ...current, [event.detail]: Math.min(99, (current[event.detail] ?? 0) + 1) }))
    }
    window.addEventListener('spears-select-juice', addJuice)
    return () => window.removeEventListener('spears-select-juice', addJuice)
  }, [])

  const updateCustomer = ({ target: { name, value } }) => {
    setCustomer((current) => ({ ...current, [name]: value, ...(name === 'fulfillment' ? { day: '' } : {}) }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const validateOrder = () => {
    const nextErrors = {}
    if (!customer.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!customer.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    if (selectedItems.length === 0) nextErrors.order = 'Choose at least one juice to continue.'
    if (customer.fulfillment === 'delivery' && !customer.address.trim()) nextErrors.address = 'Please enter the delivery address.'
    if (customer.fulfillment === 'delivery' && bottleCount < 2) nextErrors.order = 'Delivery orders require at least 2 regular juice bottles. Shots do not count toward the bottle minimum.'
    if (!customer.day) nextErrors.day = `Please choose a ${customer.fulfillment} day.`
    return nextErrors
  }

  const handleSubmitOrder = (event) => {
    event.preventDefault()
    const nextErrors = validateOrder()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const firstError = ['order', 'name', 'phone', 'address', 'day'].find((key) => nextErrors[key])
      document.getElementById(`${firstError}-error`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    window.open(createOrderMailto({ customer, selectedItems, quantities, subtotal, deliveryFee, total, email: businessDetails.email }), '_self')
  }

  return <section className="order-section liquid-section" id="order">
    <div className="order-intro">
      <SectionHeading kicker="Build your fresh lineup" title="Send an order request." light>Choose your juices, delivery or pickup, and preferences. We’ll confirm everything before payment.</SectionHeading>
      <aside className="order-total" aria-live="polite" aria-label="Live order summary"><span>Your order</span>
        {selectedItems.length ? <ul>{selectedItems.map((juice) => <li key={juice.id}><span>{quantities[juice.id]} × {juice.name}</span><b>{formatCurrency(quantities[juice.id] * juice.price)}</b></li>)}</ul> : <p>No juices selected yet.</p>}
        <div className="summary-breakdown"><span>Product subtotal <b>{formatCurrency(subtotal)}</b></span>{customer.fulfillment === 'delivery' && <span>Delivery fee <b>{formatCurrency(deliveryFee)}</b></span>}</div>
        <div className="summary-total"><small>{itemCount} {itemCount === 1 ? 'item' : 'items'}</small><strong>{formatCurrency(total)}</strong></div>
        {hasCustomization && <p className="custom-total-note">Estimated total. Customized juice pricing will be confirmed before payment.</p>}
      </aside>
      <div className="contact-card"><h3>Questions first?</h3><a href={`mailto:${businessDetails.email}`}>{businessDetails.email}</a><p>Order requests and questions are welcome by email.</p></div>
    </div>
    <form className="order-form" onSubmit={handleSubmitOrder} noValidate>
      <fieldset className="product-picker" aria-describedby={errors.order ? 'order-error' : undefined}><legend>Choose your juices</legend><p className="picker-help">Use the minus and plus buttons—or enter a quantity directly.</p>
        <div className="order-products">{products.map((juice) => <QuantityControl key={juice.id} juice={juice} quantity={quantities[juice.id]} onChange={updateQuantity} />)}</div>
        {errors.order && <p className="field-error order-error" id="order-error" role="alert">{errors.order}</p>}
      </fieldset>
      <div className="customer-details"><h3>Your details</h3>
        <div className="form-row"><label>Name<input name="name" type="text" autoComplete="name" value={customer.name} onChange={updateCustomer} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" value={customer.phone} onChange={updateCustomer} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} /></label></div>
        <div className="form-row error-row"><div>{errors.name && <p className="field-error" id="name-error" role="alert">{errors.name}</p>}</div><div>{errors.phone && <p className="field-error" id="phone-error" role="alert">{errors.phone}</p>}</div></div>
        <fieldset className="choice-fieldset"><legend>Delivery or pickup?</legend><div className="choice-cards"><label aria-label="Delivery"><input type="radio" name="fulfillment" value="delivery" checked={customer.fulfillment === 'delivery'} onChange={updateCustomer} /><span><b>Delivery</b><small>Putnam County · $2 fee · 2-bottle minimum</small></span></label><label aria-label="Pickup"><input type="radio" name="fulfillment" value="pickup" checked={customer.fulfillment === 'pickup'} onChange={updateCustomer} /><span><b>Pickup</b><small>Palatka Post Office · no fee</small></span></label></div></fieldset>
        <div className="fulfillment-note"><strong>Order by Monday at 8:00 PM</strong><p>{customer.fulfillment === 'delivery' ? 'Choose Wednesday or Friday delivery. The delivery window is 4:00–6:30 PM; exact arrival times are not guaranteed.' : 'Thursday pickup is 3:30–5:30 PM at Palatka Post Office, 1105 Saint Johns Avenue, Palatka, Florida 32177.'}</p></div>
        {customer.fulfillment === 'delivery' && <><label>Delivery address<input name="address" type="text" autoComplete="street-address" value={customer.address} onChange={updateCustomer} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : undefined} placeholder="Street address in Putnam County" /></label>{errors.address && <p className="field-error" id="address-error" role="alert">{errors.address}</p>}</>}
        <div className="form-row"><label>Preferred {customer.fulfillment} day<select name="day" value={customer.day} onChange={updateCustomer} aria-invalid={Boolean(errors.day)} aria-describedby={errors.day ? 'day-error' : undefined}><option value="">Choose a day</option>{customer.fulfillment === 'delivery' ? <><option>Wednesday</option><option>Friday</option></> : <option>Thursday</option>}</select></label><label>Time preference (optional)<input name="time" type="text" value={customer.time} onChange={updateCustomer} placeholder={customer.fulfillment === 'delivery' ? 'Within 4:00–6:30 PM' : 'Within 3:30–5:30 PM'} /></label></div>
        {errors.day && <p className="field-error" id="day-error" role="alert">{errors.day}</p>}
        <fieldset className="choice-fieldset"><legend>Frozen or unfrozen?</legend><div className="choice-cards"><label aria-label="Frozen — Default"><input type="radio" name="frozen" value="Frozen" checked={customer.frozen === 'Frozen'} onChange={updateCustomer} /><span><b>Frozen — Default</b><small>Frozen immediately after preparation</small></span></label><label aria-label="Unfrozen — By request"><input type="radio" name="frozen" value="Unfrozen — By request" checked={customer.frozen !== 'Frozen'} onChange={updateCustomer} /><span><b>Unfrozen — By request</b><small>Subject to confirmation</small></span></label></div><p className="choice-help">Our juices are normally frozen immediately after preparation to help maintain product quality. Unfrozen requests must be confirmed.</p></fieldset>
        <label>Customization requests<textarea name="customization" rows="3" value={customer.customization} onChange={updateCustomer} placeholder="Ingredients to add or remove" /></label><p className="customization-help">Ingredients may be added or removed by request. Availability and pricing may vary; the final price will be confirmed before payment.</p>
        <label>Other notes<textarea name="notes" rows="4" value={customer.notes} onChange={updateCustomer} placeholder="Anything else Spears N Sprouts should know?" /></label>
      </div>
      <div className="form-summary"><span>Estimated total</span><strong>{formatCurrency(total)}</strong></div>
      <button className="button submit-button" type="submit">Send Order Request <span aria-hidden="true">→</span></button>
      <p className="form-disclaimer">Clicking this button opens your email app with your order already filled out. Review the email and press Send to submit your request. The website does not send or save your information.</p>
      <p className="email-fallback">Mail app not opening? Email <a href={`mailto:${businessDetails.email}`}>{businessDetails.email}</a>.</p>
    </form>
  </section>
}

function PaymentSection() {
  return <section className="payment-info liquid-section" id="payment"><SectionHeading kicker="Payment" title="Pay after confirmation.">Please wait until Spears N Sprouts confirms availability, final pricing, and fulfillment details before sending payment.</SectionHeading><div className="payment-methods"><article><span>$</span><h3>Cash App</h3><p>$spearsnsprouts</p></article><article><span>P</span><h3>PayPal</h3><p>Spears N Sprouts / spearsnsprouts</p></article><article><span>✓</span><h3>Cash</h3><p>Accepted after order confirmation, including delivery orders.</p></article></div></section>
}

function App() {
  return <><Header /><main>
    <section className="hero" id="home"><div className="hero-swirls" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-copy"><p className="eyebrow">Handmade in Satsuma, Florida</p><h1>Fresh juice with a <em>local squeeze.</em></h1><p className="hero-tagline">Pressed fresh. Made locally. Brought to your door.</p><div className="hero-actions"><a className="button button-cream" href="#juices">See our juices <span aria-hidden="true">↓</span></a><a className="button button-outline" href="#order">Build an order <span aria-hidden="true">→</span></a></div></div>
      <div className="bottle-stage"><div className="bottle-floaters" aria-label="Three colorful bottles of fresh juice"><span className="bottle-shadow shadow-one" aria-hidden="true" /><span className="bottle-shadow shadow-two" aria-hidden="true" /><span className="bottle-shadow shadow-three" aria-hidden="true" /><img className="hero-bottle bottle-one" src={deepOrangeBottle} alt="Deep orange fresh juice bottle" fetchPriority="high" /><img className="hero-bottle bottle-two" src={brightOrangeBottle} alt="Bright orange fresh juice bottle" fetchPriority="high" /><img className="hero-bottle bottle-three" src={goldenBottle} alt="Golden yellow fresh juice bottle" fetchPriority="high" /></div><p>Spears N Sprouts • fresh & local</p></div>
      <a className="hero-scroll" href="#juices"><span>Explore</span><i aria-hidden="true">↓</i></a>
    </section>
    <section className="juices-section liquid-section" id="juices"><div className="section-copy"><SectionHeading kicker="Our juices & shots" title="A colorful pour for every mood.">Choose from fruit, vegetable blends, and small ginger or turmeric shots.</SectionHeading><div className="juice-note"><span aria-hidden="true">✺</span><p><strong>Our veggie trio:</strong><br />Celery, cucumber, and broccoli.</p></div></div><div className="juice-grid">{products.map((juice) => <JuiceCard juice={juice} key={juice.id} />)}</div></section>
    <section className="ingredients-section liquid-section" id="ingredients"><SectionHeading kicker="Color from the garden" title="Fresh things we may pour.">Examples of ingredients Spears N Sprouts may use—each one bright, simple, and recognizable.</SectionHeading><div className="ingredient-cloud">{ingredients.map((ingredient, index) => <div className={`ingredient-sticker ${ingredient.color}`} style={{ '--tilt': `${index % 2 ? 4 : -4}deg` }} key={ingredient.name}><span aria-hidden="true">{ingredient.icon}</span><strong>{ingredient.name}</strong></div>)}</div><p className="ingredient-note">The veggie blend includes celery, cucumber, and broccoli.</p></section>
    <section className="how-section liquid-section" id="how-it-works"><SectionHeading kicker="From our juicer to your door" title="Fresh is this simple." light /><ol className="steps"><li><span>01</span><h3>Build your order</h3><p>Choose your juices, quantities, and preferences.</p></li><li><span>02</span><h3>Email your request</h3><p>Review the prepared email and press Send in your email app.</p></li><li><span>03</span><h3>We confirm</h3><p>We’ll confirm availability, fulfillment details, and final pricing.</p></li><li><span>04</span><h3>Pay after approval</h3><p>Send payment only after your order has been confirmed.</p></li></ol></section>
    <section className="delivery-section liquid-section" id="delivery"><div className="delivery-map" aria-hidden="true"><div className="map-ring ring-one" /><div className="map-ring ring-two" /><span className="map-pin pin-one"><i />Putnam County</span><span className="map-pin pin-two"><i />Palatka Pickup</span><div className="map-road" /></div><div className="delivery-content"><SectionHeading kicker="Local delivery & pickup" title="Choose what works for you.">{businessDetails.serviceArea}</SectionHeading><div className="detail-grid">{businessDetails.delivery.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="pickup-callout"><strong>Thursday pickup · 3:30–5:30 PM</strong><p>Palatka Post Office<br />1105 Saint Johns Avenue<br />Palatka, Florida 32177</p></div></div></section>
    <section className="about-section liquid-section" id="about"><div className="about-art" aria-hidden="true"><span className="about-sun" /><span className="about-leaf leaf-one" /><span className="about-leaf leaf-two" /><strong>Made<br />with care</strong></div><div className="about-copy"><SectionHeading kicker="Meet the maker" title="About Spears N Sprouts">Our story is coming soon.</SectionHeading><p>This space is intentionally waiting for the owner’s own words.</p>{/* Owner: replace this placeholder with the final Spears N Sprouts story when it is ready. */}</div></section>
    <section className="faq-section liquid-section" id="faq"><div className="faq-intro"><SectionHeading kicker="Good questions" title="The juicy details.">Freshness, fulfillment, payment, cancellations, and storage—all in one place.</SectionHeading><div className="faq-fruit" aria-hidden="true"><span>?</span></div></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div></section>
    <OrderSection key={products.map((product) => `${product.id}:${product.available}`).join('|')} />
    <PaymentSection />
  </main>
  <footer><div className="footer-brand"><span className="footer-mark" aria-hidden="true">S</span><div><strong>Spears N Sprouts</strong><p>{businessDetails.serviceArea}</p></div></div><nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#juices">Juices</a><a href="#delivery">Delivery</a><a href="#faq">FAQ</a><a href="#order">Order</a></nav><div className="footer-contact"><strong>Contact Spears N Sprouts</strong><a href={`mailto:${businessDetails.email}`}>{businessDetails.email}</a><span>Phone and social links coming soon.</span></div><p className="copyright">© {new Date().getFullYear()} Spears N Sprouts. Fresh juice, made locally.</p></footer>
  </>
}

export default App
