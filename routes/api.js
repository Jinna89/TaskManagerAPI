import express from "express";
const router = express.Router();

import * as TaskController from "../app/controllers/TaskController.js";
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddlewares from "../app/middlewares/AuthMiddlewares.js";

// Users
router.post("/Registration", UsersController.Registration)
router.post("/Login", UsersController.Login)
router.get("/ProfileDetails", AuthMiddlewares, UsersController.ProfileDetails)
router.post("/ProfileUpdate", AuthMiddlewares, UsersController.ProfileUpdate)
router.get("/EmailVerify/:email", UsersController.EmailVerify)
router.get("/CodeVerify/:email/:code", UsersController.CodeVerify)
router.post("/ResetPassword", UsersController.ResetPassword)

// Task
router.post("/CreateTask", AuthMiddlewares, TaskController.CreateTask)
router.get("/UpdateTaskStatus/:id/:status", AuthMiddlewares, TaskController.UpdateTaskStatus)
router.get("/TaskListByStatus/:status", AuthMiddlewares, TaskController.TaskListByStatus)
router.delete("/DeleteTask/:id", AuthMiddlewares, TaskController.DeleteTask)
router.get("/CountTask/", AuthMiddlewares, TaskController.CountTask)


export default router;