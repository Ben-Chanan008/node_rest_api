const fs = require('fs');
const http = require('http');
const path = require('path');
const { getUsers,  getUser, createUser, updateUser, deleteUser } = require('./controllers/UserController');

let PORT = process.env.port || 5000;

const server = http.createServer((req, res) => {
    if(req.url === '/api/users' && req.method === 'GET'){
       getUsers(req, res);
    } else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        let id = req.url.split('/')[3]
        getUser(req, res, id);
    } else if(req.url === '/api/users' && req.method === 'POST'){
        createUser(req, res);
    } else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT'){
        let id = req.url.split('/')[3];
        updateUser(req, res, id);
    }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE'){
        let id = req.url.split('/')[3];
        deleteUser(req, res, id);
    }else{
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
});

server.listen(PORT, () => console.log(`Server Running on ${PORT}`));
    