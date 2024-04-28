process.env.NODE_ENV = "test";

const request = require('supertest')

const app = require('../../app')
const items = require('../../fakeDb')

let item = {name: 'waffle', price: 2.99}
let item2 = {name: 'soda', price: 1.99}

beforeEach(async () => {
    items.push(item)
    items.push(item2)
})

afterEach(async () => {
    const items = []
})

describe('GET /items', function() {
    test('get all items', async function() {
        const resp = await request(app).get(`/items`);
        const {items} = resp.body
        expect(resp.statusCode).toBe(200)
    })
})

describe('GET /items/:name', function() {
    test('get waffle', async function() {
        const resp = await request(app).get('/items/waffle');
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(item)
    })

    test('return 404 if not found', async function() {
        const resp = await request(app).get('/items/not-an-item')
        expect(resp.statusCode).toBe(404)
    })
})


/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function () {
    test("Create popsicle", async function () {
      const response = await request(app)
        .post(`/items`)
        .send({
          name: "Popsicle",
          price: 1.45
        })
      expect(response.statusCode).toBe(200);
      expect(response.body.added.name).toEqual("Popsicle");
      expect(response.body.added.price).toEqual(1.45);
    })
})
  
describe("PATCH /items/:name", function () {
    test("Updates waffle", async function () {
        const response = await request(app)
            .patch(`/items/waffle`)
            .send({
                name: "Pancake",
                price: 2.89
            })
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            updated: {
                name: "Pancake",
                price: 2.89
            }
        })
    })
  
    test("return 404 if not found", async function () {
      const response = await request(app).patch(`/items/not-an-item`);
      expect(response.statusCode).toBe(404);
    })
  })
  
  describe("DELETE /items/:name", function () {
    test("Deletes soda", async function () {
      const response = await request(app)
        .delete(`/items/soda`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    })

    test("return 404 if not found", async function () {
        const response = await request(app).delete(`/items/not-an-item`);
        expect(response.statusCode).toBe(404);
      })
  })
  
  
