/** @jsx React.DOM */
'use strict'

var React = require('react')
var Reflux = require('reflux')
var reactAsync = require('react-async')
var Link = require('react-router-component').Link

var appActions = require('./actions')
var searchStore = require('./stores/searchStore')


var Search = React.createClass({

  mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

  getInitialStateAsync: function(cb) {
    if(this.props.query) {
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
    } else {
      return cb(null, {
        searchString: '',
        searchResults: []
      })      
    }

  },  

  componentDidMount: function() {
    this.listenTo(searchStore, this.refreshSearch)
  },

  refreshSearch: function(data) {
    this.setState({
      searchString: data.searchString,
      searchResults: data.searchResults
    })
  },

  handleSubmit: function(e) {
    e.preventDefault()
    if(this.state.searchString) {
      window.history.pushState({},'','/search/' + encodeURI(this.state.searchString))
      appActions.searchUpdate(this.state.searchString)
    }
  },

  handleChange: function(e) {
    this.setState({
      searchString: e.target.value
    })
  },

  render: function() {
    var results = []
    this.state.searchResults.forEach(function(game) {
      if(game.image) {
        var gameURL = '/game/' + game.id
        results.push(<div><img src={game.image.icon_url} /> <Link href={gameURL}><h2>{game.name}</h2></Link></div>)
      }
    })
    return (
      <div>
        <form method="get" action="/" onSubmit={this.handleSubmit}>
          <input type="text" name="q" onChange={this.handleChange} />
          <input type="submit" value="search" />
        </form>
        <div>
          {results}
        </div>
      </div>
    )
  }

})


module.exports = Search