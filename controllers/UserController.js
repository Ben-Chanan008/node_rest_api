const User = require('../models/User');

async function getUsers(req, res) {
    try{
        const users = await User.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } catch(error){
        console.log(error);
    }
}

async function getUser(req, res, id) {
    try{
        const user = await User.findUser(id);
        console.log(user)
        if(!user){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'User Not Found'}));
        } else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }
    } catch(error){
        console.log(error);
    }
}

async function createUser(req, res) {
    try{  
        const body = await User.getData(req);

        const { name, email, password } = JSON.parse(body);
        
        const user = {
            name, 
            email, 
            password
        }
        const newUser = await User.create(user);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newUser));
    } catch(error){
        console.log(error);
    }
}

async function updateUser(req, res, id) {
    const user = await User.findUser(id);
    // console.log(user)
    if(!user){
        res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'User Not Found'}));
    } else{
        const body = await User.getData(req);

        const { name, email, password } = JSON.parse(body);
        
        const user = {
            name: name || user.name, 
            email: email || user.email, 
            password: password || user.password
        }
        const updProduct = await User.update(id, user);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(updProduct));
    }
}

async function deleteUser(req, res, id){
    try{
        const user = await User.findUser(id);
        console.log(user)
        if(!user){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'User Not Found'}));
        } else{
            const user = await User.destroy(id);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }
    } catch(error){
        console.log(error);
    }
}



module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser, 
    deleteUser
}