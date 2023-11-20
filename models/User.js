const users = require('../data/data.json');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');


function findAll(){
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}

function findUser(id){
    return new Promise((resolve, reject) => {
        const user = users.filter((user, idx) => idx === id - 1)
        resolve(user);
    });
}

function create(user){
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user};
        users.push(newUser);
        writeDataToFile('./data/data.json', users);
        resolve(newUser);
    });
}

function writeDataToFile(filename, data){
    fs.writeFileSync(filename, JSON.stringify(data), 'utf8', (err) => {
        if(err){
            console.log(err);
        }
    })
}

function getData(req){
    return new Promise((resolve, reject) => {
        try{
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });
        
            req.on('end', () => {
                resolve(body);
            });
        } catch(err){
            reject(err)
        }
    });
}

function update(id, user){
    return new Promise((resolve, reject) => {
        const userObj = users.filter((p, idx) => idx === id - 1);
        // console.log(userIndex);
        userObj[0] = {id, ...user} 
        writeDataToFile('./data/data.json', users);
        resolve(userObj[0]);
    });
}

function destroy(id, user){
    return new Promise((resolve, reject) => {
        const userObj = users.filter((p, idx) => idx !== id - 1);
        // console.log(userIndex); 
        writeDataToFile('./data/data.json', userObj);
        let msg = {message: 'Deleted Successfully'}
        resolve(msg);
    });
}

module.exports = {
    findAll,
    findUser,
    create,
    getData,
    update,
    destroy
}

