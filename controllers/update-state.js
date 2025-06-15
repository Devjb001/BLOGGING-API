const blogModel = require("../models/blog-article")

async function updateBlogState(req , res) {
    
     const blogId = req.params.id
     const userId = req.user.userId

        // console.log("Blog ID:", blogId)
        // console.log("User ID:", userId)
        // console.log("req.user:", req.user) // See the full user object

     try {
        // const blogExists = await blogModel.findById(blogId)
        // console.log("Blog exists:", blogExists)
        
        // if (blogExists) {
        //     console.log("Blog author:", blogExists.author)
        //     console.log("Author matches user?", blogExists.author.toString() === userId)
        // }
       
        const blogStateToUpdate = await blogModel.findOne({_id : blogId , author : userId})
        //  console.log("Found blog:", blogStateToUpdate)


        if(!blogStateToUpdate){
            return res.status(404).json({
                message : " We can not find any blog or you may not be authorize"
            })
        }

        blogStateToUpdate.state = "published"
        await blogStateToUpdate.save();
        res.status(200).json({
            message: "Your blog has been published successfully",
            blog: blogStateToUpdate
        });

     } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "there was a server error trying to publish your blog",
            error : error.message
        })
     }
}

module.exports = {
    updateBlogState
}