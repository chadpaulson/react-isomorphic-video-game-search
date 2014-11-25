/** @jsx React.DOM */
'use strict'

var React = require('react')
var Reflux = require('reflux')
var slug = require('to-slug-case')
var reactAsync = require('react-async')
var Link = require('react-router-component').Link
var DocumentTitle = require('react-document-title')

var appActions = require('./actions')
var searchStore = require('./stores/searchStore')


var SearchResults = React.createClass({

  mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

  getInitialStateAsync: function(cb) {    
    appActions.searchUpdate(this.props.query)
    searchStore.listen(function(data) {
      try {
        return cb(null, {
          searchString: data.searchString,
          searchResults: data.searchResults
        })
      } catch(err) {
        console.log(err)
      }
    })
  },  

  componentDidMount: function() {
    this.listenTo(searchStore, this.refreshSearch)
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.query != nextProps.query && typeof(nextProps.query) !== "undefined") {
      appActions.searchUpdate(nextProps.query)
    }
  },

  refreshSearch: function(data) {
    this.setState({
      searchString: data.searchString,
      searchResults: data.searchResults
    })
  },

  render: function() {
    if(this.state.searchResults.length) {
      var results = []
      this.state.searchResults.forEach(function(game) {
        if(game.image) {
          var gameURL = '/game/' + game.id + '/' + slug(game.name)
          results.push(<div className="search-result clearfix"><Link href={gameURL}><div className="search-image"><img src={game.image.icon_url} /></div></Link> <h2 className="search-title"><Link href={gameURL}>{game.name}</Link></h2></div>)
        }
      })
    } else {
      var results = <div className="no-results">No Games Matching '{this.state.searchString}'</div>
    }
    var searchTitle = 'Search: ' + this.state.searchString
    return (
      <DocumentTitle title={searchTitle}>
        <div className="search-results clearfix">
          {results}
        </div>
      </DocumentTitle>
    )
  }

})


module.exports = SearchResults