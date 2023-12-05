import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { nameUser, emailUser, score } = this.props;

    const hash = md5(emailUser).toString();

    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <section className="header">
        <div className="container-user">
          <img
            data-testid="header-profile-picture"
            alt="imgGravatar"
            src={ gravatarUrl }
          />
          <span
            name="name"
            data-testid="header-player-name"
            className="name"
          >
            { nameUser }
          </span>
        </div>
        <div>
          Pontos:
        </div>
        <span data-testid="header-score">
          { score }
        </span>
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  emailUser: store.loginReducer.loggedEmail,
  nameUser: store.loginReducer.loggedName,
  score: store.player.score,
});

Header.propTypes = {
  nameUser: PropTypes.string.isRequired,
  emailUser: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
