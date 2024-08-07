const express = require('express');

const app = express();

const path = require("path");

const bcrypt = require('bcrypt');

var http = require('http'); 

//Importing The Schema
const registerdata = require('./models/register_Schema.js');
const logindata = require('./models/login_Schema.js');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//MongoDB Database Connection

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://devivaraprasad:dsp9391@cluster0.syjej.mongodb.net/myproject?retryWrites=true&w=majority&appName=Cluster0',)
.then(()=>{
    console.log("Successfully Connected to MongoDB Database.");
}).catch((e)=>{
    console.log("Not Connected To MongoDB Database.");
})

const Connection = mongoose.connection;

const cookiParser = require("cookie-parser");
const sessions = require('express-session');

app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'style.css')));
app.use(express.static(path.join(__dirname, 'pages')));

app.use(sessions({
    cookieName : "sessions",
    secret : "peednasnamhskalramuk99919",
    saveUninitialized : true,
    resave : false
}));

var session;

// app.get('/',function(req,res){
//     session=req.session;
//     if(session.user){
//         res.sendFile(__dirname + "/pages/home.html")
//     }
//     else{
//         res.sendFile(__dirname + "/pages/login.html")
//     }
// })

app.get('/',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname+"/home.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});

app.get('/signup',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/login.html");
    }
    else{
        res.sendFile(__dirname + "/pages/register.html");
    }
});
app.get('/login',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/home.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});


app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/login")
});

app.get('/about',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/about.html")
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
    
});


app.get('/contact',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/contact.html")
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
    
});

app.get('/virtualbox',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/virtualbox_setup.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }

});

app.get('/docker',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname +"/pages/docker.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});

app.get('/putty',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/putty.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});

app.get('/aws',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname +"/pages/Aws_account.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});

app.get('/linux',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/linux_commands.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});

app.get('/basics',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname +"/pages/basics.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});

app.get('/about',function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/about.html");
    }
    else{
        res.sendFile(__dirname + "/pages/login.html");
    }
});


// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/home.html")
// });

// app.get('/virtualbox',function(req,res){
//     res.sendFile(__dirname + "/pages/virtualbox_setup.html")
// });

// app.get('/docker',function(req,res){
//     res.sendFile(__dirname + "/pages/docker.html")
// });

// app.get('/putty',function(req,res){
//     res.sendFile(__dirname + "/pages/putty.html")
// });

// app.get('/aws',function(req,res){
//     res.sendFile(__dirname + "/pages/Aws_account.html")
// });

// app.get('/linux',function(req,res){
//     res.sendFile(__dirname + "/pages/linux_commands.html")
// });

// app.get('/basics',function(req,res){
//     res.sendFile(__dirname + "/pages/basics.html")
// });

// app.get('/login',function(req,res){
//     res.sendFile(__dirname + "/pages/login.html")
// });

// app.get('/signup',function(req,res){
//     res.sendFile(__dirname + "/pages/register.html")
// });

// app.get('/about',function(req,res){
//     res.sendFile(__dirname + "/pages/about.html")
// });

// app.get('/contact',function(req,res){
//     res.sendFile(__dirname + "/pages/contact.html")
// });







// app.post("/sendDatas",function(req,res){
//     console.log(req.body);
//     var obj = new registerdata({
//         UserName:req.body.User_Name,
//         email:req.body.Email,
//         password:req.body.Password,
//     })
//     registerdata.findOne({$or:[{email:req.body.Email},{password:req.body.Password}]},function(err,docs){
//         if(err ||docs==null){
//             console.log(err)
//             obj.save(function(err,results){
//                 if(results){
//                     console.log("results"+results);
//                     res.send(results);
//                 }
//                 else{
//                     console.log(err)
//                     res.send(err);
//                 }

//             })
//         }
//         else{
//             res.sendStatus(500);
//         }
//     })
// });

app.post('/login',function(req,res){
    session=req.session;
    console.log(req.body);

    registerdata.findOne({email:req.body.email, password:req.body.password},function(err,docs){
        if(err||docs==null){
            // res.sendStatus(500)
            res.redirect('/pages/server.html')
        }
        else{
            session.user=docs;
            // return res.send(docs);
           return  res.redirect('/virtualbox');
           
        
        }
        // window.location.href='/virtualbox';
    })
});







app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password,
        email:req.body.email
    }

    // Check if the username already exists in the database
    const existingUser = await registerdata.findOne({ email: req.body.email });

    if (existingUser) {
        res.redirect('/');
    } else {
        // Hash the password using bcrypt
        // const saltRounds = 10; // Number of salt rounds for bcrypt
        // const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        // data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await registerdata.insertMany(data);
        console.log(userdata);
        return res.redirect("/login")
    }

});




// Login user 
// app.post("/login", async (req, res) => {
//     try {
//         const check = await logindata.findOne({ email: req.body.email });
//         if (!check) {
//             res.send("User email cannot found")
//         }
//         // Compare the hashed password from the database with the plaintext password
//         const isEmailMatch = await logindata.findOne(req.body.email, check.email);
//         if (!isEmailMatch) {
//            return res.send("wrong Email");
//         }
//         else {
//            return res.redirect("home");
//         }
//     }
//     catch {
//        return res.send("wrong Details");
//        return res.redirect("/login")
//     }
// });




app.listen(4000,()=>console.log("successfully Server Started"))