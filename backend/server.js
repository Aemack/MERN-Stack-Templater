const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const contentRoutes = express.Router();
const PORT = process.env.PORT || 4000;

const accessKey = "sgdmdk647ftjh876gjhg76f7t"

const HeaderContent = require('./models/headerContent.model');
const FooterContent = require('./models/footerContent.model');
const HomeContent = require('./models/homeContent.model');
const BlogPost = require('./models/blogPost.model');
const AboutContent = require('./models/aboutContent.models');

const UserCredentials = require('./models/userCredentials.model')

app.use(cors());

app.use(bodyParser.json());

const connectAddress = 'mongodb+srv://adam:Scalped12@template.nqmdl.mongodb.net/template?retryWrites=true&w=majority'

mongoose.connect(connectAddress, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully")
})

//User Credentials routes
contentRoutes.route('/credentials').get(function(req, res) {
    UserCredentials.find(function(err, block){
        if (err) {
            console.log(err)
        } else {
            res.json(block)
        }
    })

})

contentRoutes.route('/credentials/add').post(function(req, res) {
    let content = new UserCredentials(req.body);
    content.save()
        .then(content => {
            res.status(200).json({'content':'user added succesfully'})
        })
        .catch(err => {
            res.status(400).send('adding content failed')
        })
})

contentRoutes.route('/credentials/validate/:username/:password').post(function(req, res){
    console.log(req.params.username, req.params.password)

    UserCredentials.find({username:req.params.username, password:req.params.password}, (err, verified)=>{
        if (verified.length > 0){
            res.status(200).json({'login':verified, 'accessKey':accessKey}) 
        } else {
            res.status(200).json({'login':"", 'accessKey':""})
        }
    })
    .catch(err => {
        res.status(400).send('Incorrect Details')
    })
});



//Home Routes
contentRoutes.route('/home').get(function(req, res) {
    HomeContent.find(function(err, block){
        if (err) {
            console.log(err)
        } else {
            res.json(block)
        }
    })

})

contentRoutes.route('/home/add').post(function(req, res) {
    console.log(req.body)
    if (req.body.ak !== accessKey){
        res.send(400).send("Incorrect Access Key")
        return;
    }
    let content = new HomeContent(req.body.homeContent);
    content.save()
        .then(content => {
            res.status(200).json({'content':'content added succesfully'})
        })
        .catch(err => {
            res.status(400).send('adding content failed')
        })
})

contentRoutes.route('/home/update/').post(function(req, res) {
    if (req.body.ak !== accessKey){
        res.send(400).send("Incorrect Access Key")
        return;
    }
    HomeContent.findById('5fc87c89f454ec4a7cb93d61', function(err, homeContent) {
        if (!homeContent)
            res.status(404).send("data is not found");
        else
        homeContent.about = req.body.homeContent.about;
        homeContent.photogridContent = req.body.homeContent.photogridContent;

            homeContent.save().then(content => {
                res.json('Content updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});





// About Routes
contentRoutes.route('/about').get(function(req, res) {
    AboutContent.find(function(err, block){
        if (err) {
            console.log(err)
        } else {
            res.json(block)
        }
    })

})

contentRoutes.route('/about/add').post(function(req, res) {
    if (req.body.ak !== accessKey){
        res.send(400).send("Incorrect Access Key")
        return;
    }
    let content = new AboutContent(req.body.aboutContent);
    content.save()
        .then(content => {
            res.status(200).json({'content':'content added succesfully'})
        })
        .catch(err => {
            res.status(400).send('adding content failed')
        })
})

contentRoutes.route('/about/update/').post(function(req, res) {
    if (req.body.ak !== accessKey){
        res.send(400).send("Incorrect Access Key")
        return;
    }
    AboutContent.findById('5fc87f06e8fc0b42040a2cde', function(err, aboutContent) {
        if (!aboutContent)
            res.status(404).send("data is not found");
        else
        console.log(req.body)
        
        aboutContent.aboutContent = req.body.aboutContent.aboutContent;
        aboutContent.image = req.body.aboutContent.image;
        
            aboutContent.save().then(content => {
                res.json('Content updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


// Footer Routes
contentRoutes.route('/footer').get(function(req, res) {
    FooterContent.find(function(err, block){
        if (err) {
            console.log(err)
        } else {
            res.json(block)
        }
    })

})

contentRoutes.route('/footer/add').post(function(req, res) {
    if (req.body.ak !== accessKey){
        res.send(400).send("Incorrect Access Key")
        return;
    }
    let content = new FooterContent(req.body.footerContent);
    content.save()
        .then(content => {
            res.status(200).json({'content':'content added succesfully'})
        })
        .catch(err => {
            res.status(400).send('adding content failed')
        })
})

contentRoutes.route('/footer/update/').post(function(req, res) {
    FooterContent.findById('5fc87d95c7809930d85472ae', function(err, footerContent) {
        if (!footerContent)
            res.status(404).send("data is not found");
        else
        
        footerContent.email = req.body.footerContent.email;
        footerContent.phone = req.body.footerContent.phone;
        footerContent.website = req.body.footerContent.website;
        footerContent.address = req.body.footerContent.address;
        
            footerContent.save().then(content => {
                res.json('Content updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


// Header Routes
contentRoutes.route('/header').get(function(req, res) {
    HeaderContent.find(function(err, block){
        if (err) {
            console.log(err)
        } else {
            res.json(block)
        }
    })

})

contentRoutes.route('/header/add').post(function(req, res) {
    if (req.body.ak !== accessKey){
        res.send(400).send("Incorrect Access Key")
        return;
    }
    let content = new HeaderContent(req.body.headerContent);
    content.save()
        .then(content => {
            res.status(200).json({'content':'content added succesfully'})
        })
        .catch(err => {
            res.status(400).send('adding content failed')
        })
})

contentRoutes.route('/header/update/').post(function(req, res) {
    if (req.body.ak !== accessKey){
        res.send(400).send("Incorrect Access Key")
        return;
    }
    HeaderContent.findById('5fc87e33c47e96445c3caae3', function(err, headerContent) {
        if (!headerContent)
            res.status(404).send("data is not found");
        else
        
        headerContent.name = req.body.headerContent.name;
        headerContent.tagline = req.body.headerContent.tagline;
        headerContent.logo = req.body.headerContent.logo;
        
            headerContent.save().then(content => {
                res.json('Content updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});




// Blog Post Routes
contentRoutes.route('/blog').get(function(req, res) {
    BlogPost.find(function(err, block){
        if (err) {
            console.log(err)
        } else {
            res.json(block)
        }
    })

})

contentRoutes.route('/blog/:id').get(function(req, res) {
    BlogPost.findById(req.params.id,function(err, block){
        if (err) {
            console.log(err)
        } else {
            res.json(block)
        }
    })

})

contentRoutes.route('/blog/add').post(function(req, res) {
    if (req.body.ak !== accessKey){
        res.sendStatus(400).send("Incorrect Access Key")
        return;
    }
    let content = new BlogPost(req.body.blogPostContent);
    content.save()
        .then(content => {
            res.status(200).json({'content':'content added succesfully'})
        })
        .catch(err => {
            res.status(400).send('adding content failed')
        })
})

contentRoutes.route('/blog/update/:id').post(function(req, res) {
    console.log(req.body)
    if (req.body.ak !== accessKey){
        res.sendStatus(404).send("Incorrect Access Key")
        return;
    }
    console.log(req.params.id)
    BlogPost.findById(req.params.id, function(err, blogPost) {
        if (!blogPost)
            res.status(404).send("Post is not found");
        else
        console.log(req.body)
        blogPost.author = req.body.blogPostContent.author;
        blogPost.title = req.body.blogPostContent.title;
        blogPost.date = req.body.blogPostContent.date;
        blogPost.content = req.body.blogPostContent.content;
        blogPost.image = req.body.blogPostContent.image;
        
            blogPost.save().then(content => {
                res.json('Post updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});




app.use('/content', contentRoutes);

app.listen(PORT, function() {
    console.log("Server is running on PORT "+ PORT);
})