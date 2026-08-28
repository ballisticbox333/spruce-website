import { useEffect, useState } from 'react'
import './App.css'
import spruceLogo from './assets/logo/spruce-logo.jpg'
import deepOrangeBottle from './assets/bottles/hero-bottle-deep-cutout.png'
import brightOrangeBottle from './assets/bottles/hero-bottle-bright-cutout.png'
import goldenBottle from './assets/bottles/hero-bottle-golden-cutout.png'

const navigation = [
  ['Juices', '#juices'], ['Ingredients', '#ingredients'], ['How it works', '#how-it-works'],
  ['Delivery', '#delivery'], ['About', '#about'], ['FAQ', '#faq'],
]

// Add future juices to this array. The product grid will expand automatically.
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

// Owner-editable delivery and contact details are grouped here.
const businessDetails = {
  serviceArea: 'Serving Satsuma, Palatka, and surrounding communities.',
  delivery: [
    ['Delivery Radius', 'TBD'], ['Delivery Fee', 'TBD'], ['Minimum Order', 'TBD'],
    ['Delivery Days', 'TBD'], ['Delivery Hours', 'TBD'], ['Pickup Availability', 'TBD'],
  ],
  contact: [['Phone', 'TODO'], ['Text', 'TODO'], ['Email', 'TODO'], ['Facebook', 'TODO'], ['Instagram', 'TODO']],
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Spruce home">
        <img className="brand-logo" src={spruceLogo} alt="" decoding="async" />
        <span>Spruce <small>Vegetable Juicing Co.</small></span>
      </a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        <span aria-hidden="true" className={menuOpen ? 'menu-icon open' : 'menu-icon'}><i /><i /><i /></span>
      </button>
      <nav id="site-navigation" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">
        {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-order" href="#order" onClick={() => setMenuOpen(false)}>Order juice</a>
      </nav>
    </header>
  )
}

function SectionHeading({ kicker, title, children, light = false }) {
  return <div className={`section-heading${light ? ' light' : ''}`}><p>{kicker}</p><h2>{title}</h2>{children && <div>{children}</div>}</div>
}

function JuiceCard({ juice }) {
  return (
    <article className={`juice-card tone-${juice.tone}`}>
      <div className="juice-card-top"><span>{juice.type}</span><strong>${juice.price}</strong></div>
      <div className="juice-seal" aria-hidden="true"><i>{juice.mark}</i><span /></div>
      <h3>{juice.name}</h3><p>{juice.description}</p>
      <dl><div><dt>Size</dt><dd>{juice.size}</dd></div><div><dt>Ingredients</dt><dd>{juice.ingredients.join(', ')}</dd></div></dl>
      <a className="button button-dark" href="#order" onClick={() => window.dispatchEvent(new CustomEvent('spruce-select-juice', { detail: juice.id }))}>Order this juice <span aria-hidden="true">→</span></a>
    </article>
  )
}

function OrderSection() {
  const [quantity, setQuantity] = useState(1)
  const [selectedId, setSelectedId] = useState(juices[0].id)
  const [message, setMessage] = useState('')
  const selectedJuice = juices.find((juice) => juice.id === selectedId) ?? juices[0]
  const total = quantity * selectedJuice.price
  useEffect(() => {
    const selectJuice = (event) => setSelectedId(event.detail)
    window.addEventListener('spruce-select-juice', selectJuice)
    return () => window.removeEventListener('spruce-select-juice', selectJuice)
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Online ordering is not active yet. Your information has not been sent. Please contact Spruce once contact details are added.')
  }

  return (
    <section className="order-section liquid-section" id="order">
      <div className="order-intro">
        <SectionHeading kicker="Ready for a fresh pour?" title="Start your order." light>
          Build your order below. Final availability and delivery details must be confirmed by Spruce.
        </SectionHeading>
        <div className="order-total"><span>Your estimated total</span><strong>${total}</strong><small>{quantity} × {selectedJuice.name}</small></div>
        <div className="contact-card"><h3>Questions first?</h3><p>Owner contact details will be added here.</p>{businessDetails.contact.slice(0, 3).map(([label, value]) => <span key={label}><b>{label}</b> {value}</span>)}</div>
      </div>
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-row"><label>Name<input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="Your phone number" /></label></div>
        <label>Delivery address or delivery area<input name="address" type="text" autoComplete="street-address" required placeholder="Street address, Satsuma, Palatka, or nearby area" /></label>
        <div className="form-row"><label>Juice selection<select name="juice" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>{juices.map((juice) => <option value={juice.id} key={juice.id}>{juice.name} — ${juice.price}</option>)}</select></label><label>Quantity<input name="quantity" type="number" min="1" max="99" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} /></label></div>
        <div className="form-row"><label>Preferred delivery day<input name="day" type="text" placeholder="Day preference" /></label><label>Preferred delivery time<input name="time" type="text" placeholder="Time preference" /></label></div>
        <label>Notes<textarea name="notes" rows="4" placeholder="Anything Spruce should know?" /></label>
        <div className="form-summary"><span>Estimated total</span><strong>${total}</strong></div>
        <button className="button submit-button" type="submit">Review order request <span aria-hidden="true">→</span></button>
        <p className="form-disclaimer">This form does not send information or collect payment yet.</p>
        {message && <output className="form-message" aria-live="polite">{message}</output>}
      </form>
    </section>
  )
}

function App() {
  return (
    <><Header /><main>
      <section className="hero" id="home">
        <div className="hero-swirls" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-copy"><p className="eyebrow">Handmade in Satsuma, Florida</p><h1>Fresh juice with a <em>local squeeze.</em></h1><p className="hero-tagline">Pressed fresh. Made locally. Brought to your door.</p><div className="hero-actions"><a className="button button-cream" href="#juices">See our juices <span aria-hidden="true">↓</span></a><a className="button button-outline" href="#order">Place an order <span aria-hidden="true">→</span></a></div></div>
        <div className="bottle-stage">
          <div className="bottle-floaters" aria-label="Three colorful bottles of Spruce juice">
            <span className="bottle-shadow shadow-one" aria-hidden="true" /><span className="bottle-shadow shadow-two" aria-hidden="true" /><span className="bottle-shadow shadow-three" aria-hidden="true" />
            <img className="hero-bottle bottle-one" src={deepOrangeBottle} alt="Deep orange Spruce juice bottle" fetchPriority="high" />
            <img className="hero-bottle bottle-two" src={brightOrangeBottle} alt="Bright orange Spruce juice bottle" fetchPriority="high" />
            <img className="hero-bottle bottle-three" src={goldenBottle} alt="Golden yellow Spruce juice bottle" fetchPriority="high" />
          </div>
          <p>Freshly made • locally delivered</p>
        </div>
        <a className="hero-scroll" href="#juices"><span>Explore</span><i aria-hidden="true">↓</i></a>
      </section>

      <section className="juices-section liquid-section" id="juices">
        <div className="section-copy"><SectionHeading kicker="Our juices & shots" title="A colorful pour for every mood.">Choose from fruit, vegetable blends, and small ginger or turmeric shots.</SectionHeading><div className="juice-note"><span aria-hidden="true">✺</span><p><strong>Our veggie trio:</strong><br />Celery, cucumber, and broccoli.</p></div></div>
        <div className="juice-grid">{juices.map((juice) => <JuiceCard juice={juice} key={juice.id} />)}</div>
      </section>

      <section className="ingredients-section liquid-section" id="ingredients">
        <SectionHeading kicker="Color from the garden" title="Fresh things we may pour.">Examples of ingredients Spruce may use—each one bright, simple, and recognizable.</SectionHeading>
        <div className="ingredient-cloud">{ingredients.map((ingredient, index) => <div className={`ingredient-sticker ${ingredient.color}`} style={{ '--tilt': `${index % 2 ? 4 : -4}deg` }} key={ingredient.name}><span aria-hidden="true">{ingredient.icon}</span><strong>{ingredient.name}</strong></div>)}</div>
        <p className="ingredient-note">The veggie blend includes celery, cucumber, and broccoli.</p>
      </section>

      <section className="how-section liquid-section" id="how-it-works">
        <SectionHeading kicker="From our juicer to your door" title="Fresh is this simple." light />
        <ol className="steps"><li><span>01</span><h3>Pick your juice</h3><p>Choose from what’s currently available.</p></li><li><span>02</span><h3>Place your order</h3><p>Share what you’d like and where you are.</p></li><li><span>03</span><h3>We make it fresh</h3><p>Your juice is made locally by the owner.</p></li><li><span>04</span><h3>We bring it to you</h3><p>Confirm the local delivery details with Spruce.</p></li></ol>
      </section>

      <section className="delivery-section liquid-section" id="delivery">
        <div className="delivery-map" aria-hidden="true"><div className="map-ring ring-one" /><div className="map-ring ring-two" /><span className="map-pin pin-one"><i />Satsuma</span><span className="map-pin pin-two"><i />Palatka</span><div className="map-road" /></div>
        <div className="delivery-content"><SectionHeading kicker="Your neighborhood juice stop" title="Very local. Very fresh.">{businessDetails.serviceArea}</SectionHeading><div className="detail-grid">{businessDetails.delivery.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><p className="placeholder-hint">These details are ready for the owner to complete.</p></div>
      </section>

      <section className="about-section liquid-section" id="about">
        <div className="about-art" aria-hidden="true"><span className="about-sun" /><span className="about-leaf leaf-one" /><span className="about-leaf leaf-two" /><strong>Made<br />with care</strong></div>
        <div className="about-copy"><SectionHeading kicker="Meet the maker" title="About Spruce">Our story is coming soon.</SectionHeading><p>This space is intentionally waiting for the owner’s own words.</p>
          {/* Owner: use this section to share who you are, why you started making juice, why you created Spruce, what making juice means to you, how the business started, and what makes it local and personal. */}
        </div>
      </section>

      <section className="faq-section liquid-section" id="faq">
        <div className="faq-intro"><SectionHeading kicker="Good questions" title="The juicy details.">The questions are ready. The owner’s answers are coming soon.</SectionHeading><div className="faq-fruit" aria-hidden="true"><span>?</span></div></div>
        <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <OrderSection />

      <section className="payment-section">
        <SectionHeading kicker="Payment options" title="Simple ways to pay.">No card details are collected on this website. Payment information will be added after the owner confirms it.</SectionHeading>
        <div className="payment-grid"><article><span className="payment-icon">$</span><h3>Cash App</h3><p>TODO: Add payment link</p></article><article><span className="payment-icon">Z</span><h3>Zelle</h3><p>TODO: Add payment information / QR code</p><div className="qr-placeholder" aria-label="Placeholder for a future Zelle QR code">QR</div></article><article><span className="payment-icon">☺</span><h3>Pay in person</h3><p>TODO: Add details</p></article></div>
      </section>
    </main>
    <footer><div className="footer-brand"><img className="footer-logo" src={spruceLogo} alt="Spruce Vegetable Juicing Company logo" loading="lazy" decoding="async" /><div><strong>Spruce Vegetable<br />Juicing Company</strong><p>{businessDetails.serviceArea}</p></div></div><nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#juices">Juices</a><a href="#delivery">Delivery</a><a href="#faq">FAQ</a><a href="#order">Order</a></nav><div className="footer-contact">{businessDetails.contact.map(([label, value]) => <span key={label}><b>{label}</b> {value}</span>)}</div><p className="copyright">© {new Date().getFullYear()} Spruce Vegetable Juicing Company. Made fresh and local.</p></footer>
    </>
  )
}

export default App
