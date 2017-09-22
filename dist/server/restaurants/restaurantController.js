'use strict';
const logger = require('./../../applogger');
const {Restaurant} = require('./restaurantEntity');

let addRestaurant = (req, res) => {
    let newRestaurant = new Restaurant(req.body);
    newRestaurant.save().then((docs) => {
        logger.debug(docs);
        res.send(docs);
    }, (err) => {
        res.status(400).send(err);
        logger.debug(err);
        logger.debug('error occurred while adding');
    });
};

let viewRestaurant = (req, res) => {
    logger.debug('Inside get');
    Restaurant.find().then((docs) => {
        res.send(docs);
        logger.debug(docs);
    }, (err) => {
        res.status(400).send(err);
        logger.debug(err);
    });
};

let updateRestaurant = (req, res) => {
    let newComment = req.body.comments;
    console.log('my comment is :'+newComment);
    Restaurant.findOneAndUpdate({_id:req.body.id}, {
        $set: {comments: req.body.comments}
    },function(err,docs) {
        res.send(docs + "update successfully");
        if(err)
        res.status(400).send(err);
    })
};

let deleteRestaurant = (req, res) => {
    Restaurant.remove({_id: req.body.id}).then((docs) => {
        if (!docs) {
            return console.log('id not found');
        }
        logger.debug('deleted successfully');
        res.send(docs);
    }, (err) => {
        res.status(400).send(err);
    });
};

module.exports = {
    addRestaurant,
    viewRestaurant,
    updateRestaurant,
    deleteRestaurant
};
