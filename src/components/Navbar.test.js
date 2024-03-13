import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar'; // Assurez-vous que le chemin d'accès est correct
import axiosMock from 'axios'; // Vous devrez mocker axios

// Mocks pour les fonctionnalités qui ne sont pas liées à React
jest.mock('axios');
jest.mock('next/link', () => {
  return ({children}) => {
    return children;
  }
});
jest.mock('next/image', () => {
  return ({src, alt}) => {
    return <img src={src} alt={alt} />;
  }
});

describe('Navbar Component', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    axiosMock.get.mockResolvedValue({ data: {} });
    Storage.prototype.getItem = jest.fn(() => 'mockToken');
    Storage.prototype.removeItem = jest.fn();
    Storage.prototype.clear = jest.fn();
  });

  it('renders without crashing', () => {
    render(<Navbar />);
    expect(screen.getByText('Accueil')).toBeInTheDocument();
  });

  it('fetches user data if token exists', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: { id: '1', pseudo: 'UserTest', mail: 'user@test.com', type: 'USER' }
    });

    render(<Navbar />);

    await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('Mon Profil')).toBeInTheDocument());
  });

  it('opens and closes the mobile menu', () => {
    render(<Navbar />);
    const menuButton = screen.getByText('Menu');
    fireEvent.click(menuButton); // Pour ouvrir le menu
    expect(screen.getByText('Accueil')).toBeVisible();

    fireEvent.blur(screen.getByText('Accueil')); 
  });

  it('handles logout correctly', () => {
    render(<Navbar />);
    const logoutButton = screen.getByText('Se déconnecter');
    fireEvent.click(logoutButton);
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('token');
  });

});
