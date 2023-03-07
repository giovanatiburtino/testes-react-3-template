import { render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import UserCard from "../components/UserCard"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        firstName: "Giovana",
        lastName: "Tiburtino",
        bank: {
            cardNumber: "3589 6409 4947 0047",
            cardExpire: 10/23
        }
    }
}

describe("User Card", () => {
    test("renderiza o card após o carregamento", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        // quando executar vai retornar esse objeto

        render(<UserCard/>)

        
        await waitFor(() => {
            const name = screen.getByText(/giovana tiburtino/i)

            expect(name).toBeInTheDocument()
        })
        

        const cardNumber = screen.getByText(/3589 640 9 49 47 0 047/i)
        const cardExpire = screen.getByText(/0\.43478260869565216/i)

        expect(cardNumber).toBeInTheDocument()
        expect(cardExpire).toBeInTheDocument()
    })
})
