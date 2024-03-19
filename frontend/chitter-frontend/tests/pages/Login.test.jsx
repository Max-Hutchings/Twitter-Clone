import {MemoryRouter} from "react-router-dom";
import Login from "../../src/pages/Login.jsx";
import {render, screen} from "@testing-library/react";
import {AuthProvider} from "../../src/services/AuthContext.jsx";


describe("Testing the login page", () => {

    it("Should render login form", () => {



        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        )

        const emailInput = screen.getByPlaceholderText("Email");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText("Password");
        expect(passwordInput).toBeInTheDocument();

        const loginBtn = screen.getByRole("button", {name: "Login"});
        expect(loginBtn).toBeInTheDocument();
    })
})