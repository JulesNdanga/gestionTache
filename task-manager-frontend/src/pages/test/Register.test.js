import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider } from '../../context/AuthContext';
import Register from '../Register';

const mock = new MockAdapter(axios);

describe('Register Component', () => {
  it('renders the registration form', () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it('handles successful registration', async () => {
    mock.onPost('http://localhost:8000/api/register').reply(201, {
      token: 'fake-token',
      user: { id: 1, name: 'John Doe', email: 'john@example.com' }
    });

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Registration successful!/i)).toBeInTheDocument();
  });

  it('handles registration error', async () => {
    mock.onPost('http://localhost:8000/api/register').reply(400);

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Registration failed. Please try again./i)).toBeInTheDocument();
  });
});