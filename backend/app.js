
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Post = require('./models/post');

//execute express as a funtion
const app = express();

mongoose.connect("mongodb+srv://Admin:PTk2ek7yZMGXMSxI@cluster0-9nslc.mongodb.net/node-angular?retryWrites=true&w=majority",
  {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to the database!')
    })
    .catch(() => {
      console.log('Connection the the database failed.');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  next();
});

//PTk2ek7yZMGXMSxI

app.post("/api/posts", (req, res, next) => {
  const posts = new Post({
    title: req.body.title,
    content: req.body.content
  });
  posts.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Successfully done soldier!',
      postId: createdPost._id
  });
 // console.log(posts);
 // posts.save();
  
    });
  });

app.get('/api/posts', (req, res, next) => {
Post.find().then(documents => {
  res.status(200).json({
    message: "Posts fetched successfully",
    posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    console.log(req.params.id);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
