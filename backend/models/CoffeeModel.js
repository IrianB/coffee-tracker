import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema(
    {
        coffeeName: {
            type: String,
            required: true,
            trim: true,
        },
        size: {
            type: String,
            required: true,
            enum: ["Small", "Medium", "Large"],
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        coffeeShopName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Coffee = mongoose.model("Coffee", coffeeSchema);

export default Coffee;
