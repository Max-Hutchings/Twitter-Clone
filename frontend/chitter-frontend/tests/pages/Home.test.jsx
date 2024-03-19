import {MemoryRouter} from "react-router-dom";
import {AuthProvider} from "../../src/services/AuthContext.jsx";
import Home from "../../src/pages/Home.jsx";
import {fireEvent, render, screen} from "@testing-library/react";
import callGetAllPeeps from "../../src/services/apis/GetPeepsEndpoint.jsx";


vi.mock("../../src/services/apis/GetPeepsEndpoint.jsx");

describe("Testing the home page renders correctly", () => {

    beforeEach(async() => {

        callGetAllPeeps.mockResolvedValue({
            data: [
                {
                    "textContent": "This is my peep",
                    "createdDate": "2024-03-19T15:40:00.000Z",
                    "accountId": {
                        "username": "User 1",
                    },
                },
                {
                    "textContent": "another peep",
                    "createdDate": "2024-03-19T15:30:00.000Z",
                    "accountId": {
                        "username": "User 2",
                    },
                }
            ]
        });


        await render(
            <MemoryRouter>
                <AuthProvider>
                    <Home />
                </AuthProvider>
            </MemoryRouter>
        )
    })

    it("Should render the navbar", () => {

        const navbarElement = screen.getByRole("navigation");
        expect(navbarElement).toBeInTheDocument()
    });

    it("Should render the peeps-feed on page", () => {
        const peepFeed = screen.getByRole("peep-feed");
        expect(peepFeed).toBeInTheDocument();

    })

    it("Should render the add peep btn", () => {
        const addPeepBtn = screen.getByRole("add-peep-btn");
        expect(addPeepBtn).toBeInTheDocument();
    })

    it("Clicking addPeepBtn should set createPeepModal to true", () =>{
        const addPeepBtn = screen.getByRole("add-peep-btn");
        fireEvent.click(addPeepBtn);

        const createPeepModal = screen.getByRole("create-peep-modal");
        expect(createPeepModal).toBeInTheDocument();
    })

    // it("Should render peeps in reverse chronological order", () => {
    //
    // })

    it("Should render 2 comment links", () => {
        const commentsLinks = screen.getAllByRole('open-comments-btn');
        expect(commentsLinks).toHaveLength(2);
    });

    it("Should render 2 reply links", () => {
        const replyLinks = screen.getAllByRole('reply-btn');
        expect(replyLinks).toHaveLength(2);
    });

    it("First peep should have correct username and content", () => {
        const usernameElements = screen.getAllByRole('peep-username');
        const contentElements = screen.getAllByRole('peep-content');

        expect(usernameElements[0]).toHaveTextContent('User 1');
        expect(contentElements[0]).toHaveTextContent('This is my peep');
    });

    it("Second peep should have correct username and content", () => {
        const usernameElements = screen.getAllByRole('peep-username');
        const contentElements = screen.getAllByRole('peep-content');

        expect(usernameElements[1]).toHaveTextContent('User 2');
        expect(contentElements[1]).toHaveTextContent('another peep');
    });
})