import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import callLoginEndpoint from "../../src/services/apis/LoginEndpoint.jsx";

describe('callLoginEndpoint', () => {
    const mock = new MockAdapter(axios);
    const userData = {email: 'user@example.com', password: 'password123'};

    it('should return data on successful login', async () => {
        const responseData = {message: 'Login successful'};
        mock.onPost("authentication/login").reply(200, responseData);

        const result = await callLoginEndpoint(userData);
        expect(result).toEqual(responseData);
    });
})