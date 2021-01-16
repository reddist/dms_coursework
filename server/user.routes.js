const routes = require("./routes");

const Router = require('express');
const router = new Router();

routes.map(route =>
  route.method === "POST"
    ? router.post(route.path, route.function)
    : router.get(route.path, route.function)
);

module.exports = router;