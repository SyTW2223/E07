const databaseHost = process.env.DATABASE_HOST.trim();
const databasePort = process.env.DATABASE_PORT.trim();
const databaseUser = process.env.DATABASE_USER.trim();
const databasePassword = process.env.DATABASE_PASSWORD.trim();
const databaseName = process.env.DATABASE_NAME.trim();
const databaseConnectionOpts = process.env.DATABASE_CONNECTION_OPTIONS.trim();

module.exports = {
  // Examples of valid connection strings.
  //remoteUrl : 'mongodb://todo:bitnami@mongodb-primary:27017/todo',
  //remoteUrl : 'mongodb://0eb6bfe9-0ee0-4-231-b9ee:PpqNdxdyyys5nnQNA6SmPatk4NGkPlkLpUeqYz33ikQKTNDy4cma42500PCpt8S0GF9qm0hzv0R0FKglK3v03g==@0eb6bfe9-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true',
  remoteUrl : `mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?${databaseConnectionOpts}`,
  localUrl: 'mongodb://localhost/meanstacktutorials'
};
