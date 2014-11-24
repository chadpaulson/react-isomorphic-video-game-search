/** @jsx React.DOM */
'use strict'

var React = require('react')
var Reflux = require('reflux')
var reactAsync = require('react-async')
var Link = require('react-router-component').Link

var appActions = require('./actions')
var gameStore = require('./stores/gameStore')

var Game = React.createClass({

  mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

  getInitialStateAsync: function(cb) {
    appActions.loadGame(this.props.game_id)
    gameStore.listen(function(data) {
      try {
        return cb(null, {
          game: data
        })
      } catch(err) {
        console.log(err)
      }
    })
  },

  componentDidMount: function() {
    this.listenTo(gameStore, this.refreshGame)
    appActions.loadGame(this.props.game_id)
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.game_id != nextProps.game_id && typeof(nextProps.game_id) !== "undefined") {
      appActions.loadGame(nextProps.game_id)
    }
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