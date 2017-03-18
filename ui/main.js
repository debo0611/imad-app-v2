console.log('Loaded!');

var button = document.getElementById("counter");
button.onclick = function() {
    console.log("I am clicked!")
    
    // Create a request to the 'counter' endpoint
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable !
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            console.log("first if...");
            // Take some action ...
            if (request.status === 200) {
                console.log("second if");
                var counter = request.responseText;
                console.log(counter);
                var span = document.getElementById("count");
                console.log(span);
                span.innerHTML = counter.toString();
            }
        }
        // Not done yet
    };
    
    // Make the request ...
    request.open('GET', 'http://debo0611.imad.hasura-app.io/counter', true);
    request.send(null);

};