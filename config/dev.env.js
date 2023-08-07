'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_API_KEY:'"AIzaSyAu-ciK-vpok-W7SvxZLEfKge5E339Gslo"',
  MEU_PRIMEIRO_NOME:'"BRUNO"',
})
