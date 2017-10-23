const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

MongoClient.connect('mongodb://localhost/clock', (error, db) => {
  app.use(express.static('./public'))
  const timezones = db.collection('timezones')

  app.get('/times', (req, res) => {
    timezones.find({}, { _id: 0 }).toArray()
      .then(result =>
        res.send(
          result.reduce((zones, document) => [...zones, document.zone], [])
        )
      )
    })

  app.listen(1738, console.log('Open on port 1738'))

})
