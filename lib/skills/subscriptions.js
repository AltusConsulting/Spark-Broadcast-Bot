module.exports = function(controller) {

    controller.hears(['^sub'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            function subscribeToNotification(topic, user) {
                controller.storage.subscriptions.get(topic, function(err, subscription_data) {
                    var users = [];
                    if (subscription_data) {
                        users = subscription_data.users;
                        if (!users.includes(user)) {
                            users.push(user);
                            convo.say("You're now subscribed to the '{}' topic.".format(topic));
                        } else {
                            convo.say("You're already subscribed to the '{}' topic.".format(topic));
                        }
                    } else {
                        users.push(user)
                        convo.say("You're now subscribed to the '{}' topic.".format(topic));
                    }
                    controller.storage.subscriptions.save({ id: topic, users: users }, function(err) {});
                });
            }

            convo.ask("What topic do you want to subscribe to? (t1/t2/t3)", [{
                pattern: "t1",
                callback: function(response, convo) {
                    subscribeToNotification('t1', message.user);
                    convo.next();
                },
            }, {
                pattern: "t2",
                callback: function(response, convo) {
                    subscribeToNotification('t2', message.user);
                    convo.next();
                },
            }, {
                pattern: "t3",
                callback: function(response, convo) {
                    subscribeToNotification('t3', message.user);
                    convo.next();
                },
            }, {
                default: true,
                callback: function(response, convo) {
                    convo.say("Sorry, I did not understand.");
                    convo.repeat();
                    convo.next();
                }
            }]);

            convo.activate();
        });
    });

    controller.hears(['^unsub'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            function unsubscribeFromNotification(topic, user) {
                controller.storage.subscriptions.get(topic, function(err, subscription_data) {
                    if (subscription_data) {
                        users = subscription_data.users;
                        if (users.includes(user)) {
                            users.splice(users.indexOf(user), 1);
                            convo.say("You're now unsubscribed from the '{}' topic.".format(topic));
                        } else {
                            convo.say("You're not currently subscribed to the '{}' topic.".format(topic));
                        }
                    } else {
                        convo.say("You're not currently subscribed to the '{}' topic.".format(topic));
                    }
                    controller.storage.subscriptions.save({ id: topic, users: users }, function(err) {});
                });
            }
            convo.ask("What topic do you want to unsubscribe from? (t1/t2/t3)", [{
                pattern: "t1",
                callback: function(response, convo) {
                    unsubscribeFromNotification('t1', message.user);
                    convo.next();
                },
            }, {
                pattern: "t2",
                callback: function(response, convo) {
                    unsubscribeFromNotification('t2', message.user);
                    convo.next();
                },
            }, {
                pattern: "t3",
                callback: function(response, convo) {
                    unsubscribeFromNotification('t3', message.user);
                    convo.next();
                },
            }, {
                default: true,
                callback: function(response, convo) {
                    convo.say("Sorry, I did not understand.");
                    convo.repeat();
                    convo.next();
                }
            }]);

            convo.activate();
        });
    });

    controller.hears(['^show sub'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            controller.storage.subscriptions.all(function(err, subscription_data) {
                if (subscription_data) {
                    var list = "";
                    subscription_data.forEach(function(sub) {
                        sub.users.forEach(function(user) {
                            if (message.user == user) {
                                list += "`{}`<br/>".format(sub.id);
                            }
                        });
                    });
                    if (list == "") {
                        convo.say("You don't have any active subscriptions.");
                    } else {
                        convo.say("You're currently subscribed to the following topics:<br/>" + list);
                    }
                }
            });

            convo.activate();
        });
    });


};