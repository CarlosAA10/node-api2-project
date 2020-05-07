const express = require('express'); 

const dBaseRouter = require('./express-router'); 

const server = express(); 

server.use(express.json()); 

server.get('/', (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers }); 

})

server.use("/api/posts", dBaseRouter); 

server.listen(8000, () => {
    console.log('\n*** Server is running on http://localhost:8000 ***\n'); 
}); 

