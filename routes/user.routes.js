import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js"

const UserRouter = Router();

// api/v1/users

UserRouter.get('/', getUsers);

UserRouter.get('/:id', authorize, getUser);

UserRouter.post('/', (req, res) => res.send({ title: 'Create new User' }));

UserRouter.put('/:id', (req, res) => res.send({ title: `Update User by id: ${req.params.id}` }));

UserRouter.delete('/:id', (req, res) => res.send({ title: `Delete User by id: ${req.params.id}` }));

export default UserRouter;
 