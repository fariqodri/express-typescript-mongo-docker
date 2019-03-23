import mongoose from "../config/database"

const Schema = mongoose.Schema

enum KursTypes {
    BELI = "beli",
    JUAL = "jual"
}

export interface IKurs extends mongoose.Document {
    currency: string,
    price: number,
    kurs_type: KursTypes
}

export const KursSchema = new Schema({
    currency: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    kurs_type: {
        type: Schema.Types.String,
        enum: ["beli", "jual"]
    }
})

export const KursModel = mongoose.model<IKurs>("Kurs", KursSchema)