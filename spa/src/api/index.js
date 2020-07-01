import axios from 'axios'

export const getShowCase = async () => {
  const result = await axios.get('api/showcase')
  return result.data;
}

export const checkToken = async (uid, token) => {
  const result = await axios.post(
    'api/login', {uid}, {headers: {'auth-token': token}}
  )
  return result.data;
}

export const login = async (email, pwd) => {
  const result = await axios.post('api/login', {uid: email, pwd})
  return result.data
}

export const saveProfile = async ({uid, phone, address, token}) => {
  const result = await axios.post('api/profile', {uid, phone, address}, {headers: {'auth-token': token}})
  return result.data
}

export const order = async (order, uid = null, token = null) => {
  const conf = {};
  if (token) {
    conf.headers = {'auth-token': token}
    order = {...order, uid}
  }
  const result = await axios.post('api/order', order, conf)
  return result.data
}

export const cancel = async (order, uid, token) => {
  const result = await axios.post('api/cancel', {uid, id: order}, {headers: {'auth-token': token}})
  return result.data
}

