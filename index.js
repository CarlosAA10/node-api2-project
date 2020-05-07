const express = require('express'); 

const dBaseRouter = require('./express-router'); 

const server = express(); 

server.use(express.json()); 

server.get('/', (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers }); 

})

server.use("/api/posts", dBaseRouter); 

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`); 
}); 

