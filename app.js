const carlo = require('carlo');


const main = async () => {

    const app = await carlo.launch({
        width:400,
        height:820
    });
    app.on('exit', () => process.exit());
    app.serveFolder(__dirname);
    await app.exposeFunction('env', _ => process.env);
    await app.load("index.html");

}

main();