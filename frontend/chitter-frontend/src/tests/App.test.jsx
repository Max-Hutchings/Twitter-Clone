// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
    test('renders learn vitest link', () => {
        render(<App />);
        const linkElement = screen.getByText(/learn vitest/i);
        expect(linkElement).toBeInTheDocument();
    });
});
