import Signup from "../../src/pages/Signup.jsx";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";


describe("Testing signup page", () => {
    it("Signup form renders with correct inputs", () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        const fNameInput = screen.getByPlaceholderText("First Name");
        expect(fNameInput).toBeInTheDocument();

        const lNameInput = screen.getByPlaceholderText("Last Name");
        expect(lNameInput).toBeInTheDocument();

        const usernameInput = screen.getByPlaceholderText("Username");
        expect(usernameInput).toBeInTheDocument();

        const emailInput = screen.getByPlaceholderText("Email");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText("Password");
        expect(passwordInput).toBeInTheDocument();

        const signupBtn = screen.getByRole("button", { name: "Sign Up"});
        expect(signupBtn).toBeInTheDocument();
    })
})