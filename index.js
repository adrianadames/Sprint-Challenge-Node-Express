const express = require('express');
const server = express();
server.use(express.json());

let dbAction = require('./data/helpers/actionModel');
let dbProject = require('./data/helpers/projectModel');


// ============ ACTIONS ============ //

server.get('/api/actions', (req, res) => {
    dbAction.get()
        .then(actions => {
            return res.send(actions);
        })
        .catch(actions => {
            return (res.status(500).json({error: "Error getting actions in database."}));
        })
})








server.listen(8000, () => console.log('API running on port 8000'));