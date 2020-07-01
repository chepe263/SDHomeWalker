// https://www.npmjs.com/package/node-media-server

require('dotenv').config();

const NodeMediaServer = require('node-media-server');

var FfmpegCommand = require('fluent-ffmpeg');
var command = new FfmpegCommand()

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};
 
var nms = new NodeMediaServer(config)
nms.run();
//nms.on('preConnect', (id, args) => {
//    console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
//    // let session = nms.getSession(id);
//    // session.reject();
//  });
//   
//  nms.on('postConnect', (id, args) => {
//    console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
//  });
//   
//  nms.on('doneConnect', (id, args) => {
//    console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
//  });
//   
//  nms.on('prePublish', (id, StreamPath, args) => {
//    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
//    // let session = nms.getSession(id);
//    // session.reject();
//  });
//   
//  nms.on('postPublish', (id, StreamPath, args) => {
//    console.log('[NodeEvent on postPublish!!!!!!!!!!!!!!!!!!!!!!!!!]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
//  });
//   
//  nms.on('donePublish', (id, StreamPath, args) => {
//    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
//  });
//   
//  nms.on('prePlay', (id, StreamPath, args) => {
//    console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
//    // let session = nms.getSession(id);
//    // session.reject();
//  });
//   
//  nms.on('postPlay', (id, StreamPath, args) => {
//    console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
//  });
//   
//  nms.on('donePlay', (id, StreamPath, args) => {
//    console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
//  });

setTimeout(
    () => {
        command = command
            .input(process.env.VIDEO_DEVICE)
            .inputFormat(process.env.VIDEO_DEVICE_FORMAT)
            .input(process.env.AUDIO_DEVICE)
            .inputFormat(process.env.AUDIO_DEVICE_FORMAT)
            .output("rtmp://localhost/live/STREAM_NAME")
            .format('flv')
            .on('start', function(commandLine) {
                console.log('Spawned Ffmpeg with command: ' + commandLine);
                console.log("Tune to Channel " + process.env.FIST_CHANNEL + "in 5ish seconds");
                setTimeout( () => {
                    var exec = require('child_process').exec;
                    exec('ivtv-tune -d ' + process.env.VIDEO_DEVICE + ' -c ' + process.env.FIST_CHANNEL, function callback(error, stdout, stderr){
                        console.log("ivtv-tune:", stdout);
                    });
                }, 5 * 1000);
            })
            .on('error', function() {
                console.log('Ffmpeg has been killed');
                process.exit();
            })
            .run();
            console.log(command);
            process.on('SIGINT', function() {
                console.log("!!!!!! Try to stop ffmpeg");
                try {
                    command.kill();
                    
                } catch (error) {
                    console.log(error)
                }
            });
    }
    ,5000
);


/*process.on('SIGINT', function() {
    console.log("\nbye bye")
    
    
    
    process.exit();
  });*/


require('dns').lookup(require('os').hostname(), function (err, add) {
    console.log("!!!! dns request?????")
    console.log(add)
});

