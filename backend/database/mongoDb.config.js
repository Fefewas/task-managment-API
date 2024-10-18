const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToMongoDb: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/taskmanager", { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        dbConnection = client.db();
        return dbConnection.collection('tasks').createIndex({ title: "text" });
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
