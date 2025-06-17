const blogModel = require("../models/blog-article")

async function getSingleBlog(req, res) {
    
    const blogId = req.params.id

    try {
        const singleBlog = await blogModel.findById(blogId)
        .populate('author' , 'first_name last_name email')

        if(!singleBlog || singleBlog.state !== "published"){
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        await blogModel.findByIdAndUpdate(
            blogId,
            { $inc: { read_count: 1 } }
        );
        
        singleBlog.read_count += 1;

        res.status(200).json({
            message: "Blog retrieved successfully",
            blog: singleBlog
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching blog",
            error: error.message
        });
    }
}

module.exports = {
   getSingleBlog
}