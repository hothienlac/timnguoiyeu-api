const verify = require('./verify');

const BearerStrategy = require('passport-http-bearer').Strategy;
const strategy = new BearerStrategy(verify);

module.exports = strategy;
