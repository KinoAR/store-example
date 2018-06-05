const {MongoClient} = require("mongodb");
const Promise = require("bluebird");
const R = require("ramda");

module.exports = {
  databaseUrl: 'mongodb://localhost:27017',
  databaseName: 'test-store',
  connect(url) {
    return MongoClient.connect(url, {
      poolSize: 100
    })
  },
  databaseExists(dbName) {
    return new Promise(((resolve, reject) => {
      this.connect(this.databaseUrl).then(client => {
        client.db(this.databaseName).admin()
          .listDatabases()
          .then((databaseInfo) => {
            const databases = databaseInfo.databases;
            resolve(R.includes(dbName, R.map(db => db.name, databases)));
          }).catch(err => {
            console.error(err);
            reject(err);
          })
      });
    }));
  },
  collectionExists(collectionName) {
    return new Promise((resolve, reject) => {
      this.connect(this.databaseUrl).then(client => {
        client.db(this.databaseName)
          .collections().then(collections => {
            resolve(R.includes(
              collectionName, R.map(collection => collection.collectionName, collections)));
          });
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
  },
  createCollection(collectionName) {
    this.collectionExists(collectionName).then(val => {
      if (val === false) {
        this.connect(this.databaseUrl).then(client => {
          client.db(this.databaseName).createCollection(collectionName)
            .then(val => {
              console.log(`Collection ${val.collectionName} created.`);
              client.close();
            }).catch(err => {
              console.error(err);
            })
        })
      }
    })
  },
  insertDocument(collectionName, document) {
    return new Promise((resolve, reject) => {
      this.connect(this.databaseUrl).then(client => {
        client.db(this.databaseName).collection(collectionName)
          .insert(document)
          .then(result => {
            console.log("Insert one document", result);
            resolve(result);
            client.close();
          }).catch(err => {
            console.error(err);
            reject(err);
          });
      });
    });
  },
  insertAllDocument(collectionName, document) {
    this.connect(this.databaseUrl).then(client => {
      client.db(this.databaseName).collection(collectionName)
        .insertMany(document)
        .then(result => {
          console.log("Insert one document", result);
          client.close();
        }).catch(err => {
          console.error(err);
          client.close();
        });
    });
  },
  findDocument(collectionName, query) {
    return new Promise((resolve, reject) => {
      this.connect(this.databaseUrl).then(client => {
        client.db(this.databaseName)
          .collection(collectionName).find(query)
          .toArray().then(documents => {
            resolve(documents);
            client.close();
          }).catch((err) => {
            resolve(err);
            client.close();
          });
      });
    });
  },
  deleteDocument(collectionName, query) {
    this.connect(this.databaseUrl).then(client => {
      client.db(this.databaseName).collection(collectionName)
        .deleteOne(query).then(result => {
          console.log("Delete one document", result);
          client.close();
        }).catch(err => {
          console.error(err);
          client.close();
        });
    });
  },
  deleteAllDocuments(collectionName, query) {
    this.connect(this.databaseUrl).then(client => {
      client.db(this.databaseName).collection(collectionName)
        .deleteMany(query).then(result => {
          console.log("Delete all documents", result);
          client.close();
        }).catch(err => {
          console.error(err);
          client.close();
        });
    });
  }
}
