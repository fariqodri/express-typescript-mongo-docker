import mongoose from "../config/database"
import { KursSchema, IKurs } from "./Kurs"

const Schema = mongoose.Schema

export interface IIndexedData extends mongoose.Document {
    type: string
    datetime: Date
    kurs_data: IKurs[]
}

export const IndexedDataSchema = new Schema({
    type: {
        type: Schema.Types.String,
        required: true
    },
    datetime: {
        type: Schema.Types.Date,
        required: true
    },
    kurs_data: [KursSchema]
})

export const IndexedDataModel = mongoose.model<IIndexedData>("IndexedData", IndexedDataSchema)