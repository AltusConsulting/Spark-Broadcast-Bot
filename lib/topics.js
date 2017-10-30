function Topics(configuration) {
    var controller = {
        config: configuration
    };

    controller.createTopicEndpoints = function(webserver, bot, cb) {
        webserver.get('/topics', function(req, res) {

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
        });

        webserver.post('/topics', function(req, res) {
            controller.config.storage.topics.save(req.body, function(err) {
                res.sendStatus(200);
            });
        });

        webserver.delete('/topics/:topic', function(req, res) {
            controller.config.storage.topics.remove(req.params.topic, function(err) {
                res.sendStatus(200);
            });
        });

        webserver.get('/topics/:topic', function(req, res) {
            controller.config.storage.subscriptions.get(req.params.topic, function(err, subscription_data) {
                var users = [];
                if (subscription_data) {
                    users = subscription_data.users;
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ 'topic': req.params.topic, 'subscribers': users }));
            });

        });

        if (cb) cb();
    };

    return controller;
}

module.exports = Topics;