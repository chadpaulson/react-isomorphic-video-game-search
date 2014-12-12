'use strict'

require('node-jsx').install({extension: '.jsx'})
var reactAsync = require('react-async')

var reactApp = require('./react/src/app.jsx')
var appConfig = require('./react/src/config')

var request = require('superagent')
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
  request.get(appConfig.REMOTE_API_HOST + '/api/search/?api_key=' + appConfig.GIANT_BOMB_API_KEY + '&format=json&resources=game&resource_type=game&query=' + req.params.query + '&field_list=name,image,id').end(function(data) {
    res.set('Content-Type', 'application/json')
    res.send(data.body)
  })
})

app.get('/api/game/:game_id', function(req, res) {
  request.get(appConfig.REMOTE_API_HOST + '/api/game/' + req.params.game_id + '/?api_key=' + appConfig.GIANT_BOMB_API_KEY + '&format=json&field_list=name,image,id,similar_games,deck').end(function(data) {
    res.set('Content-Type', 'application/json')
    res.send(data.body)    
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
      return res.send('<!DOCTYPE html>' + markup.replace('%react-iso-vgs%', reactApp.title.rewind()))
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
