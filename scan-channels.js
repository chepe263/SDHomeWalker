/*var exec = require('child_process').exec;
exec('scantv -n NTSC-M -f us-cable -d ' + process.env.VIDEO_DEVICE + ' -o scantv.conf', function callback(error, stdout, stderr){
    console.log("scantv:", stdout);
});*/

const jsonfile = require('jsonfile')

var ini = require('multi-ini');
var content = ini.read("./list.ini");
//console.log( content )
var channels = {};

for (const [key, value] of Object.entries(content)) {
    //console.log(`${key}: ${value} °°° ${Object.entries(value)}`);
    if(value.channel !== undefined){
        channels[value.channel] = key;
    }
  }

//console.log(channels)

jsonfile.writeFileSync("channels.json", channels, { spaces: 2 })

console.log("New file channels.json");
console.log("bye bye")