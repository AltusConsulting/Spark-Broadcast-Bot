function Notifications(configuration) {
    var controller = {
        config: configuration
    };

    var jwt = require('jsonwebtoken');

    controller.createNotificationEndpoints = function(webserver, bot, cb) {
        const uuidv4 = require('uuid/v4');

        webserver.post('/notifications', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    var message_id = uuidv4();
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ 'message_id': message_id }));

                    controller.handleNotificationPayload(req, res, bot, message_id);
                }
            });

        });
        if (cb) cb();
    };

    controller.sendNotificationToSubscribers = function(subscribers, message, bot) {

        console.log("Sending message '" + message.id + "' to subscribers: " + subscribers);
        count = 0;
        subscribers.forEach(function(subscriber) {
            bot.startPrivateConversation({ user: subscriber }, function(err, convo) {
                convo.say(message.text);
            });
            count += 1;
            controller.config.storage.counter.save({ id: message.id, count: count }, function(err) {
                console.log(err);
            })
        });

    };

    controller.handleNotificationPayload = function(req, res, bot, message_id) {

        var topic = req.body.topic;
        var message = { 'text': req.body.message, 'id': message_id };

        controller.config.storage.subscriptions.all(function(err, subscription_data) {
            var subscribers = {};
            subscription_data.forEach(function(item) {
                subscribers[item.id] = item.users
            });

            if (subscribers[topic]) {
                controller.sendNotificationToSubscribers(subscribers[topic], message, bot);
            }
        });

        var date = new Date();
        var time = date.getTime();

        controller.config.storage.messages.zsave({ topic: topic, time: time, message: message }, time, function(err) {});
    }

    return controller;
}

module.exports = Notifications;