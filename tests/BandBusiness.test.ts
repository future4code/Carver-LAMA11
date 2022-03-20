import { BandBusiness } from "../src/business/BandBusiness"


let idGenerator = { generate: jest.fn() } as any

let hasManager = {
    hash: jest.fn(),
    compare: jest.fn(() => false),
} as any

let authenticator = {
    generateToken: jest.fn((data: any) => "token"),
} as any

let bandDatabase = {
    createBand: jest.fn(),
    getBandById: jest.fn(() => ({}))
} as any

let bandBusiness = new BandBusiness(
    idGenerator,
    hasManager,
    authenticator,
    bandDatabase
)

describe("Create Band", () => {
    test("Deve retornar erro quando um dos inputs não estão preenchidos", async () => {

        expect.assertions(2)

        try {
            await bandBusiness
                .createBand({
                    name: "Franz Ferdinand",
                    music_genre: "Indie Rock",
                    responsible: "Alex Kapranos"
                })
        } catch (error: any) {
            expect(error.message).toEqual("Preencha todos os campos")
            expect(error.statusCode).toBe(422)
        }
    })
})