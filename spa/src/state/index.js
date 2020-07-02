import { createStore } from 'redux'
import Modes from './modes'
import Currency from './currency'
import reducers from './operations'
import * as api from '../api'
import Actions from './actions'

export const store = createStore(reducers,
  {
    mode: Modes.MODE_LOADING,
    currency: Currency.USD, 
    menu: [],
    delivery: {
      [Currency.USD]: 0,
      [Currency.EURO]: 0
    },
    profile: null,
    order: {
      items: [],
      contacts: {
        email: '',
        phone: '',
        address: ''
      }
    }
  }
)

const setter = (action) => (value) => store.dispatch({type: action, value})

export const setMode = setter(Actions.MODE)

const setCurrency = setter(Actions.CURRENCY)

const setMenu = setter(Actions.MENU)
const setDelivery = setter(Actions.DELIVERY)
const setProfile = setter(Actions.PROFILE)
const setOrder = setter(Actions.ORDER)


export const init = async () => {
  // TODO implement menu cache lifetime
  const showCase = await api.getShowCase()
  setMenu(showCase.menu)
  setDelivery(showCase.delivery)

  let profile = localStorage.getItem('profile')
  if (profile) {
    profile = JSON.parse(profile)
    try {
       // TODO implement token lifetime
      profile = await api.checkToken(profile.uid, profile.token)
      setProfile(profile)
    } catch (e) {
      localStorage.removeItem('profile')
    }
  }

  let order = localStorage.getItem('order')
  if (order) {
    setOrder(JSON.parse(order))
  }

  let currency = localStorage.getItem('currency')
  if (currency) {
    setCurrency(currency)
  }
  setMode(Modes.MODE_SHOWCASE)
}
