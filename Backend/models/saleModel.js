// Modelo de Ventas
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: String
})

const Sale = mongoose.model('Sale', saleSchema);

export default Sale