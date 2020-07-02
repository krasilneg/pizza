import React, {useState} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

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
      select(null)
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
        <tr><th>order date</th><th>status</th></tr>
      </thead>
      <tbody>
    {profile?.orders?.map(order => 
        <tr
          key={`order_${order.id}`}
          className={(order.id == selected?.id) ? 'selected' : ''}
          onClick={() => select((order.id !== selected?.id) ? order : null)}
        >
          <td>{moment(order.when).format('L LT')}</td>
          <td>{status(order.status)}</td>
        </tr>
    )}
      </tbody>
    </table>
    <div className="button-holder">
      <button className="back" onClick={back}>Back to menu</button>
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