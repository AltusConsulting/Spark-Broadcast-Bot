var redis = require('redis');

module.exports = function(config) {
    var storage = require('botkit-storage-redis')({
        "methods": config.hash_methods,
        "url": config.url,
        "namespace": config.namespace
    });

    var client = redis.createClient(config);
    var methods = config.sorted_set_methods;
    var extended_storage = {};

    for (var i = 0; i < methods.length; i++) {
        extended_storage[methods[i]] = getStorageObj(client, config.namespace + ':' + methods[i]);
    }

    Object.assign(storage, extended_storage);

    return storage;
};

function getStorageObj(client, namespace) {
    return {
        zget: function(min, max, cb, options) {
            client.zrangebyscore(namespace, min, max, function(err, res) {
                if (err) {
                    return cb(err);
                }
                var parsed,
                    array = [];

                for (var i in res) {
                    parsed = JSON.parse(res[i]);
                    res[i] = parsed;
                    array.push(parsed);
                }
                cb(null, options && options.type === 'object' ? res : array);
            });
        },
        zsave: function(object, score, cb) {
            client.zadd(namespace, score, JSON.stringify(object), redis.print);
        }
    };
}