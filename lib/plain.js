var ko = require('knockout');

module.exports = require('./base').extend(
    {        
        __init: function() {            
            this.value = ko.observable(null);
        }
    }
);


