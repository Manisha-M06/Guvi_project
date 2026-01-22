$(document).ready(function() {
    $("#registerBtn").click(function() {
        let email = $("#email").val();
        let password = $("#password").val();
        let msgDiv = $("#msg");

        msgDiv.text("");

        if(!email || !password) {
            msgDiv.html("<span class='text-danger'>Please fill all fields!</span>");
            return;
        }

        // --- Custom Email Validation ---
        // Alphabet start, middle chars allowed, must end with @gmail.com
        let emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@gmail\.com$/;
        if (!emailRegex.test(email)) {
            msgDiv.html("<span class='text-danger'>Email must start with an alphabet and end with @gmail.com</span>");
            return;
        }

        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            msgDiv.html("<span class='text-danger'>Password needs 8+ chars, Uppercase, Lowercase, Number & Symbol.</span>");
            return;
        }

        // Firebase Auth Connectivity [cite: 2026-01-15]
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Registration Successful!");
                // Success Notification logic can be added here [cite: 2026-01-15]
                window.location.href = "login.html";
            })
            .catch((error) => {
                msgDiv.html("<span class='text-danger'>" + error.message + "</span>");
            });
    });
});