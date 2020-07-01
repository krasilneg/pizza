import React, {useState} from 'react'
import {connect} from 'react-redux'

import {order as makeOrder} from '../api'
import Modes from '../state/modes'
import Actions from '../state/actions'
import Currency from '../state/currency'
import Header from './Header'

const Order = ({order, profile, menu, currency, delivery, clear, add, back, edit}) => {
  const [error, setError] = useState(false)

  const prodMap = {};
  let totalCost = 0;
  const positions = [];

  menu.forEach(item => {prodMap[item.id] = item})
  order.items.forEach(({id, quantity}) => {
    const price = prodMap[id][`price_${currency}`]
    const cost = price * quantity
    totalCost += cost
    positions.push({
      id,
      name: prodMap[id].name,
      quantity,
      price,
      cost
    })
  })

  const make = async () => {
    setError(false)

    order.contacts.phone = order.contacts.phone || profile.phone;
    order.contacts.address = order.contacts.address || profile.address;

    try {
      const result = await makeOrder(
        order,
        profile?.uid,
        profile?.token
      )
      clear()
      add(result)
      back()
    } catch (e) {
      setError(e.response?.data || e.message)
    }
  }

  const currencySymbol = (currency == Currency.USD) ? '$' : String.fromCharCode(8364);

  return <>
    <Header/>
    {error && <div className="error">{error}</div>}
    <div className="order-contacts">
      <div><input name="phone" value={order.contacts.phone || profile.phone} type="text" placeholder="enter your phone number" onChange={(e) => edit('phone', e.target.value)} /></div>
      <div>
        <textarea 
          name="address" 
          placeholder="enter your address" 
          onChange={(e) => edit('address', e.target.value)} 
          value={order.contacts.address || profile.address}
        >
        </textarea>
      </div>
    </div>
    <table className="order-positions">
      <thead>
        <tr><th>name</th><th>quantity</th><th>price</th><th>cost</th></tr>
      </thead>
      <tbody>
    {positions.map(({id, name, quantity, price, cost}) => 
        <tr
          key={`order_pos_${id}`}
        >
          <td>{name}</td>
          <td>{quantity}</td>
          <td>{currencySymbol}{price}</td>
          <td>{currencySymbol}{cost}</td>
        </tr>
    )}
      </tbody>
      <tfoot>
        <tr className="sub-total"><td colSpan="3">Subtotal</td><td>{currencySymbol}{totalCost}</td></tr>
        <tr className="delivery"><td colSpan="3">Delivery</td><td>{currencySymbol}{delivery[currency]}</td></tr>
        <tr className="total"><td colSpan="3">Total</td><td>{currencySymbol}{totalCost + delivery[currency]}</td></tr>
      </tfoot>
    </table>
    <div>
      <button className="back" onClick={back}>Back</button>
      <button className="make" onClick={make}>Make order</button>
    </div>
  </>
}

export default connect(
  ({order, profile, menu, currency, delivery}) => ({order, profile, menu, currency, delivery}),
  (dispatch) => ({
    clear: () => dispatch({type: Actions.ORDER_CLEAR}),
    add: (order) => dispatch({type: Actions.HISTORY_ADD, value: order}),
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE}),
    edit: (nm, value) => dispatch({type: Actions.CUSTOMER_OPTION, option: nm, value})
  })
)(Order)