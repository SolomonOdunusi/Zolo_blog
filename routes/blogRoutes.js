const express = require('express');
const Blog = require('../models/blogs');
const router = express.Router();

// Routes

router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog'})
});

router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
});

router.post('/blogs', (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
});

router.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: result.title })
        })
        .catch(err => {
            console.log(err)
        })
});

router.get('/blogs/:id/edit', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('edit', { blog: result, title: `Edit ${result.title}` });
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.redirect(`/blogs/${id}`);
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
