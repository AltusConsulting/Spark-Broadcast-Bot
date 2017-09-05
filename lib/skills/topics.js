module.exports = function(controller) {

    controller.hears(['^show topics'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            controller.storage.topics.all(function(err, topic_data) {
                if (topic_data) {
                    var list = "";
                    topic_data.forEach(function(topic) {
                        list += "\n- " + bot.enrichCommand(message, topic.id);
                    });
                    if (list == "") {
                        convo.say("No topics have been created yet.");
                    } else {
                        convo.say("You can subscribe to the following topics:<br/>" + list);
                    }
                }
            });

            convo.activate();
        });
    });


};