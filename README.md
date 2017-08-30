# Mariam: A Multi-topic Cisco Spark Notification Bot 

Inspired by [BotKit samples for Cisco Spark](https://github.com/CiscoDevNet/botkit-ciscospark-samples) by Stève Sfartz <mailto:stsfartz@cisco.com>

## Instructions for deployment

First things first. Go ahead and create a Bot Account from the ['Spark for developers' bot creation page](https://developer.ciscospark.com/add-bot.html), and copy your bot's access token.

## Heroku deployment

Click below to quickly deploy the bot to Heroku. You will need the following information:
* Your Spark token
* Your public URL (for a Heroku deployment this would be `https://{app-name}.herokuapp.com`, where `{app-name}` is the name you chose for your Heroku app).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Local deployment

1. Choose your storage type. You have two options: local storage using [JSON File Store (JFS)](https://www.npmjs.com/package/jfs) or [Redis](https://redis.io/), a NO-SQL, in-memory data structure store. If you choose to use JFS, you don't have to install anything yourself. If you choose to use Redis you'll need to [download](https://redis.io/download) and install it on your local machine, with the default settings (port 6379).

1. [Optional] Cisco Spark uses a webhook to send incoming messages to your bot, but webhooks require a public IP address. If you don't have one, you can use [ngrok](https://ngrok.com) to create a tunnel to your machine. Launch ngrok to expose port 3000 of your local machine to the internet:

    ```shell
    ngrok http 3000
    ```

    Pick the HTTPS address that ngrok is now exposing. Note that ngrok exposes HTTP and HTTPS protocols, make sure to pick the HTTPS address.

1. [Optional] Open the `.env` file and modify the settings to accomodate your bot.

    _Note that you can also specify any of these settings via env variables. In practice, the values on the command line or in your machine env will prevail over .env file settings. In the example below, we do not modify any value in settings and specify all configuration values on the command line._

1. You're ready to run your bot

From a bash shell, type:

```shell
> git clone https://github.com/AltusConsulting/Mariam
> cd Mariam
> npm install
> SPARK_TOKEN=0123456789abcdef PUBLIC_URL=https://abcdef.ngrok.io SECRET="not that secret" node bot.js
```

If you're using Redis, this last command would be:

```shell
> SPARK_TOKEN=0123456789abcdef PUBLIC_URL=https://abcdef.ngrok.io SECRET="not that secret" REDIS_URL=redis://localhost:6379/1 node bot.js
```

From a windows shell, type:

```shell
> git clone https://github.com/AltusConsulting/Mariam
> cd Mariam
> npm install
> set SPARK_TOKEN=0123456789abcdef
> set PUBLIC_URL=https://abcdef.ngrok.io
> set SECRET=not that secret
> node bot.js
```

If you're using Redis, you'll need to add an additional environment variable before launching the bot:

```shell
> set REDIS_URL=redis://localhost:6379/1
```

where:

- SPARK_TOKEN is the API access token of your Cisco Spark bot.
- PUBLIC_URL is the root URL at which Cisco Spark can reach your bot. If you're using ngrok, this should be the URL ngrok exposes when you run it. 
- SECRET is the secret that Cisco Spark uses to sign the JSON webhooks events posted to your bot.
- REDIS_URL is the URL of the Redis instance you installed.


## Notifications Module

The notifications module allows you to subscribe to specific topics offered by your organization.

### Subscribing to a notification

You can subscribe to a notification by telling the bot:

```
subscribe
```
or, for short:
```
sub
```
The bot will then ask you what topic you want to subscribe to. 

### Unsubscribing from a notification

You can subscribe to a notification by telling the bot:

```
unsubscribe
```
or, for short:
```
unsub
```

The bot will then ask you what topic you want to unsubscribe from. 

### Showing your current subscriptions

You can ask the bot for a list of your current subscriptions:

```
show subscriptions
```
or, for short:
```
show sub
```

## Sending messages to the bot 

The bot implements a REST API for receiving messages. The resource to send messages to is `/notifications`. For example, if your PUBLIC_URL is `https://960eeccc.ngrok.io`, then you need to send your messages to:
```
https://960eeccc.ngrok.io/notifications
```

The REST API accepts JSON, like so:

```json
{
	"topic": "name-of-the-topic",
	"message": "This is the message that will be sent to all subscribers of this specific topic."
}
```
