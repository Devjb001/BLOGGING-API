const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(process.env.PORT || 3000, () => {
    console.log(`Sever is listening on http://localhost:${PORT}`)
})