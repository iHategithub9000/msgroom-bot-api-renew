import { io } from "socket.io-client";
import cc from 'node-console-colors';
import botParser from "./parser.js";
import { AuthError, FailsafeError } from "./errors.js";
import chprocess from 'child_process';
import os from 'os'

console.clear()
class Client {
    constructor() {
      this.msglimit = 10;
      this.resetinterval = 1500;
      this.username = null;
      this.SOCKET = null;
      this.userId = null;
      this.constatus = {};
      this.messages = 0;
    }
  
    connect(nick, apikey, url = "wss://windows96.net:4096") {
      console.log(cc.set("fg_yellow",`Initializing API spam failsafe`))
      setInterval(()=>{
        if(this.messages>this.msglimit){throw new FailsafeError('Spam Detected! (this.messages>this.msglimit is true)');}
        if(this.msglimit != 10){throw new FailsafeError('You cannot overwrite msglimit!');}
        if(this.resetinterval != 1500){throw new FailsafeError('You cannot overwrite resetinterval!');}
      },1)
      setInterval(() => {
        this.messages=0;
      }, this.resetinterval);
      console.log(cc.set("fg_green",`Done!`));
      this.SOCKET = io(new URL(url).href);
      return new Promise((resolve, reject) => {
        this.SOCKET.on("auth-complete", (userId) => {
          this.on = this.SOCKET.on
          console.log(cc.set("fg_green",`Successfully connected to ${url} with apikey ${apikey}, username is ${nick} and ID is ${userId}`));
          this.userId = userId;
          this.username = nick;
          this.constatus = {
            usr: nick,
            api: apikey,
            url: url,
            uid: userId
          };
          console.table(this.constatus)
          resolve();
        });
        this.SOCKET.on("auth-error", (e) => {
          reject(new AuthError(e.reason));
        });
  
        this.SOCKET.emit("auth", {
          user: nick,
          apikey,
        });
      });
    }
  
    send(msg = "PLACEHOLDER TEXT") {
      this.messages++;
      this.SOCKET.emit("message", {
        type: "text",
        content: msg,
      });
    }
  
    setName(nick = "PLACEHOLDER TEXT") {
      this.messages++;
      this.SOCKET.emit("change-user", nick);
      this.username = nick;
    }

    disconnect(kill) {
      this.SOCKET.disconnect();
      if(kill) process.exit();
    }

    
    defaultAdminCommandsTemplate(id,prefix,botname,expr="none",evash=false){
      this.SOCKET.on("message", (e) => {
        if (e.content.startsWith(prefix+"say")) {
          if (e.id != id){
            this.send("[ "+ botname + " ] This command is admin only!")
          } else {
            this.send(new botParser().parseArguments(e.content)[1])
          }
        }
        if (e.content.startsWith(prefix+"name")) {
          if (e.id != id){
            this.send("[ "+ botname + " ] This command is admin only!")
          } else {
            this.setName(new botParser().parseArguments(e.content)[1])
          }
        }
        if (e.content.startsWith(prefix+"shutdown")) {
          if (e.id != id){
            this.send("[ "+ botname + " ] This command is admin only!")
          } else {
            this.send("[ " + botname + " ] Shutting down..")
            this.disconnect(true);
          }
        }
        if (e.content.startsWith(prefix+"chpspawn")) {
          var n = new botParser().parseArguments(e.content);n.shift();n=n.join(" ");n=new botParser().parseEntity(n)
          if (e.id != id){
            this.send("[ "+ botname + " ] This command is admin only!")
          } else {
            if (os.platform() === 'win32'){
              if(evash){
                this.send("[ " + botname + " ] Spawned \""+n+"\" on host")
                chprocess.exec('cmd /c "'+n+'"', (error, stdout, stderr) => {
                  if (error) {
                    this.send(`Error: ${error.message}`);
                    return;
                  }
                  if (stderr) {
                    this.send(`stderr: ${stderr}`);
                    return;
                  }
                  if (stdout){
                    this.send(`stdout: ${stdout}`);
                  }
                });
              } else { 
                this.send("[ "+ botname + " ] Command is disabled")
              }
            } else {
              this.send("[ "+ botname + " ] This command only works when your bot is running on Windows. Sorry?")
            }
          }
        }
        if (e.content.startsWith(prefix+"disconnectexpress")) {
          if (e.id != id){
            this.send("[ "+ botname + " ] This command is admin only!")
          } else {
            try{expr.stop();this.send("[ " + botname + " ] The express server was closed.")}catch{this.send("[ " + botname + " ] There is no server running, the specified express class is invalid, or there was no express class specified.")}
          }
        }
        if (e.content.startsWith(prefix+"eval")) {
          if (e.id != id){
            this.send("[ "+ botname + "] This command is admin only!")
          } else {
            if(evash){
              this.send("[ " + botname + " ] Evaluating..")
              try {
                this.send("[ " + botname + " ] "+ eval(new botParser().parseEntity(new botParser().parseArguments(e.content)[1])));
              } catch (err) {
                this.send("[ " + botname + " ] There was an error in the evaluated code! "+err.message);
              }
            } else {
              this.send("[ "+ botname + " ] Command is disabled")
            }
          }
        }
      });
    }
  
    command(cmd, func) {
      this.SOCKET.on("message", (e) => {
        if (e.content.startsWith(cmd)) {
          func(new botParser().parseArguments(e.content), e)
        }
      });
    }
  }
export default Client;