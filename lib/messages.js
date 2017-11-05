function Messages(configuration) {
    var controller = {
        config: configuration
    };

    var jwt = require('jsonwebtoken');
    var base_url = controller.config.api_base_url;

    controller.createMessageEndpoints = function(webserver, bot, cb) {
        webserver.get(base_url + '/messages', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    var messages = [];
                    controller.config.storage.messages.zget(req.query.from, req.query.to, function(err, message_data) {
                        if (message_data) {
                            message_data.forEach(function(message) {
                                if (message.topic == req.query.topic) {
                                    messages.push(message);
                                }
                            });
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(messages));
                        }
                    });
                }
            });


        });

        webserver.get(base_url + '/messages/:message/status', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    var messages = [];
                    controller.config.storage.counter.get(req.params.message, function(err, counter_data) {
                        var sent_messages = 0;
                        if (counter_data) {
                            sent_messages = counter_data.count;
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ 'sent_messages': sent_messages }));
                    });
                }
            });


        });

        if (cb) cb();
    };

    return controller;
}

module.exports = Messages;