const Link = require('../models/linkModel');


const generateShortcode = (num) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for(let i = 0; i < num; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


/**
 * Creates a new link
 * @param {*} req 
 * @param {*} res 
 */
const linkPost = (req, res) => {
    let link = new Link();

    link.url = req.body.url;
    link.visits = 1;
    link.shortcode = generateShortcode(6);

    if(link.url){
        link.save(function (err){
            if(err){
                res.status(422);
                console.log('Error while saving the link ', err);
                res.json({
                    error: 'There was an error saving the link'
                });
            }
            res.status(201);
            res.header({
                'location': `http://localhost:3000/api/links/?is=${link._id}`
            });
            res.json(link);
        });
    } else{
        res.status(422);
        console.log('Error while saving the link');
        res.json({
            error: 'No valid data provided for link.'
        });
    }
}

/**
 * Gets a link by id or all of them
 * @param {*} req 
 * @param {*} res 
 */
const linkGet = (req, res) => {
    if(req.query && req.query.id){
        Link.findById(req.query.id, function (err, link){
            if(err){
                res.status(404);
                console.log('Error while queryting the link ', err);
                res.json({
                    error: 'Link doesnt exist'
                });
            }
            res.json(link);
        });
    } else{
        Link.find(function (err, links){
            if(err){
                res.status(422);
                res.json({'error': err});
            }
            res.json(links);
        });
    }
}

/**
 * Updates a link by id
 * @param {*} req 
 * @param {*} res 
 */
const linkPatch = (req, res) => {
    if(req.query && req.query.id){
        Link.findById(req.query.id, function (err, link){
            if(err){
                res.status(422);
                console.log('Error while queryting the link ', err);
                res.json({
                    error: 'Link doesnt eixst'
                });
            }
            link.url = req.body.url ? req.body.url : link.url;
            link.visits = req.body.visits ? req.body.visits : link.visits;
            link.shortcode = req.body.shortcode ? req.body.shortcode : link.shortcode;

            link.save(function (err){
                if(err){
                    res.status(422);
                    console.log('Error while saving the link ', err);
                    res.json({
                        error: 'There was an error saving the link'
                    });
                }
                res.status(200);
                res.json(link);
            });
        });
    } else{
        res.status(404);
        res.json({
            error: 'Link doesnt exist'
        });
    }
}

/**
 * Deletes a link by id
 * @param {*} req 
 * @param {*} res 
 */
const linkDelete = (req, res) => {
    if(req.query && req.query.id){
        Link.findByIdAndRemove(req.query.id, function (err){
            if(err){
                res.status(500);
                console.log('Error while queryting the link');
                res.json({
                    error: 'Link doesnt exist'
                });
            }
            res.status(200).json({});
        });
    } else{
        res.status(204).json({
            error: 'You must provide a link ID'
        });
    }
}

module.exports = {
    linkPost,
    linkGet,
    linkPatch,
    linkDelete
}