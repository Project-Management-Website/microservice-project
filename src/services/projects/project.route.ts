import express from "express"
import projectHandler from "./project.http"

const router = express.Router();

router.get('/:uuid', [], projectHandler.detail);

router.get('/', [], projectHandler.list);

router.post('/', [], projectHandler.create)

export = router