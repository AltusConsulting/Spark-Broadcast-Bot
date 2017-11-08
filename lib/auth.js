function Auth(configuration) {
    var controller = {
        config: configuration
    };

    var request = require('request');
    var jwt = require('jsonwebtoken');
    var base_url = controller.config.api_base_url;

    controller.createAuthEndpoints = function(webserver, bot, cb) {
        webserver.get(base_url + '/auth/token', function(req, res) {

            var body = {
                grant_type: "authorization_code",
                client_id: controller.config.client_id,
                client_secret: controller.config.client_secret,
                code: req.query.code,
                redirect_uri: controller.config.redirect_uri
            };

            request({
                method: "POST",
                json: true,
                uri: "https://api.ciscospark.com/v1/access_token",
                json: body
            }, function(error, response, body) {

                if (!error && response.statusCode == 200) {

                    request({
                        method: "GET",
                        json: true,
                        uri: "https://api.ciscospark.com/v1/people/me",
                        headers: {
                            'Authorization': 'Bearer ' + body.access_token
                        }
                    }, function(error, response, body) {
                        var user_email = body.emails[0];
                        controller.config.storage.admins.all(function(err, admin_data) {
                            if (user_email == controller.config.allowed_admin)  {
                                var jwt_token = jwt.sign(user_email, controller.config.token_secret);
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({ 'status': 'success', 'access_token': jwt_token }));
                                return;
                            }
                            else if (admin_data) {
                                for (var admin in admin_data) {
                                    if (admin_data[admin].email === user_email) {
                                        var jwt_token = jwt.sign(user_email, controller.config.token_secret);
                                        res.setHeader('Content-Type', 'application/json');
                                        res.send(JSON.stringify({ 'status': 'success', 'access_token': jwt_token }));
                                        return;
                                    }
                                }
                                res.setHeader('Content-Type', 'application/json');
                                res.status(400).send(JSON.stringify({ 'status': 'error', 'error': "User is not an admin" }));
                                return;
                            }
                        });
                    });
                    
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({ 'status': 'error', 'error': body.errors }));
                }

            });

        });

        if (cb) cb();
    };

    return controller;
}





module.exports = Auth;