import React, {useState} from 'react'
import {connect} from 'react-redux'

import Actions from '../state/actions'
import Modes from '../state/modes'
import {login} from '../api'

const Login = ({setProfile, back}) => {

  const [email, setLogin] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)

  const submit = async () => {
    setError(false)
    try {
      const profile = await login(email, pwd)
      localStorage.setItem('profile', JSON.stringify(profile))
      setProfile(profile)
    } catch (e) {
      setError(e.response?.data || e.message)
    }
  }

  return <div className="form login">
    <div><input name="email" value={email} type="text" placeholder="enter e-mail" onChange={(e) => setLogin(e.target.value)} /></div>
    <div><input name="pwd" value={pwd} type="password" placeholder="enter password" onChange={(e) => setPwd(e.target.value)} /></div>
    <div className="button-holder"><button className="back" onClick={back}>Back to menu</button><button onClick={submit}>Sign in</button></div>
    <div className="info">You'll be automatically signed up with specified password if not yet</div>
    {error && <div className="error">{error}</div>}
  </div>
}

export default connect(
  null,
  (dispatch) => ({
    setProfile: (profile) => {
      dispatch({type: Actions.PROFILE, value: profile})
      dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
    },
    back: () => dispatch({type: Actions.MODE, value: Modes.MODE_SHOWCASE})
  })
)(Login)