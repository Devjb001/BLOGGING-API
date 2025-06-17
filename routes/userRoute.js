
const { userSingUp } = require("../controllers/user-signUp");
const { userLogin } = require("../controllers/user-login");
const { createNewBlog } = require("../controllers/create-blog");
const { getPublicBlogs } = require("../controllers/get-blogs");
const { updateBlogState } = require("../controllers/update-state");
const { updateBlog } = require("../controllers/update-blog");
const { deleteBlog } = require("../controllers/delete-blog");
const { getMyBlogs } = require("../controllers/getOwner-blog");
const { getSingleBlog } = require("../controllers/get-Sing-Blog");



const verifyToken = require("../middleware/jwt-middleware")
const express = require("express");
const router = express.Router();


router.post("/signup", userSingUp)
router.post("/login" , userLogin)
router.post("/blogs/create" , verifyToken , createNewBlog)
router.get("/blogs" , getPublicBlogs)
router.put("/blogs/:id/state" , verifyToken , updateBlogState)  
router.put("/blogs/:id/update" , verifyToken , updateBlog)
router.delete("/blogs/:id/delete" , verifyToken , deleteBlog)
router.get("/blogs/my-blogs" , verifyToken , getMyBlogs)
router.get("/blogs/:id" , getSingleBlog)


console.log(router.stack.map(r => r.route && r.route.path));

module.exports = router

