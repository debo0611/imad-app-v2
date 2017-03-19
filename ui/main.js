console.log('Loaded!');

var button = document.getElementById("counter");
button.onclick = function() {
    // console.log("I am clicked!")
    
    // Create a request to the 'counter' endpoint
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable !
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // console.log("first if...");
            // Take some action ...
            if (request.status === 200) {
                // console.log("second if");
                var counter = request.responseText;
                // console.log(counter);
                var span = document.getElementById("count");
                // console.log(span);
                span.innerHTML = counter.toString();
            }
        }
        // Not done yet
    };
    
    // Make the request ...
    request.open('GET', 'http://debo0611.imad.hasura-app.io/counter', true);
    request.send(null);

};

// Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    
    // Create a request to the 'counter' endpoint
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable !
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // console.log("first if...");
            // Take some action ...
            if (request.status === 200) {
                // Make a request to the server and send the name
                // capture a list of names and render it as a list !
                // var names = ['name1', 'name2', 'name3'];
                var names = request.responseText;
                names = JSON.parse(names);
                var list = "";
                for (var i = 0; i < names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                }
                ul = document.getElementById("namelist");
                ul.innerHTML = list;
 
            }
        }
        // Not done yet
    };
    
    // Make the request ...
    request.open('GET', 'http://debo0611.imad.hasura-app.io/submit-name?value=' + name, true);
    request.send(null);

    
    
};