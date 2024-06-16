import  usersRoute  from "./routes/users.routes.js";
import productsRoute  from "./routes/products.routes.js";
import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRoute)
app.use(productsRoute)
app.listen(3000);
console.log('Server running on 300');