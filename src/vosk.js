const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const chokidar = require("chokidar");
const wsserver = require('ws').Server;
const isRunning = require("is-running")


const voskwrappath = path.join(__dirname, "../bin/voskwrap/voskwrap.exe");
let voskpid = null;

let wsvoskserver;
let watcher;

const startRecognizeWithVosk = async (target) => {

    console.log("killing before start....:", voskpid);
    if (voskpid && isRunning(voskpid)) process.kill(voskpid);
    if (!wsvoskserver) wsvoskserver = new wsserver({ port: 56573 });
    else wsvoskserver.clients.forEach((client) => client.send("ready:ready"));

    let proc = child_process.spawn(voskwrappath, ["-t", target, "-n"], { windowsHide:true });
    voskpid = proc.pid;
    console.log("vosk child process:", voskpid);

    if (watcher) return;
    watcher = chokidar.watch(path.join(__dirname, "../bin/voskwrap/"), {
        ignored: /[\/\\]\./,
        persistent: true
    });
    watcher.on('ready', () => {
        console.log("Watching voskwrap result file....");
        wsvoskserver.clients.forEach((client) => client.send("ready:ready"));
        watcher.on('change', (filepath) => {
            if (path.basename(filepath) == "result.txt") {
                text = fs.readFileSync(filepath).toString();
                wsvoskserver.clients.forEach((client) => client.send(text));
            }
        });
    });
}

const stopRecognizeWithVosk = () => {
    console.log("killing....:", voskpid);
    if (voskpid) process.kill(voskpid);
    if (wsvoskserver) wsvoskserver.close();
    if (watcher) watcher.close().then(() => console.log("The watcher closed."));
    voskpid = null;
    wsvoskserver = null;
    watcher = null;
}


module.exports.startRecognizeWithVosk = startRecognizeWithVosk;
module.exports.stopRecognizeWithVosk = stopRecognizeWithVosk;