import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
    {
        coffeeId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Coffee',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
