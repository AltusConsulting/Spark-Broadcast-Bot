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

        if (cb) cb();
    };

    return controller;
}

module.exports = Messages;