/*
 *Create and export configuration variables
 * 
 */

 //Container for all the environments
 const environments = {};

 // Staging (default) environment
 environments.staging = { // NODE_ENV=staging node app
    PORT: 3000,
    envName: 'staging'
 }

 //Production environment
 environments.production = { //NODE_ENV=production node app
    PORT: 5000,
    envName: 'production'
 }

 // Determine which environment was passed as a command-line argument
 var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

 //Define that the current environment is one of the above, if not, dafault to staging
 var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

 //Export the module
 module.exports = environmentToExport;