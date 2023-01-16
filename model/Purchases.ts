import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PurchasesSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    cart: {
        type: Object,
        required: true,
    },
    datetime: {
        type: Date,
        required: true
    }
})

const PurchasesModel =
    mongoose.models.Purchases || mongoose.model("Purchases", PurchasesSchema);
export default PurchasesModel;
