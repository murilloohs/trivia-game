import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';


describe('Cobertura da tela de Ranking', () => {
  it('Teste se está sendo renderizado um title escrito "Ranking" ', () => {
    renderWithRouterAndRedux(<Ranking/>)

    const titleRanking = screen.getByTestId('ranking-title');
    expect(titleRanking).toBeInTheDocument()
    expect(titleRanking).toHaveTextContent(/Ranking/i);
  });

  describe('Teste se está sendo renderizado informações do jodador', () => {
    beforeEach( () => {
      const initialState = {
        loginReducer: {
          loggedName: 'Tutu'
        },
        player: {
          score: 194
        }
      }
      renderWithRouterAndRedux(<Ranking/>, initialState )
    } )
    it('Verifica se aparece a imagem do jogador', async () => {
      const src="https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"
      const imgEl = screen.getAllByRole('img')

      expect(imgEl[0]).toBeInTheDocument()
      expect(imgEl[0].src).toContain(src)
    })
    it('Verifica se aparece o nome do jogador', () => {
      const namePlayer = screen.getAllByText('Tutu')

      expect(namePlayer[0]).toBeInTheDocument()
      expect(namePlayer[0]).toHaveTextContent(/tutu/i)
    })
    it('Verifica se aparece o score', () => {
      const scorePlayer = screen.getAllByText('194')

      expect(scorePlayer[0]).toBeInTheDocument()
      expect(scorePlayer[0]).toHaveTextContent('194')
    })
  })
  it('Teste se o botão com o texto "Back to login" está  redirecionando para a página "Login"', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking/>);

    const btnGoHome = screen.getByTestId('btn-go-home');
    expect(btnGoHome).toBeInTheDocument()
    expect(btnGoHome).toHaveTextContent('Back to login');

    userEvent.click(btnGoHome);
    await waitFor( () => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });
  });
});
