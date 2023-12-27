import express from "express"
import validate from "../../middlewares/validate";
import handler from "./comment.http"
import { getListSchema } from "./comment.validate";

const router = express.Router();

router.get('/', [validate(getListSchema)], handler.list);

export = router