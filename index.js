const express = require('express');
const server = express();
server.use(express.json());

let dbAction = require('./data/helpers/actionModel');
let dbProject = require('./data/helpers/projectModel');


// ============ ACTIONS ============ //

// get(): calling get returns an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.

server.get('/api/actions', (req, res) => {
    dbAction.get()
        .then(actions => {
            return res.send(actions);
        })
        .catch(actions => {
            return (res.status(500).json({error: "Error getting actions in database."}));
        })
})

server.get('/api/actions/:id', (req, res) => {
    const {id} = req.params;
    dbAction.get(id)
        .then(actions => {
            return res.send(actions);
        })
        .catch(actions => {
            return (res.status(500).json({error: "Error getting action in database."}));
        })
})


// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.

server.post('/api/actions', (req, res) => {
    const {project_id, description, notes, completed} = req.body;
    dbAction.insert({project_id, description, notes, completed})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving new action to the database."})
        })
})


// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.

server.put('/api/actions/:id', (req,res) => {
    const {id} = req.params;
    const {project_id, description, notes, completed} = req.body;
    dbAction.update(id, {project_id, description, notes, completed})
        .then(response => {
            if (response === null) {
                return res.status(404).json({error: "Action with specified ID doesn't exist."})
            }
            else return res.json(response);
        })
        .catch(response => {
            return res.status(500).json({error: "There was an error while updating specified action."})
        })
})

//remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

server.delete('/api/actions/:id', (req,res) => {
    const {id} = req.params;
    dbAction.remove(id)
        .then(response => {
            if (response === 0) {
                return res.status(404).json({error: "Action with that ID does not exist."})
            }
            else return res.json({success: `Action with id: ${id} removed from actions database.`})
        })
        .catch(response => {
            res.status(500).json({error: "The action could not be removed."})
        })
})




// ============ PROJECTS ============ //

// get(): calling get returns an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.

server.get('/api/projects', (req, res) => {
    dbProject.get()
        .then(projects => {
            return res.send(projects);
        })
        .catch(projects => {
            return (res.status(500).json({error: "Error getting projects in database."}));
        })
})

server.get('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    dbProject.get(id)
        .then(projects => {
            return res.send(projects);
        })
        .catch(projects => {
            return (res.status(500).json({error: "Error getting action in database."}));
        })
})


// getProjectActions():The projectModel.js helper includes an extra method called getProjectActions() that takes a project id as it's only argument and returns a list of all the actions for the project.

server.get('/api/projectactions/:projectId', (req,res) => {
    const {project_id} = req.params;
    dbProject.getProjectActions(project_id)
        .then(projectActions => {
            if (projectActions === 0) {
                return res.status(404).json({error: "No project with that ID."});
            }
            else return res.send(projectActions)
        })
        .catch(error => {
            res.status(500).json({error: "Error while retrieving project actions."})
        })
})


// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.

server.post('/api/projects', (req, res) => {
    const {name, description, completed} = req.body;
    dbProject.insert({name, description, completed})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving new project to the database."})
        })
})


// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.

server.put('/api/projects/:id', (req,res) => {
    const {id} = req.params;
    const {name, description, completed} = req.body;
    dbProject.update(id, {name, description, completed})
        .then(response => {
            if (response === null) {
                return res.status(404).json({error: "Project with specified ID doesn't exist."})
            }
            else return res.json(response);
        })
        .catch(response => {
            return res.status(500).json({error: "There was an error while updating specified project."})
        })
})

//remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

server.delete('/api/projects/:id', (req,res) => {
    const {id} = req.params;
    dbProject.remove(id)
        .then(response => {
            if (response === 0) {
                return res.status(404).json({error: "Project with that ID does not exist."})
            }
            else return res.json({success: `Project with id: ${id} removed from actions database.`})
        })
        .catch(response => {
            res.status(500).json({error: "The project could not be removed."})
        })
})




server.listen(8000, () => console.log('API running on port 8000'));