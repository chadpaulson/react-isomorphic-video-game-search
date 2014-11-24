/** @jsx React.DOM */
'use strict'

var React = require('react')
var Reflux = require('reflux')
var Link = require('react-router-component').Link

var appActions = require('./actions')
var gameStore = require('./stores/gameStore')

var Game = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      game: {}
    }
  },

  componentDidMount: function() {
    this.listenTo(gameStore, this.refreshGame)
    appActions.loadGame(this.props.game_id)
  },

  refreshGame: function(data) {
    this.setState({
      game: data
    })
  },

	render: function() {
    if(this.state.game.id) {
      return (
        <div>
          <h1>{this.state.game.name}</h1>
          <p>{this.state.game.deck}</p>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )      
    }

	}

})


module.exports = Game