const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controllers");
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/all", controller.allAccess);

router.get("/user", [authJwt.verifyToken], controller.userBoard);

router.get(
    "/mod",
    authJwt.verifyToken,
    controller.moderatorBoard
);

router.get(
    "/admin",
    authJwt.verifyToken,
    controller.adminBoard
);

router.get("/get/:id", authJwt.verifyToken, controller.getById);
module.exports = router;