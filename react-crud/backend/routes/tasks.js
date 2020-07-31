const router = require('express').Router();

let Task = require('../model/task');

router.route('/').get((req, res) =>{
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newTask = new Task({
        username,
        description,
        duration,
        date,
    });

    newTask.save()
    .then(() => res.json('Task is added'))
    .catch(err => res.status(400).json('Error: ' + err));


});

router.route('/:id').get((req, res) =>{
    Task.findById(req.params.id)
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error :' + err));
});

router.route('/:id').delete((req, res) =>{
    Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted successfuly'))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) =>{
    Task.findById(req.params.id).then(task =>{
       task.username = req.body.username;
       task.description = req.body.description;
       task.duration = req.body.duration;
       task.date = req.body.date;

       task.save()
       .then(() => res.json('Task Updated successfuly'))
       .catch(err=>res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
