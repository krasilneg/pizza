import React, {useState} from 'react'
import {connect} from 'react-redux'

import {saveProfile} from '../api'
import Modes from '../state/modes'
import Actions from '../state/actions'
import Header from './Header'

const Profile = ({profile, setAttr, back}) => {
  const [error, setError] = useState(false)

  const edit = async (nm, value) => {
    setError(false)
    try {
      await saveProfile(Object.assign({}, profile, {[nm]: value}))
      setAttr(nm, value)
    } catch (e) {
      setError(e.response?.data || e.message)
    }
  }

  return <>
    <Header/>
    <div className="profile-form">
      <div><input name="phone" value={profile.phone} type="text" placeholder="enter your phone number" onChange={(e) => edit('phone', e.target.value)} /></div>
      <div><textarea name="address" placeholder="enter your address" onChange={(e) => edit('address', e.target.value)} value={profile.address}></textarea></div>
      {error && <div className="error">{error}</div>}
    </div>
    <div><button className="back" onClick={back}>Back</button></div>
  </>
}

export default connect(
  (state) => ({profile: state.profile}),
  (dispatch, own) => ({
    setAttr: (nm, value) => dispatch({type: Actions.PROFILE_ATTR, attr: nm, value}),
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
  })
)(Profile)