const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

MongoClient.connect('mongodb://localhost/clock', (error, db) => {
  app.use(express.static('./public'))

  app.get('/', (req, res) => {
    collection.find({}, { _id: 0 }).toArray()
      .then(result =>
        res.send(
          result.reduce((zones, document) => [...zones, document.zone], [])
        )
      )
    })

  app.listen(1738)

})
