import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card'; // Assurez-vous que le chemin d'importation est correct

const mockFilms = [
  { id: '1', image: '/path/to/image1.jpg', titre: 'Film 1', description: 'Description 1' },
  { id: '2', image: '/path/to/image2.jpg', titre: 'Film 2', description: 'Description 2' }
];

describe('Card Component', () => {
  test('should highlight item on mouse enter and unhighlight on mouse leave', () => {
    render(<Card films={mockFilms} />);

    const firstItem = screen.getByText('Film 1').closest('li');
    const secondItem = screen.getByText('Film 2').closest('li');

    // Simuler l'entrée de la souris sur le premier élément
    fireEvent.mouseEnter(firstItem);
    expect(firstItem).toHaveClass('lihovered');
    expect(secondItem).not.toHaveClass('lihovered');

    // Simuler la sortie de la souris du premier élément
    fireEvent.mouseLeave(firstItem);
    expect(firstItem).not.toHaveClass('lihovered');
  });
});
