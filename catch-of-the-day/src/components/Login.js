import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>You need to LTFI.</p>
        <button
            className="github"
            onClick={() => props.authenticate("Google")}
        >
            Log in with The Googs
        </button>
    </nav>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;