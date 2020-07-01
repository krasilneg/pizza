import React, {useState} from 'react'
import {connect} from 'react-redux'

import Modes from '../state/modes'
import Actions from '../state/actions'
import Currency from '../state/currency'

import UserMenu from './UserMenu'

const Header = ({currency, profile, cartSize, startLogin, startOrder, setCurrency}) => {
  return <div className="header">
    {profile && <UserMenu />}
    {!profile && <a className="sign-in-link" href="#" onClick={startLogin}>Sign in</a>}
    {(cartSize > 0) && <div className="cart" title="Make order" onClick={startOrder}><div className={`size ${currency}`}>{cartSize}</div></div>}
    <div className="currency-selector" title="select currency for price display">
      <div
        className={`${currency}-currency`}
        title={currency}
        onClick={() => setCurrency(currency == Currency.USD ? Currency.EURO : Currency.USD)}
      >
      </div>
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