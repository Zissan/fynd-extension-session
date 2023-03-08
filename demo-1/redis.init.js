"use strict";

const Redis = require("ioredis");

function connect(name, uri) {
  const db = new Redis(uri, {
    reconnectOnError: function (err) {
      var targetError = "EAI_AGAIN";
      if (err.message.includes(targetError)) {
        return true;
      }
    },
  });
  db.on("connect", () => {
    console.log(`Redis ${name} connected.`);
  });
  db.on("ready", () => {
    console.log(`Redis ${name} is ready`);
  });
  db.on("error", () => {
    console.error(`Redis ${name} got error`);
  });
  db.on("close", () => {
    console.log(`Redis ${name} is closed`);
  });
  db.on("reconnecting", () => {
    console.log(`Redis ${name} got error`);
  });
  db.on("reconnecting", () => {
    console.log(`Redis ${name} is ended`);
  });
  return db;
}

const hostRedis = connect("Host Read Write", "redis://localhost:6379/0");

module.exports = { appRedis: hostRedis };
