import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { nameUser, emailUser, score } = this.props;

    const hash = md5(emailUser).toString();

    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <section>
        <img
          data-testid="header-profile-picture"
          alt="imgGravatar"
          src={ gravatarUrl }
        />
        <div
          name="name"
          data-testid="header-player-name"
        >
          { nameUser }
        </div>
        <div data-testid="header-score">
          { score }
        </div>
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
