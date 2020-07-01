import React from 'react'
import {connect} from 'react-redux'

import Modes from '../state/modes'

import ShowCase from './Showcase'
import Login from './Login'
import Profile from './Profile'
import History from './History'
import Order from './Order'


const App = ({mode}) => {
  switch (mode) {
    case Modes.MODE_SHOWCASE: return <ShowCase />
    case Modes.MODE_ORDER: return <Order />
    case Modes.MODE_LOGIN: return <Login />
    case Modes.MODE_PROFILE: return <Profile />
    case Modes.MODE_HISTORY: return <History />
    default: return <div className="loader"></div>
  }
}

export default connect((state) => ({mode: state.mode}))(App)