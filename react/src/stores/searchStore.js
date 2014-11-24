var Reflux = require('reflux')
var request = require('superagent')

var appActions = require('./../actions')


var searchStore = Reflux.createStore({

  init: function() {
    this.listenTo(appActions.searchUpdate, this.handleSearchUpdate)
  },

  handleSearchUpdate: function() {
    var self = this
    var searchString = arguments[0]
    request
      .get('/api/search/' + searchString)
      .end(function(err, res) {
        if(res.body && res.body.results) {
          self.trigger({
            searchString: searchString,
            searchResults: res.body.results
          })
        }
    })
  }

})

module.exports = searchStore