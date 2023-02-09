import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchToken from '../service/service';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleClick = async () => {
    const { history: { push } } = this.props;
    const token = await fetchToken();
    localStorage.setItem('token', token);
    console.log(token);
    if (token) return push('/game');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { name, email } = this.state;
    const { handleChange, handleClick } = this;
    const { history } = this.props;

    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
            onChange={ handleChange }
          />
          <input
            type="text"
            data-testid="input-player-name"
            value={ name }
            name="name"
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(name.length > 0 && email.length > 0) }
            onClick={ handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/config') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
