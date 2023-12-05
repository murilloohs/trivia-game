import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Cobertura da tela de Login', () => {
    it('Verifica inputs da tela de login', () => {
        renderWithRouterAndRedux(<App />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        expect(inputEmail).toBeInTheDocument();
       
        const inputName = screen.getByTestId('input-player-name');
        expect(inputName).toBeInTheDocument();
    })
    it('Verifica botões da tela de login', () => {
        renderWithRouterAndRedux(<App />);
        const buttonPlay = screen.getByTestId('btn-play');
        expect(buttonPlay).toBeInTheDocument();
        expect(buttonPlay).toBeDisabled();

        const buttonSettings = screen.getByTestId('btn-settings');
        expect(buttonSettings).toBeInTheDocument();
    })
    it('Verifica se botão configurações leva para /config', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const buttonSettings = screen.getByTestId('btn-settings');
        userEvent.click(buttonSettings);

        await waitFor(() => {
            const { location: { pathname } } = history;
            expect(pathname).toBe('/config');
        });
        
    })
    it('Valida botão de play', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const inputName = screen.getByTestId('input-player-name');
        userEvent.type(inputName, 'joão');
        expect(inputName).toHaveValue('joão');

        const inputEmail = screen.getByTestId('input-gravatar-email');
        userEvent.type(inputEmail, 'joão@trybe.com');
        expect(inputEmail).toHaveValue('joão@trybe.com');

        const buttonPlay = screen.getByTestId('btn-play');
        expect(buttonPlay).toBeEnabled();
        userEvent.click(buttonPlay);

        await waitFor(() => {
            const { location: { pathname } } = history;
            expect(pathname).toBe('/game');
            expect(localStorage.hasOwnProperty('token')).toBeTruthy();
        });
    })
});