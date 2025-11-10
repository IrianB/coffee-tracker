import mongoose from 'mongoose'

const analyticsSchema = await mongoose.Schema({
    entry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entries",
        required: true,
    }
},{ timestamps: true})

const Analytics = mongoose.model("Analytics", analyticsSchema)

export default Analytics