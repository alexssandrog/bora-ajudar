const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require('firebase-admin');

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const xmlParser = require('xml2js').parseString;
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));

admin.initializeApp();

const email = 'alex@gottschalk.com.br';
const token = 'D4891509AEA44796BDCB7154D81ACC80';
const checkoutUrl = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('BoraAjudar Server');
});

app.post('/donate', (req, res) => {
  request({
    uri: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout',
    method: 'POST',
    form: {
      token: token,
      email: email,
      currency: 'BRL',
      itemId1: req.body.campanha,
      itemDescription1: 'Doação',
      itemQuantity1: '1',
      itemAmount1: req.body.valor
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
    .then(data => {
      xmlParser(data, (err, json) => {
        res.send({
          url: checkoutUrl + json.checkout.code[0]
        });
      });
    });
});

app.post('/webhook', (req, res) => {
  const notificationCode = req.body.notificationCode;
  const consultaNotificacao = 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications/';

  request(consultaNotificacao + notificationCode + '?token=' + token + '&email=' + email)
    .then(notificationXML => {
      xmlParser(notificationXML, (err, transactionJSON) => {
        const transaction = transactionJSON.transaction;
        const status = transaction.status[0];
        const amount = transaction.grossAmount[0];
        const campanha = transaction.items[0].item[0].id[0];

        admin
          .database()
          .ref('/transactions/' + transaction.code[0])
          .set(transaction)
          .then(() => {
          });

        admin
          .database()
          .ref('/campanhas/' + campanha)
          .once('value')
          .then(value => {
            const campanhaAtual = value.val();
            const doado = parseFloat(campanhaAtual.doado) + parseFloat(amount);
            campanhaAtual.doado = doado;

            admin
              .database()
              .ref('/campanhas/' + campanha)
              .set(campanhaAtual)
              .then(() => {
                res.send('ok');
              });
          });
      })
    })
});

exports.api = functions.https.onRequest(app);