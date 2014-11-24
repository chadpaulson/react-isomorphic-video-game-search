/** @jsx React.DOM */
'use strict'

var React = require('react')
var Reflux = require('reflux')

var searchStore = require('./stores/searchStore')


var Search = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    if(this.props.entryPath == '/') {
      var defaultClass = 'search-home'
    } else {
      var defaultClass = 'search-blurred'
    }
    return {
      searchString: '',
      defaultClass: defaultClass,
      loading: false
    }
  },

  componentDidMount: function() {
    this.listenTo(searchStore, this.stopLoading)
  },

  handleSubmit: function(e) {
    e.preventDefault()
    this.setState({
      loading: true
    })
    this.props.onSearch(this.state.searchString)
  },

  handleChange: function(e) {
    this.setState({
      searchString: e.target.value
    })
  },

  handleClick: function(e) {
    if(this.state.defaultClass != 'search-home') {
      this.setState({
        defaultClass: 'search-focused'
      })
    }
  },

  handleBlur: function(e) {
    if(this.state.defaultClass != 'search-home') {
      this.setState({
        defaultClass: 'search-blurred'
      })
    }
  },

  stopLoading: function() {
    this.setState({
      loading: false,
      defaultClass: 'search-blurred'
    })
  },

  render: function() {
    var searchContext
    if(this.state.loading) {
      searchContext = <img src="/images/spinner.gif" />
    } else {
      searchContext = <button className="search-submit" type="submit">search</button>
    }
    return (
      <div className={this.state.defaultClass}>
        <form method="get" action="/" className="search-form" onSubmit={this.handleSubmit}>
          <input type="text" className="search-input" name="q" onChange={this.handleChange} onClick={this.handleClick} onBlur={this.handleBlur} value={this.state.searchString} />
          {searchContext}
        </form>
      </div>
    )
  }

})


module.exports = Search