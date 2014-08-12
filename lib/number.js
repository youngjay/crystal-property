var ko = require('knockout');

module.exports = require('./base').extend(
    {
        init: function() {
            var value = ko.observable(null);

            // 强迫文本框进行刷新
            var forceUpdateNull = function() {
                value(value() === null ? undefined : null);
            };

            this.value = ko.computed({
                read: value,

                write: function(v) {
                    if (v == null || v === '') {
                        forceUpdateNull()
                        return;
                    }

                    var ret = v - 0;
                    if (isNaN(ret)) {
                        forceUpdateNull()
                        return;
                    }
                    
                    value(ret);
                }
            });
        }
    }
);