import express from "express"
import taskHandler from "./task.http"
import verifyToken from "../../middlewares/verifyToken";
import validate from "../../middlewares/validate";
import { createTaskSchema, getDetailSchema, getListSchema, updateTaskSchema } from "./task.validate";

const router = express.Router();

router.get('/:uuid', [validate(getDetailSchema)], taskHandler.detail);

router.get('/', [validate(getListSchema)], taskHandler.list);

router.post('/', [validate(createTaskSchema)], taskHandler.create)

router.put('/:uuid', [validate(updateTaskSchema)], taskHandler.update)

export = router