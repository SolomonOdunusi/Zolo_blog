const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const app = express();

// Connect to Mongo DB
const DBURI = 'mongodb+srv://SolomonOdunusi:Ajibade1@solo-blog-0.7gw6xyo.mongodb.net/Sol_blogs?retryWrites=true&w=majority';
mongoose.connect(DBURI)
    .then((result) => {
        // Listening to requests on port 3000
        
        
        app.listen(3000)
        console.log('Connected to database')
    })
    .catch((err) => console.log("My Error: " + err));
    

// Register my view engine
app.set('view engine', 'ejs');
app.set('views', 'front');

// mongoose routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'The trials of a developer and analyst 2',
//         snippet: 'You need grit2',
//         body: 'You need grit to thrive as a developer2',
//         author: 'Solomon Odunusi'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('656cc6357cc129d8f8bc1df2')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('./blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me'});
})

app.get('/about-me', (req, res) => {
    res.redirect('./about')
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog'})
})

// Routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: result.title })
        })
        .catch(err => {
            console.log(err)
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err)
        })
})


app.use((req, res) => {
    res.status(404).render('404', { title: 'Error'})
})
