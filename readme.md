
---


## Installation

To use the `msgroom-bot-api-renew` module, you need to have Node.js installed. You can then install the module using npm:

```bash
npm i msgroom-bot-api-renew
```

## Client API

### `command(cmd,func)`
Creates a command in the bot.

- `cmd` (string) : The command name including the prefix
- `func` (function) : The function for the command
The arguments passed to `func`:
- first argument - args of the command
- second argument - the message event

### `connect(nick, apikey, url)`

Connects the bot client to the server.

- `nick` (string): The username or nickname of the bot.
- `apikey` (string): The API key for authentication.
- `url` (string | URL): (Optional) The URL of the server to connect to. Defaults to `wss://windows96.net:4096`.

Returns a promise that resolves when the connection is successful or rejects with an error if there is an issue.

### `send(msg)`

Sends a message from the bot client to the server.

- `msg` (string): The message content to send.

### `setName(nick)`

Changes the bot's name to the specified value.

- `nick` (string): The new name for the bot.

### `disconnect(kill)`

Disconnects the bot client from the server, and kills the process.

- `kill` if true, it kills the process after disconnection.

### `defaultAdminCommandsTemplate(id,prefix,botname,expressClass,evash)`

Initializes a default admin command template (not using `this.command(..)`)

- `id` (string): The id of the person that can run the admin commands.
- `prefix` (string): The prefix of the commands.
- `botname` (string): The name of the bot, it is used in command outputs.
- `expressClass` (class): The express class. Put it in only if you are using one.
- `evash` (bool): if true, chpspawn and eval will work
Commands in template:
say - makes the bot say whatever is in argument 1 
name - renames the bot's user to whatever is in argument 1 
shutdown - shuts the bot down 
chpspawn - spawns process with whatever commandline you put, only works on windows and only works if `evash` is true
disconnectexpress - stops the express server you put into `expressClass`
eval - evaluates js in arg 1 and only works if `evash` is true

### `username`
The bot's user name

### `SOCKET`
The Websocket connection to the msgroom server

### `userId`
The bot's userID

### `constatus` 
The bot's connection preferences

### `msglimit`
The amount of messages you are allowed to send before `resetinterval` resets the count. Changing this value crashes the bot.
Every millisecond a check is ran to crash the bot if `messages` is larger than `msglimit`. 

### `resetinterval`
The interval value for resetting the `messages` value back to 0. Changing this value crashes the bot. `this.resetinterval = 1500;`

### `messages`
The amount of messages you sent. This is reset every time a `resetinterval` passes.

## botParser API

### `parseArguments(string)`
Parses arguments from a command string into an array. Spaces are splitters, and a substring with spaces wrapped into quotes or double quotes gets parsed as a normal argument.
`hello there` would return ["hello","there"], while
`"hello there" how are you` would return `["hello there","how","are","you"]`

### `safeParseJSON(string)`
Safely parses a JSON string aka returns -1 on error

### `safeUnparseJSON(object)`
Safely stringifies JSON aka returns -1 on error

### `parseEntity(string)`
Parses HTML Entities into a normal string

### `encode(string,encoding)`
Encodes a string

### `decode(string,encoding)`
Decodes a string

## Express API

### `routeResponseFile(path, file)`
Same thing as `this.app.get(path, (req, res)=>{ res.sendFile(file) });`

### `routeResponse(path, input)`
Same thing as `this.app.get(path, (req, res)=>{ res.send(input) });`

### `start()`
Starts Express server

### `stop()`
Stop Express server

### `app`
The express app

### `port`
The port number.

### `server`
start() assigns the value returned by app.listen() to this, it is used for `stop()`

## License

This module is released under the [MIT License](https://opensource.org/licenses/MIT).