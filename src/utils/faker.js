import { faker } from "@faker-js/faker";

export const generarProductos = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        department: faker.commerce.department(), 
        stock: faker.number.int({ min: 1, max: 100 })
    }
}