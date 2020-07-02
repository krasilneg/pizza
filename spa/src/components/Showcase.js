import React from 'react'
import {connect} from 'react-redux'

import Categories from '../state/categories'
import Actions from '../state/actions'

import Header from './Header'
import Item from './Item'
import Options from './Options'

const ShowCase = ({pizzas, options, currency, quantities, inc, dec}) => {
  const optprops = {options, currency, quantities, inc, dec}
  return <>
    <Header />
    <div className="showcase">
      <div className="menu">
        <a name="pizzas" />
        {pizzas.map(item => {
          const props = {item, className: 'pizza', currency, quantities, inc, dec};
          return <Item key={`item-${item.id}`} {...props} />
        })}
      </div>
      <a name="options" />
      <Options {...optprops}/>
    </div>
  </>
}

export default connect(
  ({menu, order, currency}) => {
    const options = []
    const pizzas = []
    menu.forEach(item => {
      if (item.category == Categories.PIZZA) {
        pizzas.push(item)
      } else {
        options.push(item)
      }
    })
    const quantities = {}
    order.items.forEach(item => {
      quantities[item.id] = item.quantity
    })
    return {pizzas, options, quantities, currency}
  },
  (dispatch) => ({
    inc: (product) => dispatch({type: Actions.CART_INC, product}),
    dec: (product) => dispatch({type: Actions.CART_DEC, product})
  })
)(ShowCase)