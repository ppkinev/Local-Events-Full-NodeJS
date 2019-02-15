const DB_NAME = 'fb-events-test'

module.exports = {
  db_url: `mongodb://localhost:27017/${DB_NAME}`,
  mongo_options: {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    reconnectTries: 30,
    reconnectInterval: 5000,
    useMongoClient: true,
  },
}