import React, {useState} from 'react'
import {connect} from 'react-redux'

import Modes from '../state/modes'
import Actions from '../state/actions'
import Header from './Header'

const Success = ({back}) => {
  return <>
    <Header/>
    <div className="form">
      <div className="info">
        Your order is successfully accepted. Our manager will be in touch with you in a while.
      </div>
      <div className="button-holder"><button className="back" onClick={back}>Back to menu</button></div>
    </div>
  </>
}

export default connect(
  null,
  (dispatch, own) => ({
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
  })
)(Success)