const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

var accounts = [
    {id: 1, applicants: [{person: {firstName: 'Joe', lastName: 'Test'}}]},
    {id: 2, applicants: [{person: {firstName: 'Bob', lastName: 'Jack'}}]}
];
var accountCounter = accounts.length + 1;

function readAccount(id) {
    return new Promise((resolve, reject) => {
        id = parseInt(id, 10);
        const account = accounts.find(acc => acc.id === id);
        if(account) {
            resolve(account);
        } else {
            reject({code: 404, message: `account ${id} not found`});
        }
    });
}

function promiseResource(handler) {
    return (req, res, next) => {
        new Promise(resolve =>
            resolve(handler(req, res))
        ).then(
            value => res.json(value),
            next
        );
    };
}

app.get('/accounts', promiseResource(() => accounts));
app.get('/accounts/:id', promiseResource((req) => readAccount(req.params.id)));
app.post('/accounts', promiseResource((req) => {
    const account = req.body;
    account.id = ++accountCounter;
    accounts.push(account);
    return account;
}));
app.put('/accounts/:id', promiseResource((req) =>
    readAccount(req.params.id).then(account =>
        Object.assign(account, req.body)
    )
));
app.delete('/accounts/:id', promiseResource((req) =>
    readAccount(req.params.id).then(account => {
        accounts = accounts.filter(acc => acc !== account);
    })
));

/* eslint-disable no-unused-vars,no-console */
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.code || 500).send(err);
});
/* eslint-enable no-unused-vars,no-console */

module.exports = app;
