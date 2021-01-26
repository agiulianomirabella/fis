const Product = require('../products.js');
const mongoose = require('mongoose');
const dbConnect = require('../db')

describe('Products DB connection', () => {
    beforeAll(()=> {
        return dbConnect();
    });

    beforeEach((done) => {
        Product.deleteMany({}, (err) => {
            done();
        });
    });

    it('Writes a product in the DB', (done) => {
        const product = new Product({
            "code": "code_integration_test",
            "name": "product_integration_test",
            "provider_name": "provider_name_integration_test",
            "provider_cif": "provider_cif_integration_test",
            "category": "Guantes",
            "price": 50,
            "amount": 200
        });
        product.save((err, product) => {
            expect(err).toBeNull();
            Product.find({}, (err, products) => {
                expect(products).toBeArrayOfSize(1);
                done();
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})