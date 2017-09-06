function Notifications(configuration) {
    var controller = {
        config: configuration
    };

    controller.createNotificationEndpoints = function(webserver, bot, cb) {
        webserver.post('/notifications', function(req, res) {

            res.sendStatus(200);
            controller.handleNotificationPayload(req, res, bot);

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

        var topic = req.body.topic;
        var message = req.body.message;

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
        message_uid = topic + ":" + time;

        controller.config.storage.messages.save({ id: message_uid, topic: topic, time: time, message: message }, function(err) {});
    }

    return controller;
}

module.exports = Notifications;