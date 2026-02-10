import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    serviceName: {
        type: String,
        required: true,
        trim: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    priceProofFile: {
        type: String, // File path or URL
        required: false
    },
    cardNumber: {
        type: String,
        required: true,
        trim: true
    },
    cardName: {
        type: String,
        required: true,
        trim: true
    },
    expiryDate: {
        type: String,
        required: true,
        trim: true
    },
    cvv: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
