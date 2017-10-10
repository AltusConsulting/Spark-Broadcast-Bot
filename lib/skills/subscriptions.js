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

            controller.storage.topics.all(function(err, topic_data) {
                var patterns = [];
                var topics = "";
                if (topic_data) {
                    topic_data.forEach(function(topic) {
                        patterns.push({
                            pattern: topic.id,
                            callback: function(response, convo) {
                                subscribeToNotification(topic.id, message.user);
                                convo.next();
                            }
                        });
                        topics += "\n- `" + topic.id + "`: " + topic.description;
                    });

                    patterns.push({
                        default: true,
                        callback: function(response, convo) {
                            convo.say("Sorry, I did not understand.");
                            convo.repeat();
                            convo.next();
                        }
                    });

                    if (topics == "") {
                        convo.say("There are no topics to subscribe to.");
                    } else {
                        convo.ask("What topic do you want to subscribe to?" + topics, patterns);
                    }
                }
            });

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

            controller.storage.subscriptions.all(function(err, subscription_data) {
                var patterns = [];
                var topics = "";
                if (subscription_data) {
                    subscription_data.forEach(function(sub) {
                        sub.users.forEach(function(user) {
                            if (message.user == user) {
                                patterns.push({
                                    pattern: sub.id,
                                    callback: function(response, convo) {
                                        unsubscribeFromNotification(sub.id, message.user);
                                        convo.next();
                                    }
                                });
                                topics += "\n- " + bot.enrichCommand(message, sub.id);
                            }
                        });
                    });

                    patterns.push({
                        default: true,
                        callback: function(response, convo) {
                            convo.say("Sorry, I did not understand.");
                            convo.repeat();
                            convo.next();
                        }
                    });

                    if (topics == "") {
                        convo.say("You don't have any active subscriptions.");
                    } else {
                        convo.ask("What topic do you want to unsubscribe from?" + topics, patterns);
                    }
                }
            });

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
                                list += "\n- `" + sub.id + "`";
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