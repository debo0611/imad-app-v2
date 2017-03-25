var express = require('express');
var morgan = require('morgan');
var path = require('path');
var http = require('http');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var config = {
    user: 'debo0611',
    database: 'debo0611',
    host: 'db.imad.hasura-app.io', // host where db is hosted
    port: '5432',
    // password: process.env.DB_PASSWORD // use the env var available as DB_PASSWORD
    password: 'db-debo0611-44217'   
};

var app = express();
app.use(morgan('combined'));


function createTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    
                    <h3>
                        ${heading}
                    </h3>
                    
                    <div>
                        ${date.toDateString()}
                    </div>
                    
                    <div>
                        ${content}
                    </div>
                </div>
            </body>
        </html>
        `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input) {
    // how do we create a hash ?
    crypto.pbkdf2Sync(input, salt, 1000, 512, 'sha512');
    // Convert hashed to sth readable and printable in our screen
    return [pbkdf2Sync, 1000, salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string'); 
   res.send(hashedString);
   
   // md5 -- known hashing algo . 
   // password -- always hash to sm val "gju9043gGFF#G%%" every single time this same val if no random string added
   // every single time this value is generated.. good as no way to figure out 
   // common practice ... store table in store which commonly hashed value, they look a table up and 
   // find for what string this "gju903..." is a hash ...
   // To protect ourselves we append a salt value .. this will have some completely different hash vlue
   // if we choose have chosen our salt "string" value randomly enough there is no chance someone has precreated 
   // tables that contain commmonly known string.. So even if user chooses very common strings for password , it connot be reverse engineered!!!
   // further to increase security further we choose to hash 1000 times!!!!
   // so final value will never be available in any lookup value!
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    // make a select request
    // return a response with results
   pool.query('SELECT * FROM test', function(err, result) {
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
   }); 
});



var counter = 0;
app.get('/counter', function(req, res) {
    counter += 1;
    res.send(counter.toString());
});


var names = [];
// app.get('/submit-name/:name', function(req, res) {
app.get('/submit-name', function(req, res) { // /submit-name?name=xxx
    // get the name from the request object
    // var name = req.params.name;
    var name = req.query.name;
    console.log(req.query);
    names.push(name);
    res.send(JSON.stringify(names));
});


// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
// var pool = new Pool(config);
// app.get('/test-db', function() {
   // make a request
   // return a response with the results
//   pool.query('SELECT * FROM test', function(err, result) {
    //   if (err) {
    //       res.status(500).send(err.toString());
    //   } else {
    //       res.send(JSON.stringify(result));
    //   }
        // res.send(JSON.stringify(result));
//   });
   
// });

// SQL Injection follows
// SELECT * FROM articles_db WHERE title = ''; DELETE WHERE a = 'asbf'
// Conversion done by good library ...
// SELECT * FROM articles_db WHERE title = '\'; DELETE WHERE a = \'asbf'
app.get('/articles/:articleName', function(req, res) {
    articleName = req.params.articleName;
    
    // pool.query("SELECT * FROM article_db WHERE title = '" + req.params.articleName + "'", function(err, result) {
    pool.query("SELECT * FROM article_db WHERE title = $1", [req.params.articleName], function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.send(JSON.stringify(req.params));
                // res.status(404).send('Article NOT found!');
            } 
            else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
   
});

// app.get('/article-one', function (req, res) {
//     res.send(createTemplate(articleOne));
//     // res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
// })


// app.get('/article-two', function (req, res) {
//     // res.send('Article two requested and will be served here!');
//     res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
// })


// app.get('/article-three', function (req, res) {
//     // res.send('Article three requested and will be served here!');
//     res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
// })

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
