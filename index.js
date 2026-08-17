require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');
const productRoutes = require('./routes/productRoutes');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const app = express();
app.use(express.json());
app.use(express.static('public'));

if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('tu_cadena_de_conexion')) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('MongoDB conectado correctamente');
            console.log('Base de datos:', mongoose.connection.name);
            console.log('Estado de conexión:', mongoose.connection.readyState);
        })
        .catch((error) => console.error('Error conectando a MongoDB:', error.message));
} else {
    console.log('Aviso: MONGODB_URI pendiente de configurar en .env');
}

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor StockFlow ejecutándose en http://127.0.0.1:${PORT}`);
});
