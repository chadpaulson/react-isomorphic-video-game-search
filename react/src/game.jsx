/** @jsx React.DOM */
'use strict'

var React = require('react/addons')
var Reflux = require('reflux')
var slug = require('to-slug-case')
var reactAsync = require('react-async')
var Link = require('react-router-component').Link
var DocumentTitle = require('react-document-title')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

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
      } catch(err) { }
    })
  },

  componentDidMount: function() {
    this.listenTo(gameStore, this.refreshGame)
    appActions.loadGame(this.props.game_id)
  },

  componentWillReceiveProps: function(nextProps) {
    if(typeof(nextProps.game_id) !== "undefined") {
      appActions.loadGame(nextProps.game_id)
    }
  },

  getURI: function(game_id, game_name) {
    return '/game/' + game_id + '/' + slug(game_name)
  },

  beginImageLoad: function() {
    this.refs.gameImage.getDOMNode().className += ' hide'
    this.refs.gameTitle.getDOMNode().className += ' hide'
    this.refs.gameDeck.getDOMNode().className += ' hide'
  },

  confirmImageLoad: function() {
    this.refs.gameImage.getDOMNode().className = 'game-image'
    this.refs.gameTitle.getDOMNode().className = 'game-title'
    this.refs.gameDeck.getDOMNode().className = ''
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
        var gameKey = "related-" + game.id
        relatedGames.push(<li key={gameKey}><Link onClick={self.beginImageLoad} href={gameURI}>{game.name}</Link></li>)
      })
      var related = (
        <div key="game-related" className="game-related">
          <h3>Similar Games</h3>
          
            <ReactCSSTransitionGroup component="ul" transitionName="css-transition">
              {relatedGames}
            </ReactCSSTransitionGroup>
          
        </div>)
    } else {
      var related = null
    }
    return (
      <DocumentTitle title={this.state.game.name}>
        <div key="game-detail" className="game-detail clearfix">
          <h1 ref="gameTitle" key="game-title" className="game-title">{this.state.game.name}</h1>
          <div key="game-info" className="game-info">
            <p ref="gameDeck" key="game-deck">{this.state.game.deck}</p>
            {related}
          </div>
          <div key="game-image-container" className="game-image-container">
            <img className="game-image" ref="gameImage" onLoad={this.confirmImageLoad} key="game-image" src={this.state.game.image.medium_url} alt={this.state.game.name} />
          </div>
        </div>
      </DocumentTitle>
    )
  }

})


module.exports = Game