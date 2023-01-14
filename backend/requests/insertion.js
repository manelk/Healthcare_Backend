const { MongoClient } = require("mongodb");
const mysql = require("mysql");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://admin:05vlatVLIly15v44@cluster0.vqksml1.mongodb.net/EHEALTH_DB?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connection To EHEALTH DataBase Succeeded");
  })
  .catch((err) => {
    console.log("Error in EHEALTH DataBase Connection : " + err);
  });
const uri =
  "mongodb+srv://admin:05vlatVLIly15v44@cluster0.vqksml1.mongodb.net/EHEALTH_DB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insertTemperature(data) {
  try {
    if (data >= 35 && data <= 44) {
      const database = client.db("EHEALTH_DB");
      const temperature = database.collection("Temperature");
      const doc = {
        tempValue: data,
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      const result = await temperature.insertOne(doc);
      console.log("A temperature was inserted :" + JSON.stringify(result));
    } else {
      console.log("EXIT INSERTION:: Incorrect value range of temperature");
    }
  } catch (err) {
    await client.close();
    throw err;
  }
}

async function insertFrequency(data) {
  try {
    if (data >= 50 && data <= 150) {
      const database = client.db("EHEALTH_DB");
      const frequency = database.collection("Frequency");
      const doc = {
        freqValue: data,
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      const result = await frequency.insertOne(doc);
      console.log("A frequency was inserted :" + JSON.stringify(result));
    } else {
      console.log("EXIT INSERTION:: Incorrect value range of frequency.");
    }
  } catch (err) {
    await client.close();
    throw err;
  }
}

async function insertBloodOxygen(data) {
  try {
    if (data >= 90 && data <= 100) {
      const database = client.db("EHEALTH_DB");
      const BloodOxygen = database.collection("BloodOxygen");
      const doc = {
        BloodOxygenValue: data,
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      const result = await BloodOxygen.insertOne(doc);
      console.log("A Blood Oxygen was inserted :" + JSON.stringify(result));
    } else {
      console.log("EXIT INSERTION:: Incorrect value range of blood oxygen.");
    }
  } catch (err) {
    await client.close();
    throw err;
  }
}

async function insertBloodPressure(data) {
  try {
    if (data >= 60 && data <= 250) {
      const database = client.db("EHEALTH_DB");
      const BloodPressure = database.collection("BloodPressure");
      const doc = {
        BloodPressureValue: data,
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      const result = await BloodPressure.insertOne(doc);
      console.log("A Blood Pressure was inserted :" + JSON.stringify(result));
    } else {
      console.log("EXIT INSERTION:: Incorrect value range of blood pressure.");
    }
  } catch (err) {
    await client.close();
    throw err;
  }
}

async function insertNumberOfStep(data) {
  try {
    const database = client.db("EHEALTH_DB");
    const Steps = database.collection("Steps");
    const doc = {
      NumberOfSteps: data,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    const result = await Steps.insertOne(doc);
    console.log("A Steps was inserted :" + JSON.stringify(result));
  } catch (err) {
    await client.close();
    throw err;
  }
}

const getNumberOfSteps = async (req, res) => {
  try {
    const database = client.db("EHEALTH_DB");
    database.collection("Steps").find({}).toArray(function(err, result) {
      res.status(200).json({ message: "Operation Succeeded", result });
    });

  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

const getFrequency = async (req, res) => {
  try {
    const database = client.db("EHEALTH_DB");
    database.collection("Frequency").find({}).toArray(function(err, result) {
      res.status(200).json({ message: "Operation Succeeded", result });
    });

  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

module.exports = {
  insertTemperature,
  insertFrequency,
  insertBloodOxygen,
  insertBloodPressure,
  insertNumberOfStep,
  getNumberOfSteps,
  getFrequency
};
