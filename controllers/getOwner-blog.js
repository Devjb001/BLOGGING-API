const blogModel = require("../models/blog-article")

async function getMyBlogs(req , res) {
    const userId = req.user.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const state = req.query.state; 
    const skip = (page -1) * limit
    console.log("User ID:", userId)
    console.log("Page:", page)
    console.log("Limit:", limit)
    console.log("State filter:", state)

    try {
        const query = {author : userId}

        if(state && ['draft' , 'published'].includes(state)){
            query.state = state;
        }
        console.log("Query:", query)

        const totalBlogs = await blogModel.countDocuments(query)
        const blogs = await blogModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalPages = Math.ceil(totalBlogs / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            message: "This are the blogs retrieved successfully",
            data: {
                blogs: blogs,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalBlogs: totalBlogs,
                    blogsPerPage: limit,
                    hasNextPage: hasNextPage,
                    hasPrevPage: hasPrevPage
                }
            }
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "There was a server error retrieving your blogs",
            error: error.message
        })
    }
}

module.exports = {
    getMyBlogs
}