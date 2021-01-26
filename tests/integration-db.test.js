const Product = require('../products.js');
const mongoose = require('mongoose');
const dbConnect = require('../db');

describe('DB connection', () => {
    beforeAll(() => {
        return dbConnect();
    })

    beforeEach((done) => {
        Product.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a Product in MongoDB', (done) => {
        const product = new Product({
            "code": "code_1",
            "name": "product_1",
            "provider_name": "provider_name_1",
            "provider_cif": "provider_cif_1",
            "category": "Mascarillas",
            "price": 5,
            "amount": 100
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






































// const Product = require('../products.js');
// const mongoose = require('mongoose');
// const dbConnect = require('../db')

// describe('Products DB connection', () => {
//     beforeAll(()=> {
//         return dbConnect();
//     });

//     beforeEach((done) => {
//         Product.deleteMany({}, (err) => {
//             done();
//         });
//     });

//     it('Writes a product in the DB', (done) => {
//         const product = new Product({
//             "code": "code_1",
//             "name": "product_1",
//             "provider_name": "provider_name_1",
//             "provider_cif": "provider_cif_1",
//             "category": "Mascarillas",
//             "price": 5,
//             "amount": 100
//         });
//         product.save((err, product) => {
//             expect(err).toBeNull();
//             Product.find({}, (err, products) => {
//                 expect(products).toBeArrayOfSize(1);
//                 done();
//             });
//         });
//     });

//     afterAll((done) => {
//         mongoose.connection.db.dropDatabase(() => {
//             mongoose.connection.close(done);
//         });
//     });

// })