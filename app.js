const carlo = require('carlo');
const { rpc } = require('carlo/rpc');
const RPCHandle = require('./src/RPCHandle');


const main = async () => {

    const app = await carlo.launch({
        width:400,
        height:820
    });
    app.on('exit', () => process.exit());
    app.serveFolder(__dirname);
    await app.exposeFunction('env', _ => process.env);
    await app.load("index.html",rpc.handle(new RPCHandle));

}

main();