const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    sku: {
        type: String,
        required: [true, 'El código SKU es obligatorio'],
        unique: true
    },
    quantity: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [0, 'El stock no puede ser negativo']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);