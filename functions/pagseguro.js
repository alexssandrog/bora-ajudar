const request = require('request-promise');
const parser = require('xml2js').parseString;

const email = 'alex@gottschalk.com.br';
const token = 'D4891509AEA44796BDCB7154D81ACC80';

request({
    uri: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout',
    method: 'POST',
    form: {
        token: token,
        email: email,
        currency: 'BRL',
        itemId1: 'idCampanha',
        itemDescription1: 'Doação',
        itemQuantity1: '1',
        itemAmount1: '2.00'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})
.then(data => {
    parser(data, (err, json) => {
        console.log(json);
    })
});

