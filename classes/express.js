import express from 'express'
import { ExpressServerError } from './errors.js';
import cc from 'node-console-colors';

class Express {
    constructor(prt = 3000){
        this.app = express();
        this.port = prt;
        this.server = null;
    }

    routeResponseFile(path, file) {
        this.app.get(path, (req,res)=>{res.sendFile(file);});
    }

    routeResponse(path, input) {
        this.app.get(path, (req,res)=>{res.send(input)});
    }
    
    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(cc.set("fg_green",`Express server started`));
        });
    }

    stop() {
        if (this.server==null) throw new ExpressServerError('Server is not running...'); 
        this.server.close(()=>{console.log(cc.set("fg_red",`Express server stopped`))});
        this.server = null;
    }
}
export default Express;
