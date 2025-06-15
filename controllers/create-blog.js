const blogModel = require("../models/blog-article");
const { calculateReadingTime } = require("../utils/reading-time");

async function createNewBlog(req , res) {
    

    try {
        const {body} = req.body
        const readingTime = calculateReadingTime(body)

    const newBlog = new blogModel({
        title: req.body.title,
        description: req.body.description,
        author: req.user.userId,
        body: req.body.body,
        tags: req.body.tags,
        reading_time : readingTime
    })

    await newBlog.save();
    res.status(201).json({ 
        message: 'You have successfully create a blog',
        blog : newBlog
    });
    console.log("blog creating route is working")
    } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate title, this title is already exist' });
    }

    console.error('We have encounter an error creating your blog:', error);
    res.status(500).json({
             message: 'Server error as we encountered an error creating your blog:', error 
            });
    }
}

module.exports = {
    createNewBlog
}