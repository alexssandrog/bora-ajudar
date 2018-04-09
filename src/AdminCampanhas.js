import React, { Component } from 'react';
//import { Redirect, Route } from 'react-router-dom';
import base from './base';

class AdminCampanhas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campanhas: {}
        };
    }

    componentDidMount() {
        base.syncState('campanhas', {
            context: this,
            state: 'campanhas',
            asArray: false
        });
    }

    removeCampanha(key) {
        base.remove('campanhas/' + key, err => {
            console.log(err);
        });
    }

    renderCampanha(key, campanha) {
        return (
            <li key={key}>
                {campanha.nome}
                &nbsp;
                <button onClick={() => {}}>Editar</button>
                <button onClick={() => this.removeCampanha(key)}>Remover</button>
            </li>
        );
    }

    render() {
        return (
            <div>
                <h2>Campanhas</h2>
                <ul>
                    {
                        Object
                            .keys(this.state.campanhas)
                            .map(key => this.renderCampanha(key, this.state.campanhas[key]))
                    }
                </ul>
            </div>
        );
    };
}

export default AdminCampanhas;