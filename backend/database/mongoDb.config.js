const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToMongoDb: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/taskmanager", { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        dbConnection = client.db();
        return dbConnection.collection('tasks').createIndex({ title: "text" }), dbConnection.collection('users').createIndex({ email: 1 }, { unique: true }),dbConnection.collection('users').createIndex({ username: 1 }, { unique: true });
      })
      .then(() => {
        console.log("Text index created.");
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
