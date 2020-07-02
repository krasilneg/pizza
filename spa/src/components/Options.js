import React, {useState} from 'react'

import Item from './Item'

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
      <h3>Options</h3>
      <div className="options-filter">
        <button className={optFilter.includes(Categories.DRINK) ? 'active' : ''} onClick={() => selectOptFilter(Categories.DRINK)}>Drinks</button>
        <button className={optFilter.includes(Categories.SALAD) ? 'active' : ''} onClick={() => selectOptFilter(Categories.SALAD)}>Salads</button>
        <button className={optFilter.includes(Categories.SAUCE) ? 'active' : ''} onClick={() => selectOptFilter(Categories.SAUCE)}>Sauces</button>
      </div>
      <div className="options">
        {options
          .filter(({category}) => (optFilter.length == 0) || optFilter.includes(category))
          .map((item) => {
            const props = {item, className: 'option', currency, quantities, inc, dec};
            return <Item key={`item-${item.id}`} {...props} />       
        })}
      </div>  
  </>
}