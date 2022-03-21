// import { UserBusiness } from "../src/business/UserBusiness"

// let idGenerator = { generate: jest.fn() } as any

// let hasManager = {
//     hash: jest.fn(),
//     compare: jest.fn(() => false),
// } as any

// let authenticator = {
//     generateToken: jest.fn((data: any) => "token"),
// } as any

// let userDatabase = {
//     createUser: jest.fn(),
//     getUserByEmail: jest.fn(() => ({}))
// } as any

// let userBusiness = new UserBusiness(
//     idGenerator,
//     hasManager,
//     authenticator,
//     userDatabase
// )

// describe("Signup", () => {
//     test("Erro que deve retornar quando um dos inputs está vazio", async () => {

//         expect.assertions(2)

//         try {
//             await userBusiness
//                 .createUser({
//                     name: "Melissa",
//                     email: "mel@email.com",
//                     password: "minhaSenha123",
//                     role: "NORMAL"
//                 })
//         } catch (error: any) {
//             expect(error.message).toEqual("Preencha todos os campos")
//             expect(error.statusCode).toBe(422)
//         }
//     })
// })

// describe("Login", () => {
//     test("Erro que deve retornar quando um dos inputs está vazio", async () => {

//         expect.assertions(2)

//         try {
//             await userBusiness
//                 .getUserByEmail({
//                     email: "mel@email.com",
//                     password: "minhaSenha123",
//                 })
//         } catch (error: any) {
//             expect(error.message).toEqual("Preencha todos os campos")
//             expect(error.statusCode).toBe(422)
//         }
//     })
// })