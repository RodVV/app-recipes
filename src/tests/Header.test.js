import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderIntoDocument } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Search from '../pages/components/Search';

describe('Testa o Header da aplicação', () => {
  it('Teste 1 - Testa se tem os inputs de perfil, título e de busca', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const profileInput = screen.getByTestId('profile-top-btn');
    expect(profileInput).toBeInTheDocument();

    const titleInput = screen.getByTestId('page-title');
    expect(titleInput).toBeInTheDocument();

    const searchInput = screen.getByTestId('search-top-btn');
    expect(searchInput).toBeInTheDocument();
  });
  it('Teste 2 - Testa se a rota muda caso a pessoa clique no ícone de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    fireEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/profile');
  });
  it(`Teste 3 - Testa se a barra de busca aparece 
  caso o botão de busca seja clicado`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    fireEvent.click(screen.getByTestId('search-top-btn'));
    renderIntoDocument(<Search />);
  });
});
