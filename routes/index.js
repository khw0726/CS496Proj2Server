module.exports = function(app, Pic, Contact, Joongo)
{
    app.get('/api/contacts', function(req, res){
        Contact.find(function(err, list){
            if(err){
                console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!list){
                console.log(err);
                return res.status(500).json({error: 'cannot query'});
            }
            //onsole.log(list);
            res.json(list);
        });
    });
    app.get('/api/contacts/:name', function(req, res){
        Contact.find({"name": req.params.name}, function(err, contact){
            if(err){
                console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!contact){
                console.log(err);
                return res.status(404).json({error: 'no contact'});
            }
            res.json(contact);
        });
    });

    app.post('/api/contacts', function(req, res){

        //var contact = new Contact();
        
        //contact.name = req.body.name;
        //contact.phoneNumber = req.body.phoneNumber;
    
        Contact.insertMany(req.body, function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            
            res.json({result: 1});
        });

    });

    app.get('/api/pics', function(req, res){
        Pic.find({}, {"_id": true, "thumbnail": true}, function(err, list){
            if(err){
                console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!list){
                return res.status(500).json({error: 'cannot query'});
            }
            //console.log(list);
            res.json(list);

        });
    });
    app.get('/api/pics/:id', function(req, res){
        Pic.findOne({_id: req.params.id}, function(err, pic){
            if(err){
		    console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!pic){
                return res.status(404).json({error: 'no such picture'});
            }
            //console.log(pic);
            // var filePath = pic.path;
            // var options = {
            //     root: __dirname + "/../"
            // }
            // res.sendFile(filePath, options, function(err){
            //     if(err){
            //         console.log(err);
            //         res.status(500).json({error: 'failure while sending the file'});
            //     }
            // });
            res.json({"image":pic.image});
        });
    });

    app.post('/api/pics', function(req, res){
        // if(!req.files){
        //     return res.status(400).send('no file uploaded');
        // }
        var pic = new Pic();
        //console.log(req.files);
        //pic.path = req.files.pic.file;
        //pic.name = req.files.pic.filename;
        pic.image = req.body.image
        pic.thumbnail = req.body.thumbnail
        pic.save(function(err){
            if(err){
                console.error(err);
                return res.json({result: 0});
                
            }
            
            res.json({result: pic});
        });

    });

    app.delete('/api/pics/:id', function(req, res){
        Pic.remove({"_id": req.params.id}, function(err){
            if(err){
                console.log(err);
                res.status(500).json({error: 'failure while deleting entry'});
            }
            res.json({result: 1});
        });
    });
    app.get('/api/joongo', function(req, res){
        Joongo.find({}, {"image": false}, function(err, list){
            if(err){
                console.err(err);
                return res.status(500).json({error: 'query failed'});
                
            }
            if(!list){
                return res.status(500).json({error: 'cannot query'});
            }
            res.send(list);
        });
    });
    app.get('/api/joongo/:id', function(req, res){
        Joongo.find({_id: req.params.id}, function(err, joongo){
            if(err){
		        console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!joongo){
                return res.status(404).json({error: 'no such item'});
            }
            res.send(joongo);
        });
    });
    app.post('/api/joongo', function(req, res){
        var joongo = new Joongo();

        joongo.thumbnail = req.body.thumbnail;
        joongo.image = req.body.image;
        joongo.name = req.body.name
        joongo.author = req.body.author;
        joongo.price = req.body.price;
        joongo.isNegotiable = req.body.isNegotiable;
        joongo.isTaekBae = req.body.isTaekBae;
        joongo.isSold = req.body.isSold;
        joongo.description = req.body.description;
        joongo.comments = [];
        joongo.id = req.body.id;
        console.log(joongo);
        joongo.save(function(err){
            if(err){
                console.error(err);
                return res.json({result: 0});
                
            }
            
            res.json({result: joongo._id});
        });
    });

    app.put('/api/joongo/:id', function(req, res){
        Joongo.findOneAndUpdate({_id: req.params.id}, {$push: {comments: {author: req.body.author, content: req.body.content}}}, function(err){
            if(err){
                return res.status(500).send({error: 'database failure'});
            }
            res.json({result: 1});
        });
    });

    app.get('/api/joongo/sold/:id', function(req, res){
        Joongo.findOneAndUpdate({_id: req.params.id}, {$set: {isSold: true}}, function(err, joongo){
            if(err){
                return res.status(500).send({error: 'database failure'});
            }
            console.log(joongo);
            res.json({result: 1});
        });
    });

    
}
