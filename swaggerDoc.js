const swaggerUi = require("swagger-ui-express");
const swaggerjsDoc = require("swagger-jsdoc");

const options = {
  explorer: true,
  swaggerDefinition: {
    info: {
      title: "E-Com Api",
      version: "1.0.0",
      description: "E-commerce RESTful Endpints to test the routes",
      contact: {
        name: "DEVERLOPER",
        email: "ganeshkr04@gmail.com",
      },
    },
    /* adding new keys */
    swaggerOptions: {
      authAction: {
        JWT: {
          name: "JWT",
          schema: {
            type: "token",
            in: "header",
            name: "Authorization",
            description: "",
          },
          value: "Bearer <JWT>",
        },
      },
    },
    host: "http://localhost:3000",
    basePath: "/",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "Bearer",
        in: "header",
      },
    },
  },
  apis: ["./api/routes/*.js"],
};

const spec = swaggerjsDoc(options);

module.exports = (app) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
};
