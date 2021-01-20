const app = require("../server.js");
const dbConnect = require("../db.js");
const request = require("supertest");

describe("Hello world tests", () => {
    it("Should do a stupid test", () => {
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });
});

describe("Products API", () => {
    describe("GET /", () => {
        it("Should return an HTML document", () => {
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
                {
                    "code": "code_1",
                    "name": "product_1",
                    "provider_name": "provider_name_1",
                    "provider_cif": "provider_cif_1",
                    "category": "Mascarillas",
                    "price": 5,
                    "amount": 100
                },
                {
                    "code": "code_2",
                    "name": "product_2",
                    "provider_name": "provider_name_2",
                    "provider_cif": "provider_cif_2",
                    "category": "Guantes",
                    "price": 10,
                    "amount": 150
                }
            ];

            dbFind = jest.spyOn(dbConnect, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, products);
            });
        });

        it("Should return all products", () => {
            return request(app)
            .get("/api/v1/products")
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).tobeCalledWith({}, expect.any(Function));
            });
        });
    });
});





