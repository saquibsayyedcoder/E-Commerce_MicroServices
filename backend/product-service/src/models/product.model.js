import mongoose  from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String
        },
        price:{
            type: Number,
            required: true
        },
        stock:{
            type: Number,
            default: 0
        },
        image:{
            type:String
        },
        category:{
            type:String
        }
    },
    {timestamps: true}
);

export default mongoose.model("Product", productSchema);