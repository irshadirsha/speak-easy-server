const express = require('express');
const userRoutes = require('./router/UserRouter');
const Db= require ('./config/connection')
const app = express();
const cors = require ('cors')
const PORT = process.env.PORT || 5000;
Db()
app.use(express.json());
app.use(cors())
app.use('/api/users', userRoutes);

app.get('/',(req,res)=>{
    res.send("speak easy server working..")
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});