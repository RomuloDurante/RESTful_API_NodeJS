/**
 * Create and export configuration variables
 * 
 */

//container for all variables

const environments = {
  // Staging object
  development: {
      PORT: 3000,
      envName: 'development'
  },

  // Production object
  production: {
    PORT: 5000,
    envName: 'production'
  }

} // -> end environments
/*************************************** */

// Determine which environment shold passed as a command-line
const currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check the current environment exist, if not default development
const envExport = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.development;

// export environment
module.exports = envExport;
