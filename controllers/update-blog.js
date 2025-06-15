const blogModel = require("../models/blog-article");
const { calculateReadingTime } = require("../utils/reading-time");

async function updateBlog(req , res) {
    
    const blogId = req.params.id;
    const userId = req.user.userId;

    try {
        
        const {body} = req.body
        let updateData = {...req.body}
        if (body) {
            updateData.reading_time = calculateReadingTime(body);
        }
        
        const blogToUpdate = await blogModel.findByIdAndUpdate(blogId, {...req.body,  author : userId} , { new: true, runValidators: true})

        console.log("Found blog:", blogToUpdate)


        if(!blogToUpdate){
            return res.status(404).json({
                message : " We can not find any blog or you may not be authorize"
            })
        }

        await blogToUpdate.save()
        res.status(200).json({
            message: "You have successfully updated your blog",
            blog: blogToUpdate
        });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message : "there was a server error trying to update your blog",
            error : error.message
        })
    }
}

module.exports = {
    updateBlog
}