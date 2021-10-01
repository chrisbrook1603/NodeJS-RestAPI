const request = require('supertest');
const app = require('./app').app;
const build = require('./app').productBuilder;

let objtoAdd = {
    name: "ExampleName",
    description: "ExampleDescription",
    price: 5.99,
    count: 1
};

let objUpdate = {
    _id: "", //We will get this after we have created the record
    name: "new name",
    description: "new desc",
    price: 99.99,
    count: 2
};


// TEST THE REST API ENDPOINT FOR POST
describe('POST requests', () => {

    test('POST product/create-new endpoint, expect 201', async () => {
        const res = await (await request(app).post('/product/create-new')).send(objtoAdd)
        expect(res.statusCode).toBe(201);
        objUpdate._id = res.body._id
    });

    test('POST bad endpoint, expect 404', async () => {
        const res = await (await request(app).post('/product/createnew')).send(objtoAdd)
        expect(res.statusCode).toBe(404);
    });

    test('POST bad request, expect 400', async () => {
        const res = await (await request(app).post('/product/create-new')).send(objtoAdd)
        expect(res.statusCode).toBe(400);
    });

});

// TEST THE REST API ENDPOINT FOR PUT
describe('PUT request', () => {
    
    test('PUT product/update/:id endpoint, expect 202', async () => {
        const res = await (await request(app).put('/product/update/:id')).send(objUpdate)
        expect(res.statusCode).toBe(202);
    });

    test('PUT product/update/:id/:count endpoint, expect 202', async () => {
        expect(res.statusCode).toBe(202);
    });

    test('PUT bad endpoint, expect 404', async () => {
        const res = await (await request(app).put('/product/update:id')).send(objUpdate)
        expect(res.statusCode).toBe(404);
    });

    test('PUT bad endpoint, expect 404', async () => {
        expect(res.statusCode).toBe(404);
    });

    test('PUT bad request, expect 400', async () => {
        const res = await (await request(app).put('/product/update/')).send(objUpdate)
        expect(res.statusCode).toBe(400);
    });

    test('PUT bad request, expect 400', async () => {
        expect(res.statusCode).toBe(400);
    });

});

// TEST THE REST API ENDPOINT FOR GET
describe('GET requests', () => {
    
    test('GET product/read endpoint, expect 200', async () => {
        const res = await request(app).get('/product/read')
        expect(res.statusCode).toBe(200);
    });

    test('GET product/read/:id endpoint, expect 200', async () => {
        const res = await request(app).get('/product/read/:id')
        expect(res.statusCode).toBe(200);
    });
    
    test('GET bad endpoint, expect 404', async () => {
      const res = await request(app).get('/productread')
      expect(res.statusCode).toBe(404);
    });

    test('GET bad endpoint, expect 404', async () => {
        const res = await request(app).get('/productread/:id')
        expect(res.statusCode).toBe(404);
      });

});

// TEST THE REST API ENDPOINT FOR DELETE
describe('DELETE requests', () => {
    
    test('DELETE product/delete/:id endpoint, expect 202', async () => {
        const res = await request(app).get('/product/delete/:id')
        expect(res.statusCode).toBe(202);
    });

    test('DELETE bad endpoint, expect 404', async () => {
      const res = await request(app).get('/productdelete/:id')
      expect(res.statusCode).toBe(404);
    });

    test('DELETE bad request, expect 400', async () => {
        const res = await request(app).get('/product/delete/')
        expect(res.statusCode).toBe(404);
      });

});

// UNIT TEST THE PRODUCT BUILDER
describe('Unit Tests', () => {

    test('product object builder', () => {
        expect(productBuilder("ExampleName", "ExampleDescription", 5.99, 1)).toEqual(obj);
    });

});