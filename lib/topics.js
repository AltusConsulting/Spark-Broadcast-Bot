function Topics(configuration) {
    var controller = {
        config: configuration
    };

    var jwt = require('jsonwebtoken');
    var base_url = controller.config.api_base_url;

    controller.createTopicEndpoints = function(webserver, bot, cb) {
        webserver.get(base_url + '/topics', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    var topics = [];
                    controller.config.storage.topics.all(function(err, topic_data) {
                        if (topic_data) {
                            topic_data.forEach(function(topic) {
                                topics.push(topic);
                            });
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(topics));
                        }
                    });
                }
            });

        });

        webserver.post(base_url + '/topics', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    controller.config.storage.topics.save(req.body, function(err) {
                        res.sendStatus(200);
                    });
                }
            });
        });

        webserver.delete(base_url + '/topics/:topic', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    controller.config.storage.topics.remove(req.params.topic, function(err) {
                        res.sendStatus(200);
                    });
                }
            });

        });

        webserver.get(base_url + '/topics/:topic', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    controller.config.storage.subscriptions.get(req.params.topic, function(err, subscription_data) {
                        var users = [];
                        if (subscription_data) {
                            users = subscription_data.users;
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ 'topic': req.params.topic, 'subscribers': users }));
                    });
                }
            });


        });

        if (cb) cb();
    };

    return controller;
}

module.exports = Topics;