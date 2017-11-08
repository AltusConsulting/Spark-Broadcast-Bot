function Admins(configuration) {
    var controller = {
        config: configuration
    };

    var jwt = require('jsonwebtoken');
    var base_url = controller.config.api_base_url;

    controller.createAdminEndpoints = function(webserver, bot, cb) {
        webserver.get(base_url + '/admins', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    var admins = [];
                    controller.config.storage.admins.all(function(err, admin_data) {
                        if (admin_data) {
                            admin_data.forEach(function(admin) {
                                admins.push(admin);
                            });
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(admins));
                        }
                    });
                }
            });

        });

        webserver.post(base_url + '/admins', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    controller.config.storage.admins.save(req.body, function(err) {
                        res.sendStatus(201);
                    });
                }
            });
        });

        webserver.delete(base_url + '/admins/:admin', function(req, res) {

            var token = req.headers['x-access-token'];
            jwt.verify(token, controller.config.token_secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    controller.config.storage.admins.remove(req.params.admin, function(err) {
                        res.sendStatus(200);
                    });
                }
            });

        });


        if (cb) cb();
    };

    return controller;
}

module.exports = Admins;