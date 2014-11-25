/** @jsx React.DOM */
'use strict'

var React = require('react/addons')
var Reflux = require('reflux')
var slug = require('to-slug-case')
var reactAsync = require('react-async')
var Link = require('react-router-component').Link
var DocumentTitle = require('react-document-title')

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

  getURI: function(game_id, game_name) {
    return '/game/' + game_id + '/' + slug(game_name)
  },

  refreshGame: function(data) {
    if(typeof(window) !== 'undefined' && this.props.game_slug != slug(data.name)) {
      window.location = this.getURI(data.id, data.name)
    } 
    this.setState({
      game: data
    })
  },

	render: function() {
    
    if(this.state.game.similar_games && this.state.game.similar_games.length) {
      var relatedGames = []
      var self = this
      this.state.game.similar_games.forEach(function(game) {
        var gameURI = self.getURI(game.id, game.name)
        relatedGames.push(<li><Link href={gameURI}>{game.name}</Link></li>)
      })
      var related = <div><h3>Similar Games</h3><ul>{relatedGames}</ul></div>
    } else {
      var related = null
    }
    return (
      <DocumentTitle title={this.state.game.name}>
        <div className="game-detail clearfix">
          <h1 className="game-title">{this.state.game.name}</h1>
          <div className="game-info">
            <p>{this.state.game.deck}</p>
            {related}
          </div>
          <div className="game-image"><img src={this.state.game.image.medium_url} /></div>
        </div>
      </DocumentTitle>
    )
	}

})


module.exports = Game