const axios = require('axios')

const {
  USER_AGENT,
  MOJANG_API,
  STATUS_API,
  SESSION_API,
  YGGDRASIL_API
} = require('./constants')

exports.mojang = axios.create({
  baseURL: MOJANG_API,
  headers: {'User-Agent': USER_AGENT}
})

exports.status = axios.create({
  baseURL: STATUS_API,
  headers: {'User-Agent': USER_AGENT}
})

exports.session = axios.create({
  baseURL: SESSION_API,
  headers: {'User-Agent': USER_AGENT}
})

exports.yggdrasil = axios.create({
  baseURL: YGGDRASIL_API,
  headers: {'User-Agent': USER_AGENT}
})
