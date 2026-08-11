const assert = require('assert');

describe('Automatización de Pruebas - StockFlow', function () {

    this.timeout(10000);

    it('Debería conectar al servidor y devolver estado 200 en la ruta raíz', async function () {
        const response = await fetch('http://127.0.0.1:3000/');
        assert.strictEqual(response.status, 200);
    });

    it('Debería responder en la ruta /api/products', async function () {
        const response = await fetch('http://127.0.0.1:3000/api/products');
        assert.strictEqual(response.status, 200);
    });

});