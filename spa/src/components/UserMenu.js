import React, {useState} from 'react'
import {connect} from 'react-redux'

import Modes from '../state/modes'
import Actions from '../state/actions'

const UserMenu = ({profile, logout, openProfile, openHistory}) => {
  // TODO This should be done with styled components
  return <div className="user-menu">
    <div className="uid">{profile.uid}</div>
    <div className="popup">
      <a href="#" onClick={openProfile}>Your profile</a>
      <a href="#" onClick={openHistory}>Your orders</a>
      <a href="#" onClick={logout}>Sign out</a>
    </div>
  </div>

}

export default connect(
  (state) => ({profile: state.profile}),
  (dispatch) => ({
    logout: () => {
      dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
      dispatch({type: Actions.PROFILE, value: null})
    },
    openProfile: () => dispatch({type: Actions.MODE, value: Modes.MODE_PROFILE}),
    openHistory: () => dispatch({type: Actions.MODE, value: Modes.MODE_HISTORY})
  })
)(UserMenu)