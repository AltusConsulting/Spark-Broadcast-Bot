function Subscriptions(configuration) {
    var controller = {
        config: configuration
    }

    var jwt = require('jsonwebtoken');
    var base_url = controller.config.api_base_url;

    controller.createSubscriptionsEndpoints = function(webserver, bot, cb) {

        webserver.post(base_url + '/subscriptions/subscribe', function(req, res) {
            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if(err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.'});
                } else {
                    var topic = req.body.topic;
                    var users = req.body.users;
                    controller.config.storage.subscriptions.get(topic, function(err, subscription_data) {
                        if(subscription_data)
                        {
                            subscribers = subscription_data.users;
                            users.forEach(function(user){
                                if(!subscribers.includes(user))
                                {
                                    subscribers.push(user);
                                }
                            });
                            console.log("new subscribers "+subscribers);
                            controller.config.storage.subscriptions.save({ id: topic, users: subscribers }, function(err) {
                                if(err) res.send({ success: false, message: "Failed to subscribe users" });
                            });
                        }
                        else {
                            console.log("no subscribers, adding list of subscribers!");
                            controller.config.storage.subscriptions.save({ id: topic, users: users }, function(err) {
                                if(err) res.send({ success: false, message: "Failed to subscribe users" });
                            });
                        }
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.sendStatus(200);
                }
            });
        });

        webserver.post(base_url + '/subscriptions/unsubscribe', function(req,res) {
            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if(err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    var topic = req.body.topic;
                    var users = req.body.users;

                    controller.config.storage.subscriptions.get(topic, function(err, subscription_data) {
                        if(subscription_data) {
                            subscribers = subscription_data.users;
                            users.forEach(function(user){
                                if(subscribers.includes(user)) {
                                    subscribers.splice(subscribers.indexOf(user), 1);
                                }
                            });
                        }
                        controller.config.storage.subscriptions.save({ id: topic, users: subscribers }, function(err) {
                            if(err) res.send({ success: false, message: "Failed to unsubscribe users" });
                        });
                        res.setHeader('Content-Type', 'application/json');
                        res.sendStatus(200);
                    });
                }
            });
        });

        if(cb) cb();
    };

    return controller;
}

module.exports = Subscriptions;