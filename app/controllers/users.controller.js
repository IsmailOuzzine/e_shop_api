const db = require('../models/index');
const User = db.users;

const findAll = (req, res) => {
    User.findAll()
    .then(data => {
        let message = `Getting all users`;
        console.log(message);
        res.json(data);
    })
    .catch(err => {
        let message = `Cannot get users. Error : ${err}`;
        console.error(message);
        res.status(500).json({});
    })
}

const findById = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
    .then(data => {
        let message = `Getting the user with id ${id}`;
        console.log(message);
        res.json(data);
    })
    .catch(err => {
        let message = `Cannot get the user with id ${id}. Error : ${err}`;
        console.error(message);
        res.status(500).json({});
    })
}

const authenticate = (req, res) => {
    if (!req.body.email || !req.body.password) {
        let message = 'Values connot be empty!';
        console.error(message);
        res.json({
            message,
            result : false
        });
        return ;
    }
    User.findOne({ where : {
        email : req.body.email,
        password : req.body.password
    }})
    .then(data => {
        let message = 'User Getted successfully! ';
        console.log(message);
        res.json({
            user : data,
            message,
            result : true
        });
    })
    .catch(err => {
        let message = `Cannot create the new user. Error : ${err}`;
        console.error(message);
        res.json({
            message,
            result : false
        });
    })
}

const create = (req, res) => {
    // console.log({
    //     name : req.body.name,
    //     familyName : req.body.familyName,
    //     email : req.body.email,
    //     password : req.body.password,
    //     roles : req.body.roles,
    // })
    if (!req.body.name || !req.body.familyName || !req.body.email || !req.body.password) {
        let message = 'Values connot be empty!';
        res.json({
            message,
            result : false
        });
        return ;
    }
    // creating
    let user = {
        name : req.body.name,
        familyName : req.body.familyName,
        email : req.body.email,
        password : req.body.password,
        roles : req.body.roles,
    }
    User.create(user)
        .then((data) => {
            // console.log(`data.id : ${data.id}`);
            let message = 'User Created successfully! ';
            console.log(message);
            res.json({
                id : data.id,
                message,
                result : true
            });
        }
        )
        .catch(err => {
            let message = `Cannot create the new user. Error : ${err}`;
            console.error(message);
            res.json({
                message,
                result : false
            });
        });
}

const updateById = (req, res) => {
    const id = req.params.id;
    // console.log({
    //     name : req.body.name,
    //     familyName : req.body.familyName,
    //     email : req.body.email,
    //     password : req.body.password,
    //     roles : req.body.roles,
    // })
    if (!id || !req.body.name || !req.body.familyName || !req.body.email || !req.body.password) {
        let message = 'Values connot be empty!';
        res.json({
            message,
            result : false
        });
        return ;
    }
    // updating
    let user = {
        id : id,
        name : req.body.name,
        familyName : req.body.familyName,
        email : req.body.email,
        password : req.body.password,
        roles : req.body.roles,
    }
    User.update(user, { where : { id : id } })
        .then((data) => {
            // console.log(`data.id : ${data.id}`);
            let message = 'User updated successfully! ';
            console.log(message);
            res.json({
                message,
                result : true
            });
        }
        )
        .catch(err => {
            let message = `Cannot update the user. Error : ${err}`;
            console.error(message);
            res.json({
                message,
                result : false
            });
        });
}

const deleteById = (req, res) => {
    const id = req.params.id;
    if (!id) {
        let message = 'Values connot be empty!';
        res.json({
            message,
            result : false
        });
        return ;
    }
    // deleting
    User.destroy({ where : {id : id} })
        .then(() => {
            let message = `User deleted successfully!`;
            console.log(message);
            res.json({
                message,
                result : true
            });
        })
        .catch(err => {
            let message = `Cannot delete the user. Error : ${err}`;
            console.error(message);
            res.json({
                message,
                result : false
            });
        })
}

module.exports = {
    findAll,
    findById,
    authenticate,
    create,
    updateById,
    deleteById
}