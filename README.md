# Local Events Bot
Another telegram bot which was created as way to get nearest events in your city,
at the same time find out the weather, currency exchange and even have funny conversation.

## How it works
It consists of **6 main parts** (each in different folder and work **autonomously**, added all together here for demonstration purposes as all API keys are removed)

#### Mechanics:
* **Bot itself** - Telegram bot to communicate to the user, it doesn't use buttons only direct text messages
* Uses [Google API AI (Dialogflow)](https://dialogflow.com/) to parse messages and define useful parts.
* If a proper requests were found like day, time or/and place it looks in database for nearest event
* If a user inputs something different we reply with something from predefined dictionaries, which sometimes leads just to funny conversations and at the end suggests to go to some event anyway
* Twice a day another service parses FB and adds new events or updates old ones
* Several times a day forecast and exchange rate is checked and recorded to DB

Was built for Odessa, UA only, had great success, but unfortunately there were other more important projects, so this onw was put on hold and isn't reachable right now

### Stack
* ES6
* MongoDB, Mongoose
* Open.Ai (DialogFlow)
* FB API
* Axios and promises for all external requests
* Uses Ubuntu CRON tasks to do all the updates