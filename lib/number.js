var ko = require('knockout');

module.exports = require('./abstract').extend(
    {
        _createValue: function() {
            var value = ko.observable();

            // 强迫文本框进行刷新
            var forceUpdateNull = function() {
                value(value() === null ? undefined : null);
            };

            return ko.computed({
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