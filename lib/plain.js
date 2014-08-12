var ko = require('knockout');

module.exports = require('./base').extend(
    {        
        init: function() {            
            this.value = ko.observable(null);
        }
    }
);


