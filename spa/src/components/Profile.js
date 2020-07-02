import React, {useState} from 'react'
import {connect} from 'react-redux'

import {saveProfile} from '../api'
import Modes from '../state/modes'
import Actions from '../state/actions'
import Header from './Header'

const Profile = ({uid, token, phone, address, setAttr, back}) => {
  const [error, setError] = useState(false)

  const edit = async (nm, value) => {
    setError(false)
    if (nm == 'phone') {
      if (!/^\d{11}$/.test(value)) {
        return setError('Phone number should be specified as 11 digit number')
      }
    }
    try {
      await saveProfile(Object.assign({}, {uid, token, phone, address}, {[nm]: value}))
      setAttr(nm, value)
    } catch (e) {
      setError(e.response?.data || e.message)
    }
  }

  return <>
    <Header/>
    <div className="form profile">
      <div>
        <input
          name="phone"
          defaultValue={phone}
          type="text"
          placeholder="enter your phone number"
          onBlur={(e) => edit('phone', e.target.value)}
        />
      </div>
      <div>
        <textarea
          name="address"
          defaultValue={address}
          placeholder="enter your address"
          onBlur={(e) => edit('address', e.target.value)}
        ></textarea>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
    <div className="button-holder"><button className="back" onClick={back}>Back to menu</button></div>
  </>
}

export default connect(
  ({profile}) => (
    {
      uid: profile?.uid,
      token: profile?.token,
      phone: profile?.phone || '',
      address: profile?.address || ''
    }
  ),
  (dispatch, own) => ({
    setAttr: (nm, value) => dispatch({type: Actions.PROFILE_ATTR, attr: nm, value}),
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
  })
)(Profile)