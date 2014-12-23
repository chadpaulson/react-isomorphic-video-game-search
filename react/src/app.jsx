/** @jsx React.DOM */
'use strict'

var React = require('react/addons')
var Router = require('react-router-component')
var DocumentTitle = require('react-document-title')

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
          <title>%react-iso-vgs%</title>
          <meta charSet="UTF-8" />
          <link href="http://fonts.googleapis.com/css?family=Merriweather+Sans:800" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/style.css" />
        </head>
        <body>
        <a href="https://github.com/chadpaulson/react-isomorphic-video-game-search"><img className="github-ribbon" src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" /></a>
        <Search onSearch={this.searchGames} entryPath={this.state.entryPath} />
        <DocumentTitle title="%react-iso-vgs%">
        <CaptureClicks>
          <Locations ref="router" path={this.props.path}>
            <Location path="/" handler={Home} />
            <Location path="/game/:game_id/:game_slug" handler={Game} />
            <Location path="/search/:query" handler={SearchResults} />
          </Locations>
        </CaptureClicks>
        </DocumentTitle>
        <script type="text/javascript" src="/js/behavior.min.js"></script>
        </body>
      </html>
    )
  }

})


module.exports = {
  routes: App,
  title: DocumentTitle
}


// Bootstrap client
if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(React.createElement(App), document)
  }
}
