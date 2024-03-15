// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe.skip('App Component', () => {
    test('renders learn vitest link', () => {
        render(<App />);
        const linkElement = screen.getByText(/learn vitest/i);
        expect(linkElement).toBeInTheDocument();
    });
});
