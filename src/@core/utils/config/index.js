// eslint-disable-next-line import/no-dynamic-require
const config = require(`./configs/${process.env.VUE_APP_CONFIG_FILE || 'default.js'}`).default

export default config
