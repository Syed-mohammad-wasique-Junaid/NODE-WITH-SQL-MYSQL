const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app=express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password : 'Junaid@mysql270'
});


let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};


// //inserting new data
// let q = "insert into user (id,name,email,password) values ?";
// let data =[];   
// for(let i =1 ;i<=100;i++){
//     data.push(getRandomUser()); //100 fake users data
// }


// connection.end();

//home route
app.get("/",(req,res) => {
    let q = "select count(*)  from user";
    try{
        connection.query(q,(err,result) => {
            if (err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs",{count});
        });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
});

//show route
app.get("/user",(req,res) => {
    let q = `select * from user`;
    try{
        connection.query(q,(err,results) => {
            if (err) throw err;
            // console.log(result);
            // res.send(result);
            res.render("showusers.ejs",{results});
        });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
});

//Edit route
app.get("/user/:id/edit",(req,res) => {
    let {id} =  req.params;
    let q = `select * from user where id='${id}'`;
    try{
        connection.query(q,(err,results) => {
            if (err) throw err;
            let user = results[0];
            res.render("edit.ejs",{user});
        });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
});

//update route
app.patch("/user/:id",(req,res) => {
    let {id} =  req.params;
    let {password: formpass, username:newUsername} = req.body;
    let q = `select * from user where id='${id}'`;
    try{
        connection.query(q,(err,results) => {
            if (err) throw err;
            let user = results[0];
            if(formpass != user.password){
                res.send("wrong password");
            }else{
                let q2 = `update user set name = '${newUsername}' where id='${id}'`;
                connection.query(q2,(err,result) => {
                    if (err) throw err;
                    res.redirect("/user");
                });
            }
            
        });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
});

//add route
app.get("/user/add",(req,res) => {
    // let {id:newid,name=username,email:useremail,password:formpass} = req.body;
    res.render("add.ejs");
    // let q = `insert into user values('${newid}','${username}','${useremail}','${formpass}')`;
    // try{
    //     connection.query(q,(err,results) => {
    //         if (err) throw err;
    //         res.redirect("/user");
    //     });
    // }catch(err){
    //     console.log(err);
    //     res.send("some error in database");
    // }
});

app.post("/user/add",(req,res) => {
    let {id:newid,name:username,email:useremail,password:formpass} = req.body;
    let q = `insert into user values('${newid}','${username}','${useremail}','${formpass}')`;
    try{
        connection.query(q,(err,results) => {
            if (err) throw err;
            res.redirect("/user");
        });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
});

//delete route
app.get("/user/:id/delete",(req,res) => {
    let {id} = req.params;
    res.render("delete.ejs",{id});
});


app.delete("/user/:id/delete",(req,res) => {
    let {id} =  req.params;
    let {email: formemail, password:formpass} = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q,(err,result) => {
            if (err) throw err;
            let user = result[0];
            if(formemail != user.email || formpass != user.password){
                res.send("wrong credentials");
            }else{
                let q2 = `delete from user where id='${id}'`;
                connection.query(q2,(err,result)=> {
                    if(err) throw err;
                    res.redirect("/user");
                });
            }
        });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
});

app.listen(port , () => {
    console.log(`server is listening to port : ${port}`)
});
