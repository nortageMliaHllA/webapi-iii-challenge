const express = require('express');
const db = require('./postDb');
const Post = require('../posts/postDb');

const router = require('express').Router();

router.get('/', (req, res) => {
    db.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'Error retrieving posts.'
        });
    });
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    Post.getById(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Error retrieving post.'
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Post.remove(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Error removing post'
        });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Post.update(id, changes)
        .then(post => {
            console.log(post);
            res.status(201).json({
                post: `${id} Successfully updated...`
            });
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Error updating post'
        });
    });
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;
    Post.getById(id)
        .then(post => {
            if (post) {
                // req.post = post;
                next();
            } else {
                res.status(400).json({message: 'Invalid post id, try again!'});
            }
        })
        .catch (err => {
            res.status(500).json({
                err:err,
                message: 'Error accessing post from database!'
        });
    });
};

module.exports = router;