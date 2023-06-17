export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  role: 'customer' | 'admin'
}

export type CreateUserDTO = Omit<User, 'id'>
