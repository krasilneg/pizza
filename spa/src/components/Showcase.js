import React, {useState} from 'react'
import {connect} from 'react-redux'

import Categories from '../state/categories'
import Actions from '../state/actions'

import Header from './Header'
import Options from './Options'

const ShowCase = ({pizzaPages, options, currency, quantities, inc, dec}) => {
  const [curPage, setCurPage] = useState(0)
  const optprops = {options, currency, quantities, inc, dec}
  return <>
    <Header />
    <div className="showcase">
      <div className="menu">
        {(curPage > 0) && <div className="page-nav-btn"><button className="left" onClick={() => setCurPage(curPage - 1)}></button></div>}
        {pizzaPages.map((page, index) => {
          const styles = {backgroundImage: `url(${pizza.image || '/img/pizza.png'})`};
          return <div key={`pg-${index}`} className={`page${(index == curPage) ? ' current' : ''}`}>
            {page.map(pizza =>
              <div key={`pizza-${pizza.id}`} className="pizza">
                <div className="image" style={styles}>
                  <div className="description">{pizza.description}</div>
                </div>
                <div className="title">{pizza.name}</div>
                <div className={`price ${currency}`}>{pizza[`price_${currency}`]}</div>
                <div className="buy">
                  {quantities[pizza.id] > 0 && <button className="dec" title="Remove from cart" onClick={() => dec(pizza)}></button>}
                  {quantities[pizza.id] > 0 && <span className="quantity" title="Quantity in cart">{quantities[pizza.id] || 0}</span>}
                  <button className="inc" title="Add to cart" onClick={() => inc(pizza)}></button>
                </div>
              </div>
            )}
          </div>
        })}
        {(curPage < pizzaPages.length - 1) && <div className="page-nav-btn"><button className="right" onClick={() => setCurPage(curPage + 1)}></button></div>}
      </div>
      <Options {...optprops}/>
    </div>
  </>
}

export default connect(
  (state) => {
    const pages = []
    const options = []
    let page = []
    state.menu.forEach(item => {
      if (item.category == Categories.PIZZA) {
        if (page.length == 8) {
          pages.push(page)
          page = []
        }
        page.push(item)
      } else {
        options.push(item)
      }
    })
    pages.push(page)

    const quan = {}
    state.order.items.forEach(item => {
      quan[item.id] = item.quantity
    })
    return {
      pizzaPages: pages,
      options,
      quantities: quan,
      currency: state.currency
    }
  },
  (dispatch) => ({
    inc: (product) => dispatch({type: Actions.CART_INC, product}),
    dec: (product) => dispatch({type: Actions.CART_DEC, product})
  })
)(ShowCase)