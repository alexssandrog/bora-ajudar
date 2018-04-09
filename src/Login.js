import React, { Component } from 'react';
import { auth } from './base';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            error: false,
            isLogging: false
        }
        this.email = null;
        this.passwod = null;

        //this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.setState({
            isLogging: true,
            error: false
        });

        auth
            .signInWithEmailAndPassword(this.email.value, this.passwd.value)
            .then((user) => {
                console.log('logged', user);

                this.setState({
                    isLoggedIn: true
                });
            })
            .catch((error) => {
                console.log('error', error);
                this.setState({ isLogging: false });
            });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to='/admin' />
        }
        return (
            <div>
                <input type='email' ref={ref => this.email = ref} /><br />
                <input type='password' ref={ref => this.passwd = ref} /><br />
                {this.state.error && <p>Usuário e/ou senha inválidos.</p>}
                <button disabled={this.state.isLogging} onClick={() => this.handleLogin()}>
                    Entrar
                </button>
            </div>
        );
    };
}

export default Login;