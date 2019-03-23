import {Handler} from "express"

export interface IController {
    get?: Handler
    create?: Handler
    update?: Handler
    delete?: Handler
}