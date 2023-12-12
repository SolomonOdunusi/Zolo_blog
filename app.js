const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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

app.use(blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title: 'Error'})
})
