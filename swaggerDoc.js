const swaggerUi = require("swagger-ui-express");
const swaggerjsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Test Api",
      version: "1.0.0",
      description: "Demonstrating how to describe a RESTful API with Swagger",
      contact: {
        name: "TEST DEVERLOPER",
      },
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerjsDoc(options);
module.exports = (app) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
};
