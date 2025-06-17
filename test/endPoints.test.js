const request = require("supertest");
const app = require('../app');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let token;
let blogId;

describe("My ebdpoints", () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }, 30000);

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  }, 30000);

  //  creating a new user account
  it("Should create a new user", async () => {
    const newUser = {
      first_name: "test2",
      last_name: "user2",
      email: "testuser22@gmail.com",
      password: "testuser22"
    };

    const res = await request(app)
      .post("/signup")
      .send(newUser);

    expect(res.statusCode).toBe(201);
  }, 30000);


  // comfirming if user already have an account then throw error, else create the acc
  it("Should throw an error because already exists", async () => {
    const newUser = {
      first_name: "test2",
      last_name: "user2",
      email: "testuser22@gmail.com",
      password: "testuser22"
    };

    const res = await request(app)
      .post("/signup")
      .send(newUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  }, 30000);


  // Loging in user, but will fail because the beelow details does not match the account created
  it("Should return error because user does not exist", async () => {
    const user = {
      email: "tofail@gmail.com",
      password: "tohailed"
    };

    const res = await request(app)
      .post("/login")
      .send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  }, 30000);


  // Logging in user succesfully because it exist(we created the acc at the first operation)
  it("Should log in registered user", async () => {
    const user = {
      email: "testuser22@gmail.com",
      password: "testuser22"
    };

    const res = await request(app).post("/login").send(user);
    token = res.body.token;

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  }, 30000);


  // Creating a new blog since the above code logged you in 
  it("Should create a new blog", async () => {
    const blog = {
      title: "The boy",
      body: "About the boy",
      description: "boy blog",
      tags: ["test", "tag"]
    };

    const res = await request(app)
      .post("/blogs/create")
      .set("Authorization", `Bearer ${token}`)
      .send(blog);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    blogId = res.body.blog._id || res.body._id;
  }, 30000);


  // updating the blog state to published because the blog is automatically on draft, a get blog request would return an empty object, so we published it first
   it ("Should update blog state work" , async () => {

        const updateRespond = await request(app)

        .put(`/blogs/${blogId}/state`)
        .set("Authorization", `Bearer ${token}`)
        .send({ state: "published" });

        expect(updateRespond.statusCode).toBe(200);
        expect(updateRespond.body).toHaveProperty("message");
   })


   
  // updating the blog content to anything
   it ("Should update blog content" , async () => {

        const updateRespond = await request(app)

        .put(`/blogs/${blogId}/update`)
        .set("Authorization", `Bearer ${token}`)
        .send({ "body": "This is an updated body of the blog created previosly" ,
                "title" : "updated title"
        });

        expect(updateRespond.statusCode).toBe(200);
        expect(updateRespond.body).toHaveProperty("message");
   },30000)


  //  Getting all the blogs that has already been publishe, theres just one blog for the sake of this test
   it ("should get and return all published blogs" , async () => {
      const res = await request(app).get("/blogs")

     console.log("Response body:", res.body);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.blogsGotten)).toBe(true)
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("blogsGotten");
      expect(res.body.message).toBe("Blogs gotten success");

    },30000);


    // Getting my own blogs
     it ("should get and return my  blogs" , async () => {

      const res = await request(app)
      .get("/blogs/my-blogs")
      .set("Authorization", `Bearer ${token}`)

     console.log("Blogs:", JSON.stringify(res.body.data.blogs, null, 2));

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message");

    },30000);


 // this will get a single blog with id provided
    it ("Should get a single blog" , async () => {

        const res = await request(app)

        .get(`/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
         console.log("Single blog retrieved:", JSON.stringify(res.body));

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message");
   },30000)


  //  this will delete the blog we create
 it ("Should delete a single blog" , async () => {

        const res = await request(app)

        .delete(`/blogs/${blogId}/delete`)
        .set("Authorization", `Bearer ${token}`)
         console.log("Blog deleted succesful");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message");
   },30000)


});
