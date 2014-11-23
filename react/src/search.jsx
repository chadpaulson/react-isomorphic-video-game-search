/** @jsx React.DOM */
'use strict'

var React = require('react')


var Search = React.createClass({

  render: function() {
    return (
      <div>
        <form method="get" action="/">
          <input type="text" name="q" />
          <input type="submit" value="search" />
        </form>
      </div>
    )
  }

})


module.exports = Search