import { Router } from "express"

import {IndexingController} from "../controllers"

const routes = Router()

routes.get("/indexing", IndexingController.get!)

export default routes