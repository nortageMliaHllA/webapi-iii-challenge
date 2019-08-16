const express = require('express');
const router = express.Router();

const Post = require('../posts/postDb');
const Users = require('./userDb');

router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error adding new user.'
        })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
        Post.insert(req.body)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({
                    err:err,
                    message: 'Error while posting to the database.'
                });
            });

        });

router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Error retrieving all users.'
            });
        });
});

router.get('/:id', validateUserId, (req, res) => {
    Users.getById(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error retrieving user.'
        });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error getting users posts.'
        });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
        Users.remove(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error deleting user.'
        });
    });
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
        Users.update(id, changes)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({
            err:err,
            message: 'Error updating user.'
            });
      });
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.getById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: 'No user with given id!' 
        });
    }
})
    .catch(err => {
      res.status(500).json({
        err:err,
        message: 'Error while processing the request.'
        });
    });
};

function validateUser(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
    next();
      } else {
        next({ message: 'BAD REQUEST!.' });
      }
};

function validatePost(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
    next();
      } else {
        next({ message: 'BAD REQUEST!.' });
      }
};

module.exports = router;
