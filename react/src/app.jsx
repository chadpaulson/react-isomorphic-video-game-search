/** @jsx React.DOM */
'use strict'

var React = require('react')
var Router = require('react-router-component')

var Search = require('./search')
var Game = require('./game')
var Release = require('./release')

var Locations = Router.Locations
var Location = Router.Location
var CaptureClicks = require('react-router-component/lib/CaptureClicks')
var Link = require('react-router-component').Link


var App = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <title>Video Game Search</title>
          <link rel="stylesheet" type="text/css" href="/css/style.css" />
        </head>
        <body>
        <div className="nav">
          <Link href="/">Search</Link> | <Link href="/game">Game</Link> | <Link href="/release">Release</Link>
        </div>
        <div className="main">
        <CaptureClicks>
          <Locations path={this.props.path}>
            <Location path="/" handler={Search} />
            <Location path="/game" handler={Game} />
            <Location path="/release" handler={Release} />
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
