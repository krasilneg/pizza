import React, {useState} from 'react'
import {connect} from 'react-redux'

import {cancel} from '../api'
import Modes from '../state/modes'
import Actions from '../state/actions'
import Header from './Header'
import Status from '../state/order-status'

const History = ({profile, remove, back}) => {
  const [error, setError] = useState(false)
  const [selected, select] = useState(null)

  const cancelOrder = async () => {
    setError(false)
    try {
      await cancel(selected.id, profile.uid, profile.token)
      remove(selected.id)
    } catch (e) {
      setError(e.response?.data || e.message)
    }
  }

  const status = (code) => {
    switch (code) {
      case Status.PENDING: return 'pending'
      case Status.INWORK: return 'in work'
      case Status.DELIVERING: return 'delivery'
    }
  }

  return <>
    <Header/>
    {error && <div className="error">{error}</div>}
    <table className="history">
      <thead>
        <tr><th>order date</th><th>status</th><th></th></tr>
      </thead>
      <tbody>
    {profile.orders.map(order => 
        <tr
          key={`order_${order.id}`}
          className={(order.id == selected) ? 'selected' : ''}
          onClick={() => select((order.id !== selected?.id) ? order : null)}
        >
          <td>{order.when}</td>
          <td>{status(order.status)}</td>
        </tr>
    )}
      </tbody>
    </table>
    <div>
      <button className="back" onClick={back}>Back</button>
      {selected && (selected.status == 1) && <button className="cancel" onClick={() => cancelOrder()}>Cancel order</button>}
    </div>
  </>
}

export default connect(
  ({profile}) => ({profile}),
  (dispatch) => ({
    remove: (id) => dispatch({type: Actions.HISTORY_REMOVE, id}),
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
  })
)(History)