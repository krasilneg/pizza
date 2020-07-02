import React, {useState} from 'react'
import {connect} from 'react-redux'

import Modes from '../state/modes'
import Actions from '../state/actions'
import Currency from '../state/currency'

import UserMenu from './UserMenu'

const Header = ({currency, profile, cartSize, startLogin, startOrder, setCurrency}) => {
  return <div className="header">
    <div className="container">
      <a href="#pizzas">Pizzas</a>
      <a href="#options">Options</a>
      <div className="currency-selector">
        <div
          className={`${currency == Currency.USD ? Currency.EURO : Currency.USD}-currency`}
          title="select currency for price display"
          onClick={() => setCurrency(currency == Currency.USD ? Currency.EURO : Currency.USD)}
        >
        </div>
      </div>
      {(cartSize > 0) && <div className="cart" title="Make order" onClick={startOrder}><div className={`size ${currency}`}>{cartSize.toFixed(2)}</div></div>}
      {profile && <UserMenu />}
      {!profile && <a className="sign-in-link" href="#" onClick={startLogin}>Sign in</a>}
    </div>
  </div>

}

export default connect(
  (state) => {
    let cart = 0
    state.order.items.forEach(item => {
      cart += item.quantity * item[`price_${state.currency}`]
    })
    return {
      currency: state.currency,
      profile: state.profile,
      cartSize: cart
    }
  },
  (dispatch) => ({
    startLogin: () => dispatch({type: Actions.MODE, value: Modes.MODE_LOGIN}),
    startOrder: () => dispatch({type: Actions.MODE, value: Modes.MODE_ORDER}),
    setCurrency: (currency) => dispatch({type: Actions.CURRENCY, value: currency})
  })
)(Header)