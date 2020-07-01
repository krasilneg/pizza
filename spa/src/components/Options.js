import React, {useState} from 'react'

import Categories from '../state/categories'

export default ({options, currency, quantities, inc, dec}) => {
  const [optFilter, setOptFilter] = useState([])

  const selectOptFilter = (code) => {
    if (optFilter.includes(code)) {
      setOptFilter(optFilter.filter(ch => ch != code))
    } else {
      setOptFilter(optFilter.concat(code))
    }
  }

  return <>
      <div className="options-filter">
        <button className={optFilter.includes(Categories.DRINK) ? 'active' : ''} onClick={() => selectOptFilter(Categories.DRINK)}>Drinks</button>
        <button className={optFilter.includes(Categories.SALAD) ? 'active' : ''} onClick={() => selectOptFilter(Categories.SALAD)}>Salads</button>
        <button className={optFilter.includes(Categories.SAUCE) ? 'active' : ''} onClick={() => selectOptFilter(Categories.SAUCE)}>Sauces</button>
      </div>
      <div className="options">
        {options
          .filter(({category}) => (optFilter.length == 0) || optFilter.includes(category))
          .map((option) => {
            const styles = {backgroundImage: `url(${pizza.image || `/img/${option.category}.png`})`};
            return <div key={`option-${option.id}`} className="option">
              <div className="image" style={styles}>
                <div className="description">{option.description}</div>
              </div>
              <div className="title">{option.name}</div>
              <div className={`price ${currency}`}>{option[`price_${currency}`]}</div>
              <div className="buy">
                {quantities[option.id] > 0 && <button className="dec" title="Remove from cart" onClick={() => dec(option)}></button>}
                {quantities[option.id] > 0 && <span className="quantity" title="Quantity in cart">{quantities[option.id] || 0}</span>}
                <button className="inc" title="Add to cart" onClick={() => inc(option)}></button>
              </div>
            </div>        
        })}
      </div>  
  </>
}