import React, {useState} from 'react'
import {connect} from 'react-redux'

import Modes from '../state/modes'
import Actions from '../state/actions'
import Header from './Header'

const Success = ({back}) => {
  return <>
    <Header/>
    <div className="order-success">
      Your order is successfully accepted. Our manager will connect with you in a while.
    </div>
    <div><button className="back" onClick={back}>Back to menu</button></div>
  </>
}

export default connect(
  null,
  (dispatch, own) => ({
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
  })
)(Success)