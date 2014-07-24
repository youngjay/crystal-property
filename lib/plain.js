var ko = require('knockout');

module.exports = require('./abstract').extend(  
    {
        _createValue: function() {
            return ko.observable();
        }
    }
);
