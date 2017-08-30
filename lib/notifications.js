function Notifications(configuration) {
    var controller = {
        config: configuration
    };

    controller.createNotificationEndpoint = function(webserver, bot, cb) {
        webserver.post('/notifications', function(req, res) {

            res.sendStatus(200);
            controller.handleNotificationPayload(req, res, bot);
            console.log(req.body.topic);

        });
        if (cb) cb();
    };

    controller.sendNotificationToSubscribers = function(subscribers, message, bot) {

        console.log("Sending message to subscribers: " + subscribers);
        subscribers.forEach(function(subscriber) {
            bot.startPrivateConversation({ user: subscriber }, function(err, convo) {
                convo.say(message);
            });
        });

    };

    controller.handleNotificationPayload = function(req, res, bot) {

        controller.config.storage.subscriptions.all(function(err, subscription_data) {
            var subscribers = {};
            subscription_data.forEach(function(item) {
                subscribers[item.id] = item.users
            });

            topic = req.body.topic;
            if (subscribers[topic]) {
                controller.sendNotificationToSubscribers(subscribers[topic], req.body.message, bot);
            }
        });
    }

    return controller;
}

module.exports = Notifications;