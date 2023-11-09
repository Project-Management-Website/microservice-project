import express from "express"
import taskHandler from "./task.http"

const router = express.Router();

router.get('/:id', [], taskHandler.detail);

router.get('/', [], taskHandler.list);

router.post('/', [], taskHandler.create)

export = router