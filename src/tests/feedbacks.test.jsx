import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Cobertura da tela de Feedback', () => {
    it('Verifica se o Header está sendo renderizado na tela', () => {
        renderWithRouterAndRedux(<Feedback />);

        const feedbackHeader = screen.getByTestId('header-player-name');
        expect(feedbackHeader).toBeInTheDocument();
      })
      it('Teste de botão de Play Again', async () => {  
          const { history } = renderWithRouterAndRedux(<Feedback />);
          const playAgainButton = screen.getByTestId('btn-play-again')
          expect(playAgainButton).toBeInTheDocument();
          userEvent.click(playAgainButton);
          await waitFor(() => {
              const { location: { pathname } } = history;
              expect(pathname).toBe('/');
            });
      })
    it('Teste se o botão está redirecionando para a página de "Ranking"', async () => {   
        const { history } = renderWithRouterAndRedux(<Feedback />);
        const rankingButton = screen.getByTestId('btn-ranking');
        expect(rankingButton).toBeInTheDocument();
        userEvent.click(rankingButton);
        await waitFor(() => {
            const { location: { pathname } } = history;
            expect(pathname).toBe('/ranking');
        });
    })
    it('Teste se a condição recebe a mensagem "Could be better" ao não acertar mais de 3 perguntas', () => {  
        renderWithRouterAndRedux(<Feedback />);
        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toBeInTheDocument();
        const totalQuestions = screen.getByTestId('feedback-total-question');
        expect(totalQuestions).toBeInTheDocument();
        expect(feedbackText.innerHTML).toBe('Could be better...');
    })
    it('Teste se a condição recebe a mensagem "Well Done!" ao acertar 3 ou mais perguntas', () => {  
      const initialState = {
        player: {
          assertions: 3,
        },
      };
      renderWithRouterAndRedux(<Feedback />, initialState);
        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toBeInTheDocument();
        const totalQuestions = screen.getByTestId('feedback-total-question');
        expect(totalQuestions).toBeInTheDocument();
        expect(feedbackText.innerHTML).toBe('Well Done!');
    })
});