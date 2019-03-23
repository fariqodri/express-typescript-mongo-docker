import mongoose from "mongoose"

mongoose.connect("mongodb://mongo:27017/express-mongo", {useNewUrlParser: true})    
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err))

export default mongoose