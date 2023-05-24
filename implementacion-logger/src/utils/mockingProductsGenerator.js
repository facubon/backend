import { faker } from '@faker-js/faker';

export default function mockingProductGenerator() {

  let mockingProducts = []


  for (let i = 0; i <= 100; i++) {

    mockingProducts.push({
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productAdjective(),
      price: faker.commerce.price(100, 500),
      code: faker.random.alphaNumeric(7),
      status: true,
      stock: faker.datatype.number(200),
      _id: faker.database.mongodbObjectId()


    })

  }

  return mockingProducts



}


