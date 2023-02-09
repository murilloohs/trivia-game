import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="input-player-name"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            disabled={ !(name.length > 0 && email.length > 0) }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
