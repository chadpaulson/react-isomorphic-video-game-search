'use strict'

require('node-jsx').install({extension: '.jsx'})
var reactApp = require('./react/src/app.jsx')
var reactAsync = require('react-async')
var appConfig = require('./react/src/config')

var http = require('http')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

 
app.get('/api/search/:query', function(req, res) {
  http.get({
    host: appConfig.REMOTE_API_HOST,
    path: '/api/search/?api_key=' + appConfig.GIANT_BOMB_API_KEY + '&format=json&resource_type=game&query=' + req.params.query + '&field_list=name,image,id'
  }, function(apiResponse) {
    var chunks = []
    apiResponse.on('data', function(chunk) {
      chunks.push(chunk)
    }).on('end', function() {
      var body = Buffer.concat(chunks)
      res.set('Content-Type', 'application/json')
      res.send(body)
    })
  })
})

app.get('/api/game/:game_id', function(req, res) {
  http.get({
    host: appConfig.REMOTE_API_HOST,
    path: '/api/game/' + req.params.game_id + '/?api_key=' + appConfig.GIANT_BOMB_API_KEY + '&format=json'
  }, function(apiResponse) {
    var chunks = []
    apiResponse.on('data', function(chunk) {
      chunks.push(chunk)
    }).on('end', function() {
      var body = Buffer.concat(chunks)
      res.set('Content-Type', 'application/json')
      res.send(body)
    })
  })
})


// render react routes on server
app.use(function(req, res, next) {
  if(req.query.q) {
    res.redirect('/search/' + req.query.q)
  }  
  try {
    reactAsync.renderToStringAsync(reactApp.routes({path: req.path}), function(err, markup) {
      if(err) {
        return next()
      }
      return res.send(markup)
    })
  } catch(err) {
    return next()
  }
})


// handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
