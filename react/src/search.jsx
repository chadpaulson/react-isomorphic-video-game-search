/** @jsx React.DOM */
'use strict'

var React = require('react')
var Reflux = require('reflux')

var searchStore = require('./stores/searchStore')


var Search = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      searchString: '',
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

  stopLoading: function() {
    this.setState({
      loading: false
    })
  },

  render: function() {
    var searchContext
    if(this.state.loading) {
      searchContext = <img src="/images/spinner.gif" />
    } else {
      searchContext = <input type="submit" value="search" />
    }
    return (
      <div>
        <form method="get" action="/" onSubmit={this.handleSubmit}>
          <input type="text" name="q" onChange={this.handleChange} value={this.state.searchString} />
          {searchContext}
        </form>
      </div>
    )
  }

})


module.exports = Search