import { faker } from '@faker-js/faker'
import { Product } from './product.model'

export const createOneProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: parseInt(faker.commerce.price(), 10),
    images: [faker.image.url(), faker.image.url()],
    category: {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      image: faker.image.url()
    }
  }
}

export const createManyProducts = (count = 10): Product[] => {
  const products: Product[] = []

  for (let index = 0; index < count; index++) {
    products.push(createOneProduct())
  }

  return [...products]
}
