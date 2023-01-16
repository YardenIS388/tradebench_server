const { Router } = require("express");
const { usersController } = require("./../controllers/users.controller");

const usersRouter = new Router();

usersRouter.get("/list", usersController.getUsers);
usersRouter.get("/:id", usersController.getUser);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:id", usersController.updateUser);
usersRouter.delete("/:id", usersController.removeUser);

module.exports = { usersRouter };
