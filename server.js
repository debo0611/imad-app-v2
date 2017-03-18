var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
        title: "Article 1 | Debojyoti",
        heading: "Article 1", 
        date: "Mar 15",
        content:`
                        <p>
                            This is the content of my first Article
                        </p>
                        
                        <p>
                            This is the content of my first Article second paragraph
                        </p>
            
                        <p>
                            This is the content of my first Article third paragraph
                        </p>
                        `
    },

    'article-two' : {
        title: "Article 2 | Debojyoti",
        heading: "Article 2", 
        date: "Mar 16",
        content:`
                        <p>
                            This is the content of my second Article
                        </p>
                        
                        <p>
                            This is the content of my 2nd Article second paragraph
                        </p>
            
                        <p>
                            This is the content of my 2nd Article third paragraph
                        </p>
                        `
    },
    
    'article-three' : {
        title: "Article 3 | Debojyoti",
        heading: "Article 3", 
        date: "Mar 17",
        content:`
                        <p>
                            This is the content of my third Article
                        </p>
                        
                        <p>
                            This is the content of my third Article second paragraph
                        </p>
            
                        <p>
                            This is the content of my third Article third paragraph
                        </p>
                        `
    }
}



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
                        ${date}
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


var counter = 0;
app.get('/counter', function(req, res) {
    counter += 1;
    res.send(counter.toString())
});


var names = [];
app.get('/submit-name/:name', function() {
    // get the name from the request object
    var name = req.params.name;
    names.push(name);
    res.send(JSON.stringify(names));
})


app.get('/:articleName', function(req, res) {
    articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
} );

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
