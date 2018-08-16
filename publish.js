const mqtt = require('mqtt');

console.log('Connecting to: %s using access token: %s', process.env.THINGSBOARD_HOST, process.env.ACCESS_TOKEN);

const client = mqtt.connect('mqtt://'+ process.env.THINGSBOARD_HOST,{
    username: process.env.ACCESS_TOKEN
});

let pubTelemetry

client.on('connect', function () {
    console.log('Client connected!');
    client.publish('v1/devices/me/attributes', process.env.ATTRIBUTES);
    console.log('Attributes published!');

    pubTelemetry = setInterval(publishTelemetry, 1000)

    console.log('Telemetry published!');
    setTimeout(stopSimulation, 20000);
});

function publishTelemetry(){
    let tel = JSON.parse(process.env.TELEMETRY)
    tel.temperature += Math.floor(Math.random() * Math.floor(20))
    tel.humidity += Math.floor(Math.random() * Math.floor(20))
    console.log(`temperature ${tel.temperature}, humidity ${tel.humidity}`)
    client.publish('v1/devices/me/telemetry', JSON.stringify(tel));
}

function stopSimulation(){
    clearInterval(pubTelemetry)
    client.end();
}