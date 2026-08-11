require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'StockFlow funcionando correctamente'
    });
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI no está definida');
    process.exit(1);
}

async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log('MongoDB conectado correctamente');
        console.log('Base de datos:', mongoose.connection.name);
        console.log('Estado de conexión:', mongoose.connection.readyState);

        // Cargar las rutas DESPUÉS de conectar MongoDB
        const productRoutes = require('./routes/productRoutes');

        app.use('/api/products', productRoutes);

        app.listen(PORT, () => {
            console.log(
                `Servidor StockFlow ejecutándose en http://127.0.0.1:${PORT}`
            );
        });

    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
}

startServer();