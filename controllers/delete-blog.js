const blogModel = require("../models/blog-article")

async function deleteBlog(req , res) {
    const blogId = req.params.id;
    const userId = req.user.userId

    try {

        const blogToDelete = await blogModel.findOne({_id :blogId , author : userId})
         if(!blogToDelete){
            return res.status(404).json({
                message : " We can not find any blog or you may not be authorize to delete"
            })
        }

        await blogModel.findByIdAndDelete(blogId);
        
        res.status(200).json({
            message: "You have successfully deleted your blog",
            blogDeleted: blogToDelete
        });
        console.log(`You have successfully deleted your blog`)
        console.log(`Delete route and function is working`)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "there was a server error trying to delete your blog",
            error : error.message
        })
    }
}

module.exports = {
    deleteBlog
}