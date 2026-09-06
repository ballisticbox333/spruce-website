const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export function createOrderMailto({ customer, selectedItems, quantities, subtotal, deliveryFee, total, email }) {
  const customized = customer.customization.trim().length > 0
  const productLines = selectedItems
    .filter((juice) => juice.available)
    .map((juice) => `${quantities[juice.id]} × ${juice.name} (${juice.size}) — ${money(juice.price)} each — ${money(quantities[juice.id] * juice.price)}`)
  const body = [
    'SPEARS N SPROUTS ORDER REQUEST', '',
    `Customer name: ${customer.name.trim()}`,
    `Phone number: ${customer.phone.trim()}`,
    `Fulfillment: ${customer.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}`,
    customer.fulfillment === 'delivery'
      ? `Delivery address: ${customer.address.trim()}`
      : 'Pickup location: Palatka Post Office, 1105 Saint Johns Avenue, Palatka, Florida 32177',
    `Preferred day: ${customer.day}`,
    `Preferred time: ${customer.time.trim() || 'No preference provided'}`,
    `Product preference: ${customer.frozen}`, '',
    'SELECTED JUICES:', ...productLines, '',
    `Product subtotal: ${money(subtotal)}`,
    customer.fulfillment === 'delivery' ? `Delivery fee: ${money(deliveryFee)}` : 'Delivery fee: Not applicable (pickup)',
    `Estimated total: ${money(total)}`, '',
    `Customization requests: ${customer.customization.trim() || 'None'}`,
    `Notes: ${customer.notes.trim() || 'None'}`, '',
    customized ? 'Customized juice pricing may vary. I understand that the final price will be confirmed before payment.' : '',
    'This is an order request. I understand that Spears N Sprouts will confirm availability, final pricing, and fulfillment details before payment is made.',
  ].filter((line) => line !== '').join('\n')

  return `mailto:${email}?subject=${encodeURIComponent('Spears N Sprouts Order Request')}&body=${encodeURIComponent(body)}`
}
