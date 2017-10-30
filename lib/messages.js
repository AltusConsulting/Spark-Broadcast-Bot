function Messages(configuration) {
    var controller = {
        config: configuration
    };

    controller.createMessageEndpoints = function(webserver, bot, cb) {
        webserver.get('/messages', function(req, res) {

            var messages = [];
            controller.config.storage.messages.zget(req.query.from, req.query.to, function(err, message_data) {
                if (message_data) {
                    message_data.forEach(function(message) {
                        messages.push(message);
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(messages));
                }
            });
        });

        webserver.get('/messages/:message/status', function(req, res) {

            var messages = [];
            controller.config.storage.counter.get(req.params.message, function(err, counter_data) {
                var sent_messages = 0;
                if (counter_data) {
                    sent_messages = counter_data.count;
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ 'sent_messages': sent_messages }));
            });
        });

        if (cb) cb();
    };

    return controller;
}

module.exports = Messages;