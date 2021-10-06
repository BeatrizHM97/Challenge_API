const User = require('../models/userModel');

/**
 * Creates a new user
 * @param {*} req 
 * @param {*} res 
 */
const userPost = (req, res) => {
    let user = new User();

    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;

    if(user.name && user.lastname && user.email && user.password){
        user.save(function (err){
            if(err){
                res.status(422);
                console.log('Error while saving the user ', err);
                res.json({
                    error: 'There was an error saving the user'
                });
            }
            res.status(201);
            res.header({
                'location': `http://localhost:3000/api/users/?is=${user._id}`
            });
            res.json(user);
        });
    } else{
        res.status(422);
        console.log('Error while saving the user ');
        res.json({
            error: 'No valid data provided for user.'
        });
    }
}

/**
 * Gets a user by id or all of them
 * @param {*} req 
 * @param {*} res 
 */
const userGet = (req, res) => {
    if(req.query && req.query.id){
        User.findById(req.query.id, function (err, user){
            if(err){
                res.status(404);
                console.log('Error while queryting the user ', err);
                res.json({
                    error: 'User doesnt exist'
                });
            }
            res.json(user);
        });
    } else{
        User.find(function (err, users){
            if(err){
                res.status(422);
                res.json({'error': err});
            }
            res.json(users);
        });
    }
}

/**
 * Updates a user by id
 * @param {*} req 
 * @param {*} res 
 */
const userPatch = (req, res) => {
    if(req.query && req.query.id){

        User.findById(req.query.id, function (err, user){
            if(err){
                res.status(422);
                console.log('Error while queryting the user ', err);
                res.json({
                    error: 'User doesnt eixst'
                });
            }

            user.name = req.body.name ? req.body.name : user.name;
            user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;

            user.save(function (err){
                if(err){
                    res.status(422);
                    console.log('Error while saving the user ', err);
                    res.json({
                        error: 'There was an error saving the user'
                    });
                }
                res.status(200);
                res.json(user);
            });
        });
    } else{
        res.status(404);
        res.json({
            error: 'User doesnt exist'
        });
    }
}

/**
 * Deletes a user by id
 * @param {*} req 
 * @param {*} res 
 */
const userDelete = (req, res) => {
    if(req.query && req.query.id){
        User.findByIdAndRemove(req.query.id, function (err, user){
            if(err){
                res.status(500);
                console.log('Error while queryting the user');
                res.json({
                    error: 'User doesnt exist'
                });
            }
            res.status(200).json({});
        });
    } else{
        res.status(204).json({
            error: 'You must provide a user ID'
        });
    }
}

module.exports = {
    userPost,
    userGet,
    userPatch,
    userDelete
}