const blogModel = require("../models/blog-article")

async function getPublicBlogs(req , res) {
     
        try {
            
            const {page = 1, limit = 20, author , title , tags , order_by = "timestamp" , order = "desc"} = req.query

            const query = ({state : "published"})

            if(author) query.author = author;
            if(title) query.title = title;
            if(tags) query.tags = {$in : tags.split(",")};

            const sort = {}
            const sortFields = ["read_count" , "reading_time" ];
            if(sortFields.includes(order_by)) {
                sort[order_by] = order === "asc" ? 1 : -1;
            }

            const blogsGotten = await blogModel.find(query)
            .populate('author' , 'first_name last_name email')
            .sort(sort)
            .limit(parseInt(limit))
            .skip((page -1) * limit)
            

            const totalBlogGotten = await blogModel.countDocuments(query);

            res.status(200).json({
                message : "Blogs gotten success",
                totalBlogGotten,
                page : parseInt(page),
                pageSize : blogsGotten.length,
                blogsGotten
            })
            console.log("pagination blog handler is working")



        } catch (error) {
            res.status(500).json({
                message : " There was an error fetching blogs",
                details :error.message
            });
        }
}


module.exports = {
    getPublicBlogs
}