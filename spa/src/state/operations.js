import { combineReducers } from 'redux'
import Actions from './actions'
import Currency from './currency'
import Modes from './modes'

const initialOrder = {
  items: [],
  contacts: {
    email: '',
    phone: '',
    address: ''
  }
}

const mode = (state = Modes.MODE_LOADING, action) => (action.type == Actions.MODE) ? action.value : state
const currency = (state = Currency.USD, action) => {
  if (action.type == Actions.CURRENCY) {
    localStorage.setItem('currency', action.value)
    return action.value 
  }
  return state
}
const menu = (state = [], action) => (action.type == Actions.MENU) ? action.value : state
const delivery = (state = {[Currency.USD]: 0, [Currency.EURO]: 0}, action) => (action.type == Actions.DELIVERY) ? action.value : state
const profile = (state = {}, action) => {
  switch (action.type) {
    case Actions.PROFILE: return action.value
    case Actions.PROFILE_ATTR: {
      const result = Object.assign({}, state, {[action.attr]: action.value})
      localStorage.setItem('profile', JSON.stringify(result))
      return result;
    }
    case Actions.HISTORY_ADD: {
      const result = Object.assign({}, state, {orders: state.orders.concat([action.value])})
      localStorage.setItem('profile', JSON.stringify(result))
      return result
    }
    case Actions.HISTORY_REMOVE: {
      const result = Object.assign({}, state, {orders: state.orders.filter(order => order.id != action.id)})
      localStorage.setItem('profile', JSON.stringify(result))
      return result
    }
    default: return state;
  }
}

const processItems = (state, action, q) => {
  let assigned = false;
  const result = state.items.map((item) => {
    if (item.id == action.product.id) {
      assigned = true;
      return Object.assign({}, item, { quantity: item.quantity + q })
    }
    return item
  })
  if (!assigned) {
    result.push({
      id: action.product.id,
      quantity: 1,
      price_usd: action.product.price_usd,
      price_euro: action.product.price_euro
    });
  }
  return result;
}

const setQuan = (state, action, q = 1) => {
  const result =Object.assign({}, state, {items: processItems(state, action, q)})
  localStorage.setItem('order', JSON.stringify(result))
  return result;
}

const order = (
  state = {
    items: [],
    contacts: {
      email: '',
      phone: '',
      address: ''
    }
  },
  action
) => {
  switch (action.type) {
    case Actions.CART_INC: return setQuan(state, action, 1) 
    case Actions.CART_DEC: return setQuan(state, action, -1)
    case Actions.CUSTOMER_OPTION: {
      const result =  Object.assign({}, state, {
        contacts: Object.assign({}, state.contacts, {[action.option]: action.value})
      })
      localStorage.setItem('order', JSON.stringify(result))
      return result;
    }
    case Actions.ORDER: return action.value
    case Actions.ORDER_CLEAR: {
      localStorage.setItem('order', JSON.stringify(initialOrder))
      return initialOrder
    }
    default: return state;
  }
}

export default combineReducers({mode, currency, menu, delivery, profile, order});