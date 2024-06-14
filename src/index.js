import  usersRoute  from "./routes/users.routes.js";
import express from 'express';

const app = express();
app.use(usersRoute)
app.listen(3000);
console.log('Server running on 300');