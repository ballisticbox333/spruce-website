// STOCK CONTROL:
// Change a product's available value to false to mark it out of stock.
// Change it back to true when it becomes available again.

export const products = [
  { id: 'beet-veggie', name: 'Beet & Veggie', type: 'Bottle', size: '16 oz', price: 12, description: 'Beet blended with our veggie trio.', ingredients: ['Beet', 'Celery', 'Cucumber', 'Broccoli'], tone: 'beet', mark: 'B', available: true },
  { id: 'carrot-veggie', name: 'Carrot & Veggie', type: 'Bottle', size: '16 oz', price: 12, description: 'Carrot blended with our veggie trio.', ingredients: ['Carrot', 'Celery', 'Cucumber', 'Broccoli'], tone: 'carrot', mark: 'C', available: true },
  { id: 'watermelon', name: 'Watermelon', type: 'Bottle', size: '16 oz', price: 10, description: 'A simple bottle made with watermelon.', ingredients: ['Watermelon'], tone: 'watermelon', mark: 'W', available: true },
  { id: 'carrot', name: 'Carrot', type: 'Bottle', size: '16 oz', price: 10, description: 'A simple bottle made with carrot.', ingredients: ['Carrot'], tone: 'orange', mark: 'C', available: true },
  { id: 'ginger-shot', name: 'Ginger Shot', type: 'Shot', size: '2 oz', price: 5, description: 'A small shot made with ginger.', ingredients: ['Ginger'], tone: 'ginger', mark: 'G', available: true },
  { id: 'turmeric-shot', name: 'Turmeric Shot', type: 'Shot', size: '2 oz', price: 5, description: 'A small shot made with turmeric.', ingredients: ['Turmeric'], tone: 'gold', mark: 'T', available: true },
  { id: 'ginger-turmeric-shot', name: 'Ginger & Turmeric Shot', type: 'Shot', size: '2 oz', price: 7, description: 'A small shot combining ginger and turmeric.', ingredients: ['Ginger', 'Turmeric'], tone: 'sunrise', mark: 'G+T', available: true },
  { id: 'veggie-bottle', name: 'Veggie Bottle', type: 'Bottle', size: '16 oz', price: 12, description: 'Our veggie trio in one bottle.', ingredients: ['Celery', 'Cucumber', 'Broccoli'], tone: 'veggie', mark: 'V', available: true },
]
