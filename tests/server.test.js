const app = require("../server.js");
const Product = require('../products.js');
const ApiKey = require("../apikeys.js");
const request = require("supertest");

describe("Hello world tests", () => {
    it("should do a stupid test", () => {
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });
});

describe("Products API", () => {
    describe("GET /", () => {
        it("should return an HTML document", () => {
            return request(app)
            .get("/")
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            });
        });
    });

    describe("GET /products", () => {
        beforeAll(() => {
            const products = [
                new Product({
                    "code": "code_1",
                    "name": "product_1",
                    "provider_name": "provider_name_1",
                    "provider_cif": "provider_cif_1",
                    "category": "Mascarillas",
                    "price": 5,
                    "amount": 100
                }),
                new Product({
                    "code": "code_2",
                    "name": "product_2",
                    "provider_name": "provider_name_2",
                    "provider_cif": "provider_cif_2",
                    "category": "Guantes",
                    "price": 10,
                    "amount": 150
                })
            ];

            dbFind = jest.spyOn(Product, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, products);
            });
            
            const user = {
                user: "test",
                apikey: "1"
            }

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            });
        });

        it("should return all products", () => {
            return request(app)
            .get("/api/v1/products")
            .set("apikey", "1")
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe("POST /products", () => {
        let dbInsert;
        const product = {
            "code": "code_to_post_test",
            "name": "product_to_post_test",
            "provider_name": "provider_name_to_post_test",
            "provider_cif": "provider_cif_to_post_test",
            "category": "Guantes",
            "price": 50,
            "amount": 200
        };

        beforeEach(() => {
            dbInsert = jest.spyOn(Product, "create")

            const user = {
                user: "test",
                apikey: "1"
            }
            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            });
        });


        it("should add a new Product is everything is fine", () => {
            dbInsert.mockImplementation((p, callback) => {
                callback(false);
            });

            return request(app)
            .post("/api/v1/products")
            .set("apikey", "1")
            .send(product)
            .then((response) => {
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(product, expect.any(Function));
            });
        });

        it("should return 500 if there is any problem with the DB", () => {
            dbInsert.mockImplementation((p, callback) => {
                callback(true);
            });

            return request(app)
            .post("/api/v1/products")
            .set("apikey", "1")
            .send(product)
            .then((response) => {
                expect(response.statusCode).toBe(500);
                expect(dbInsert).toBeCalledWith(product, expect.any(Function));
            });
        });
    });

    describe("DELETE /products/1234", () => {
        beforeAll(() => {
            const product = new Product({
                    "code": "1234",
                    "name": "product_to_delete_test",
                    "provider_name": "provider_name_to_delete_test",
                    "provider_cif": "provider_cif_to_delete_test",
                    "category": "Mascarillas",
                    "price": 5,
                    "amount": 100
                }),
            
            dbFind = jest.spyOn(Product, "findOneAndRemove");
            dbFind.mockImplementation((query, callback) => {
                callback(null, product);
            });
            
            const user = {
                user: "test",
                apikey: "1"
            }

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            });
        });

        it("should delete the product", () => {
            return request(app)
            .delete("/api/v1/products/1234")
            .set("apikey", "1")
            .then((response) => {
                expect(response.statusCode).toBe(204);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe("PUT /products/1234", () => {
        const product_to_put = new Product({
            "code": "1234",
            "name": "new_name",
            "provider_name": "new_provider_name",
            "provider_cif": "new_provider_cif",
            "category": "Guantes",
            "price": 15,
            "amount": 200
        });

        beforeAll(() => {
            const product = new Product({
                "code": "1234",
                "name": "product_to_update_test",
                "provider_name": "provider_name_to_update_test",
                "provider_cif": "provider_cif_to_update_test",
                "category": "Mascarillas",
                "price": 5,
                "amount": 100
            });

            dbFind = jest.spyOn(Product, "findOne");
            dbFind.mockImplementation((query, callback) => {
                callback(null, product);
            });
            
            const user = {
                user: "test",
                apikey: "1"
            }

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            });
        });

        it("should update the product", () => {
            dbFind.mockImplementation((p, callback) => {
                callback(false);
            });

            return request(app)
            .delete("/api/v1/products/1234")
            .set("apikey", "1")
            .send(product_to_put)
            .then((response) => {
                expect(response.statusCode).toBe(204);
            });
        });

        it("should return 500 if there is any problem with the DB", () => {
            dbFind.mockImplementation((p, callback) => {
                callback(true);
            });

            return request(app)
            .post("/api/v1/products")
            .set("apikey", "1")
            .send(product_to_put)
            .then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });

});





