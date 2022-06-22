import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { API_URL, mockHeader } from './helpers';

describe('Testa o Header da aplicação', () => {
  it('Teste 1 - Testa se tem os inputs de perfil, título e de busca', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const profileIcon = screen.getByAltText('Profile icon');
    expect(profileIcon).toBeInTheDocument();

    const titleInput = screen.getByText('Foods');
    expect(titleInput).toBeInTheDocument();

    const searchBar = screen.getByAltText('Search icon');
    expect(searchBar).toBeInTheDocument();
  });

  it('Teste 2 - Testa se a rota muda caso a pessoa clique no ícone de perfil', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const profileIcon = screen.getByAltText('Profile icon');
    userEvent.click(profileIcon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  it(`Teste 3 - Testa se a barra de busca aparece e desaparece
  caso o botão de busca seja clicado`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchBar = screen.getByAltText('Search icon');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(searchBar);

    const searchInput = screen.getByRole('textbox', { name: 'Search Recipe' });
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchBar);
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Teste 4 - Testa se a API é chamada com o endpoint correto', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockHeader),
    });

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    expect(global.fetch).toBeCalledWith(API_URL);
    expect(global.fetch).toBeCalledTimes(1);
  });
});
