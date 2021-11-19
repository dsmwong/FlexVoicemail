# Voicemail

This Function implements the instructs set out in the [Implementing Voicemail with Twilio Flex, TaskRouter, and Insights](https://support.twilio.com/hc/en-us/articles/360021082934-Implementing-Voicemail-with-Twilio-Flex-TaskRouter-and-Insights) 

## How to use the template

The best way to use the Function is through the Twilio CLI as described below. If you'd like to use the template without the Twilio CLI, [check out our usage docs](../docs/USING_FUNCTIONS.md).

## Pre-requisites

- A Twilio Flex account - [sign up here](https://www.twilio.com/try-twilio) and [create a flex instance](https://support.twilio.com/hc/en-us/articles/360020442333-Setup-a-Twilio-Flex-Project)
- For access to Flex Insight, you will need to [Upgrade to the appropriate Plan(https://www.twilio.com/docs/flex/end-user-guide/insights/getting-started)]

### Environment variables

Copy `.env.example` to `.env`

To deploy this project with the Functions API, this Function expects the following environment variables set in your `.env` file:

| Variable          | Meaning                                                                                                        | Required |
| :---------------- | :------------------------------------------------------------------------------------------------------------- | :------- |
| `TR_WORKSPACE_SID` | The Task Router SID found in [TaskRouter page](https://console.twilio.com/us1/develop/taskrouter/workspaces?frameUrl=/console/taskrouter/workspaces)  | yes      |

Additionally, you'll have to have your `ACCOUNT_SID` and `AUTH_TOKEN` set.

### Function Parameters

This template by default accepts no additional parameters. All the require parameters are passed by TaskRouter Webhook

## Setup of Voicemail Serverless Function

1. Install the [serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started)
2. Install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)

3. Fork or Clone this github repository
```
gh repo clone dsmwong/FlexVoicemail
```

4. Run npm install
```
npm install
```

5. Start the server with the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart):

```
twilio serverless:start --ngrok
```

5. Set your taskrouter event callback webhook URL configuring to `https://<your-ngrok-code>.ngrok.io/handle_event` - see [here](https://support.twilio.com/hc/en-us/articles/360021082934-Implementing-Voicemail-with-Twilio-Flex-TaskRouter-and-Insights#h_5703c286-3ee5-4e60-8455-d5c6217bcdaf) for more detail

ℹ️ Check the developer console and terminal for any errors, make sure you've set your environment variables.

## Deploying

Deploy your functions and assets with the following command. Note: you must run these commands from inside your project folder. [More details in the docs.](https://www.twilio.com/docs/labs/serverless-toolkit)

With the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart):

```
twilio serverless:deploy
```

Make sure to update your incoming voice URL to your newly deployed Function URL.