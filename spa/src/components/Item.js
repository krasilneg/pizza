import React from 'react'

export default ({item, className, currency, quantities, inc, dec}) => {
  const styles = {backgroundImage: `url(${pizza.image || `/img/${item.category}.png`})`};
  return <div className={className}>
    <div className="image" style={styles}>
      <div className="description">{item.description}</div>
    </div>
    <div className="title">{item.name}</div>
    <div className={`price ${currency}`}>{item[`price_${currency}`]}</div>
    <div className="buy">
      {quantities[item.id] > 0 && <button className="dec" title="Remove from cart" onClick={() => dec(item)}></button>}
      {quantities[item.id] > 0 && <span className="quantity" title="Quantity in cart">{quantities[item.id] || 0}</span>}
      <button className="inc" title="Add to cart" onClick={() => inc(item)}></button>
    </div>
  </div>
}