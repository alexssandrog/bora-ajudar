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
                <button onClick={() => { }}>Editar</button>
                <button onClick={() => this.removeCampanha(key)}>Remover</button>
            </li>
        );
    }

    handleSave() {
        const nome = this.nome.value;
        const descricao = this.descricao.value;
        const subTitulo = this.subTitulo.value;
        const tipo = this.state.tipo;
        const comoDoar = this.state.tipo === 'produtos' ? this.comoDoar.value : null;
        const meta = this.state.tipo === 'doacao' ? this.meta.value : null;
        const doado = this.state.tipo === 'doacao' ? this.doado.value : null;

        base.push('campanhas', {
            data: { nome, descricao, subTitulo, tipo, comoDoar, meta, doado },
            then: err => {
                if (!err) {
                    this.nome.value = '';
                    this.descricao.value = '';
                    this.subTitulo.value = '';
                    this.setState({ tipo: '' });
                    if (this.comoDoar) {
                        this.comoDoar.value = '';
                    }
                    if (this.meta) {
                        this.meta.value = '';
                    }
                    if (this.doado) {
                        this.doado.value = '';
                    }
                }
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Campanhas</h2>
                <h3>Nova Campanha</h3>
                Campanha:<input type="text" ref={ref => this.nome = ref} /><br />
                Sub-título:<input type="text" ref={ref => this.subTitulo = ref} /><br />
                Descrição:<textarea ref={ref => this.descricao = ref}></textarea><br />
                Tipo:<br />
                <input type="radio" name='tipo' onClick={() => this.setState({ tipo: 'produtos' })} />Produtos<br />
                <input type="radio" name='tipo' onClick={() => this.setState({ tipo: 'doacao' })} />Doação<br />
                {this.state.tipo === 'doacao' &&
                    <div>
                        <h4>Doação</h4>
                        Meta:<input type="text" ref={ref => this.meta = ref} /><br />
                        Doado:<input type="text" ref={ref => this.doado = ref} defaultValue={0} /><br />
                    </div>}
                {this.state.tipo === 'produtos' &&
                    <div>
                        <h4>Produtos</h4>
                        Como Doar:<input type="text" ref={ref => this.comoDoar = ref} /><br />
                    </div>}
                <button onClick={() => this.handleSave()}>Incluir</button>

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