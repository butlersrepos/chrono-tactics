var $ = require('jquery');

module.exports = {
	getMap: function( name ) {
		return $.ajax( {
			url: '/maps/' + name + '.json'
		} );
	}
};