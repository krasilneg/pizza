import React, {useState} from 'react'
import {connect} from 'react-redux'

import {order as makeOrder} from '../api'
import Modes from '../state/modes'
import Actions from '../state/actions'
import Currency from '../state/currency'
import Header from './Header'

const Order = ({
  order, profile, menu, delivery, email, phone, address,
  set, clear, add, success, back, edit
}) => {
  const [error, setError] = useState(false)

  const prodMap = {};
  let totalCost_usd = 0;
  let totalCost_euro = 0;

  menu.forEach(item => {prodMap[item.id] = item})

  const make = async () => {
    setError(false)

    order.items = order.items.filter(item => item.quantity > 0)

    if (!order.items.length) {
      return setError('Order is empty')
    }    

    order.contacts.phone = order.contacts.phone || profile?.phone;
    order.contacts.address = order.contacts.address || profile?.address;

    if (!order.contacts.phone || !order.contacts.address) {
      return setError('Phone number or delivery address is not specified');
    }

    try {
      const result = await makeOrder(
        order,
        profile?.uid,
        profile?.token
      )
      clear()
      add(result)
      success()
    } catch (e) {
      setError(e.response?.data || e.message)
    }
  }

  const usd = '$'
  const euro = String.fromCharCode(8364);

  return <>
    <Header/>
    {error && <div className="error">{error}</div>}
    <table className="order-positions">
      <thead>
        <tr><th>name</th><th>quantity</th><th>price in $</th><th>price in &#8364;</th><th>cost in $</th><th>cost in &#8364;</th></tr>
      </thead>
      <tbody>
    {order.items.map(({id, quantity}) => {
      const product = prodMap[id];
      const price_usd = parseFloat(prodMap[id].price_usd)
      const price_euro = parseFloat(prodMap[id].price_euro)
      const cost_usd = price_usd * quantity
      const cost_euro = price_euro * quantity
      totalCost_usd += cost_usd
      totalCost_euro += cost_euro
  
      return <tr
          key={`order_pos_${id}`}
        >
          <td className="left">{product.name}</td>
          <td className="editable"><input type="number" value={quantity} onChange={(e) => set(product, e.target.value) }/></td>
          <td>{usd}{price_usd.toFixed(2)}</td>
          <td>{euro}{price_euro.toFixed(2)}</td>
          <td>{usd}{cost_usd.toFixed(2)}</td>
          <td>{euro}{cost_euro.toFixed(2)}</td>          
        </tr>
    })}
      </tbody>
      <tfoot>
        <tr className="sub-total">
          <td className="left" colSpan="4">Subtotal</td>
          <td>{usd}{totalCost_usd.toFixed(2)}</td>
          <td>{euro}{totalCost_euro.toFixed(2)}</td>
        </tr>
        <tr className="delivery">
          <td className="left" colSpan="4">Delivery</td>
          <td>{usd}{delivery.usd.toFixed(2)}</td>
          <td>{euro}{delivery.euro.toFixed(2)}</td>
        </tr>
        <tr className="total">
          <td className="left" colSpan="4">Total</td>
          <td>{usd}{(totalCost_usd + delivery.usd).toFixed(2)}</td>
          <td>{euro}{(totalCost_euro + delivery.euro).toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
    <div className="order-contacts form">
      {!profile && 
        <div>
          <input
            name="phone"
            value={email}
            type="text"
            placeholder="enter your email"
            onChange={(e) => edit('email', e.target.value)}
          />
        </div>
      }
      <div>
        <input
          name="phone"
          value={phone}
          type="text"
          placeholder="enter your phone number"
          onChange={(e) => edit('phone', e.target.value)}
        />
      </div>
      <div>
        <textarea 
          name="address" 
          placeholder="enter your address" 
          onChange={(e) => edit('address', e.target.value)} 
          value={address}
        >
        </textarea>
      </div>
    </div>    
    <div className="button-holder">
      <button className="back" onClick={back}>Back to menu</button>
      <button className="make" onClick={make}>Make order</button>
    </div>
  </>
}

export default connect(
  ({order, profile, menu, delivery}) => (
    {
      order,
      profile,
      menu,
      delivery,
      email: order.contacts.email || profile?.uid || '',
      phone: order.contacts.phone || profile?.phone || '',
      address: order.contacts.address || profile?.address || ''
    }
  ),
  (dispatch) => ({
    clear: () => dispatch({type: Actions.ORDER_CLEAR}),
    set: (product, value) => dispatch({type: Actions.CART_SET, product, value}),
    add: (order) => dispatch({type: Actions.HISTORY_ADD, value: order}),
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE}),
    success: () => dispatch({type: Actions.MODE, value: Modes.MODE_ORDERED}),
    edit: (nm, value) => dispatch({type: Actions.CUSTOMER_OPTION, option: nm, value})
  })
)(Order)