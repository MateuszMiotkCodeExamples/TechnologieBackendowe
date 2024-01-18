const env = process.env.NODE_ENV || 'development'
const credentials = require(`./credetials.${env}.json`)
module.exports = { credentials }
