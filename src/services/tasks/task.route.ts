import express from "express"
import taskHandler from "./task.http"
import verifyToken from "../../middlewares/verifyToken";

const router = express.Router();

router.get('/:id', [verifyToken], taskHandler.detail);

router.get('/', [verifyToken], taskHandler.list);

router.post('/', [verifyToken], taskHandler.create)

export = router