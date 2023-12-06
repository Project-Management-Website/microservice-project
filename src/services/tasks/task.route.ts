import express from "express"
import taskHandler from "./task.http"
import validate from "../../middlewares/validate";
import { createTaskSchema, deleteTaskSchema, getDetailSchema, getListSchema, updateTaskSchema } from "./task.validate";

const router = express.Router();

router.get('/:uuid', [validate(getDetailSchema)], taskHandler.detail);

router.get('/', [validate(getListSchema)], taskHandler.list);

router.post('/', [validate(createTaskSchema)], taskHandler.create)

router.put('/:uuid', [validate(updateTaskSchema)], taskHandler.update)

router.delete('/:uuid', [validate(deleteTaskSchema)], taskHandler.remove)

export = router