import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';

// Refazendo evaluator.
describe('Cobertura da tela de Game', () => {
    it('Verifica se o Header está carregando', () => {
        renderWithRouterAndRedux(<Game />);
        const headerPicture = screen.getByTestId('header-profile-picture');
        expect(headerPicture).toBeInTheDocument();
    })
    it('Verifica se as perguntas estão sendo renderizadas corretamente', async () => {
        renderWithRouterAndRedux(<Game />);
        await waitForElementToBeRemoved(() => screen.getByText('carregando...'), { timeout: 3000 });
        const questionText = screen.getByTestId('question-text');
        expect(questionText).toBeInTheDocument();
        const questionCategory = screen.getByTestId('question-category');
        expect(questionCategory).toBeInTheDocument();
    })
    it('Verifica se existem 4 botões na aplicação', async () => {
        renderWithRouterAndRedux(<Game />);
        await waitForElementToBeRemoved(() => screen.getByText('carregando...'), { timeout: 3000 });
        const answerButtons = screen.getAllByRole('button');
        const correctAnswerBtn = screen.getAllByTestId('correct-answer');
        expect(answerButtons.length).toBeGreaterThan(1);
        expect(correctAnswerBtn.length).toBe(1);
    })
    it('Verifica se após clicar 5x em next o jogador irá para página de feedback', async () => {
        const { history } = renderWithRouterAndRedux(<Game />);
        const loadingMsg = screen.getByText('carregando...');
        expect(loadingMsg).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.getByText('carregando...'), { timeout: 3000 });
        const correctButton = screen.getByTestId('correct-answer');
        for (let i = 0; i <= 4; i += 1) {
            userEvent.click(correctButton);
            await waitFor(() => {
                userEvent.click(screen.getByTestId('btn-next'));
            })
        }
        const { location: { pathname } } = history;
        expect(pathname).toBe('/feedback');
    })
})