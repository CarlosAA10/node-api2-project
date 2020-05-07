// nothing yet
const express = require('express');

const dBase = require('./data/db');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query, 'the query outside')
    dBase.find(req.query)
        .then(posts => {
            console.log(req.query, 'the query inside')
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    dBase.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post)
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;

    dBase.findById(id)
        .then(posts => {
            const findPost = posts.find(post => post.id == id);
            if (!findPost) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                dBase.findPostComments(id)
                    .then(comments => {
                        res.status(200).json(comments);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ error: "The comments information could not be retrieved." })
                    })
            }
        })
        .catch(error => {
            console.log(error);
        })

})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        dBase.insert(req.body)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const newComment = req.body; 

    if (id !== newComment.post_id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

    else {
        dBase.insertComment(newComment)
        .then(posts => {
            // const findPost = posts.find(post => post.id == id);


         
                if (!newComment.text) {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." })
                }
                else {
                    // dBase.insertComment(req.body)
                    // .then(comment => {
                    //     res.status(201).json(comment); 
                    // })
                    

                    res.status(201).json(posts);
                }
        })

        .catch(error => {
            console.log(error);
            console.log(newComment, 'The comment that failed')
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }


})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    dBase.findById(id)
        .then(posts => {
            const findPost = posts.find(post => post.id == id);

            if (!findPost) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                dBase.remove(id)
                    .then(delPost => {
                        res.json(delPost);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ error: "The post could not be removed" })
                    })
            }
        })
        .catch(error => {
            console.log(error);
        })
})

router.put('/:id', (req,res) => {
    const id = req.params.id; 

    dBase.findById(id)
    .then(posts => {
        const findPost = posts.find(post => post.id == id);

        if(!findPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist."  })
        }
        else {
            if (!req.body.title || !req.body.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }

            else {
                dBase.update(id, req.body) 
                .then(update => {
                    res.status(200).json(update); 
                })
                .catch(error => {
                    console.log(error); 
                    res.status(500).json({ error: "The post information could not be modified." })
                })
            }
        }
    })
    .catch(error => {
        console.log(error); 
    })
})



// router.get('/:id/comments', (req, res) => {
//     const id = req.params.id; 

//     dBase.findPostComments(id)
//     .then(comments => {
//         if(id) {
//             // console.log(res,'the post id')
//             // console.log(dBase.findById(id), 'the database id')
//             res.status(200).json(comments); 
//         }
//         else {
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         }
//     })
//     .catch(error => {
//         console.log(error); 
//         res.status(500).json({ error: "The comments information could not be retrieved." })
//     })
// })

// router.post('/', (req,res) => {
//     dBase.insert(req.body)
//     .then(post => {
//         if(!req.body.title || !req.body.contents) {
//             res.status(400).json({ errorMessage: "Please provide title and contents for the post." }); 
//         }
//         else {
//             res.status(201).json(post); 
//         }
//     })
//     .catch(error => {
//         console.log(error); 
//         res.status(500).json({ error: "There was an error while saving the post to the database" })
//     })
// })

// router.post('/:id/comments', (req,res) => {
//     const id = req.params.id; 
//     dBase.findById(id)
//     .then(post => {

//     })
//     dBase.insertComment(req.body) 
//     .then(comment => {

//     })
//     .catch(error => {
//         console.log(error); 
//         res.status(500).json({ error: "There was an error while saving the comment to the database" })
//     })
// })

// router.delete('/:id', (req,res) => {
//     const id = req.params.id; 

//     dBase.remove(id)
//     .then(delPost => {
//         if(!id) {
//             res.status(404).json({ message: "The post with the specified ID does not exist." });
//         }
//         else {
//             res.status(200).json(delPost); 
//         }
//     })
//     .catch(error => {
//         console.log(error); 
//         res.status(500).json({ error: "The post could not be removed" })
//     })

// })

// router.put('/:id', (req,res) => {

// })

module.exports = router; 