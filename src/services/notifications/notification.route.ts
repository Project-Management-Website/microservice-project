import express from "express"
import validate from "../../middlewares/validate";
import notifHandler from "./notification.http"
import { createNotificationSchema, getNotificationSchema, getNotificationsSchema } from "./notification.validate";

const router = express.Router();

router.get('/:uuid', [validate(getNotificationSchema)], notifHandler.detail);

router.get('/', [validate(getNotificationsSchema)], notifHandler.list);

router.post('/', [validate(createNotificationSchema)], notifHandler.create)

export = router