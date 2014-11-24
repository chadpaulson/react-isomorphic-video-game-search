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

  searchGames: function(query) {
    this.refs.router.navigate('/search/' + encodeURI(query))
  },

  render: function() {
    return (
      <html>
        <head>
          <title>Video Game Search</title>
          <link rel="stylesheet" type="text/css" href="/css/style.css" />
        </head>
        <body>
        <Search onSearch={this.searchGames} />
        <div className="main">
        <CaptureClicks>
          <Locations ref="router" path={this.props.path}>
            <Location path="/" handler={Home} />
            <Location path="/game/:game_id" handler={Game} />
            <Location path="/search/:query" handler={SearchResults} />
          </Locations>
        </CaptureClicks>
        </div>
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
