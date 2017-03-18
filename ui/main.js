console.log('Loaded!');

var button = document.getElementById("counter");
button.onclick = function() {
    console.log("I am clicked!")
    
    // Create a request to the 'counter' endpoint
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable !
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take some action ...
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.InnerHTML = counter.toString();
            }
        }
        // Not done yet
    };
    
    // Make the request ...
    request.open('GET', 'http://debo0611.imad.hasura-app.io/counter', true);
    request.send(null);

};