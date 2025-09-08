require("dotenv").config();
var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
  name: "Server Firmma",
  description: "Servidor de emissão de certificados digitais Firmma.",
  script: process.env.PATH_CERTIFICADOS + "/index.js",
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});

svc.install();
