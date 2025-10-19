import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './configs/db.js';

const app = express();

await connectDb(); //connecting the database 

//Middlewares 
app.use(cors());
app.use(express.json());

//importing routes 
import adminRouter from '../server/routes/admin.routes.js'
import blogRouter from '../server/routes/blog.routes.js';
import userRouter from '../server/routes/user.routes.js';


//routes
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);
app.use('/api/user',userRouter);




const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server listening at ${PORT}`);
})

export default app
