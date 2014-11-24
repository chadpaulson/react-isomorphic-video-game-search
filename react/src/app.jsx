/** @jsx React.DOM */
'use strict'

var React = require('react')
var Router = require('react-router-component')

var Search = require('./search')
var SearchResults = require('./searchResults')
var Game = require('./game')
var Home = require('./home')

var Locations = Router.Locations
var Location = Router.Location
var CaptureClicks = require('react-router-component/lib/CaptureClicks')
var Link = require('react-router-component').Link


var App = React.createClass({

  getInitialState: function() {
    if (typeof window === 'undefined') {
      var entryPath = this.props.path
    } else {
      var entryPath = window.location.pathname
    }
    return {
      entryPath: entryPath
    }    
  },

  searchGames: function(query) {
    this.refs.router.navigate('/search/' + encodeURI(query))
  },

  render: function() {
    return (
      <html>
        <head>
          <title>Video Game Search</title>
          <link href="http://fonts.googleapis.com/css?family=Merriweather+Sans:800" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/style.css" />
        </head>
        <body>
        <Search onSearch={this.searchGames} entryPath={this.state.entryPath} />
        <CaptureClicks>
          <Locations ref="router" path={this.props.path}>
            <Location path="/" handler={Home} />
            <Location path="/game/:game_id/:game_slug" handler={Game} />
            <Location path="/search/:query" handler={SearchResults} />
          </Locations>
        </CaptureClicks>
        <script type="text/javascript" src="/js/behavior.js"></script>
        </body>
      </html>
    )
  }

})


module.exports = {
  routes: App
}


// Bootstrap client
if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(App(), document)
  }
}
