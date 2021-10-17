const { version } = require('../../package.json');
const config = require('../config/config');

const url = `http://localhost:${config.port}/v1`;

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Plant management system',
    version,
    // license: {
    //   name: '',
    //   url: '',
    // },
  },
  servers: [
    {
      url,
    },
  ],
};

module.exports = swaggerDef;
