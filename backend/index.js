const express = require("express");
const {MongoClient} = require('mongodb');
const router = express.Router();

const mqtt = require("mqtt");
const {
  insertTemperature,
  insertFrequency,
  insertBloodOxygen,
  insertBloodPressure,
  insertNumberOfStep,
  getNumberOfSteps,
  getFrequency,
} = require("./requests/insertion");

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const app = express();

let client = mqtt.connect("mqtt://broker.mqttdashboard.com", {
  clientId,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  connectTimeout: 4000,
});
client.subscribe("hcApp/temp");
client.subscribe("hcApp/freq"); 
client.subscribe("hcApp/BO");
client.subscribe("hcApp/BloodPressure");
client.subscribe("hcApp/steps");

client.on("message", function (topic, message) {
  switch (topic) {
    case "hcApp/temp":
     insertTemperature(message.toString());
      break;
    case "hcApp/freq":
        insertFrequency(message.toString());
        break;
    case "hcApp/BO":
      insertBloodOxygen(message.toString());
      break;
    case "hcApp/BloodPressure":
      insertBloodPressure(message.toString());
      break;
    case "hcApp/steps":
      insertNumberOfStep(message.toString());
      break;
  }
});

client.on("connect", function () {
  console.log("Connected to MQTT broker");
});

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/getAllSteps", getNumberOfSteps);
app.get("/getFrequency", getFrequency);


app.listen(3200, () => console.log("Server started"));
