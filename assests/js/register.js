$(document).ready(function() {
    $("#registerBtn").click(function() {
        let email = $("#email").val();
        let password = $("#password").val();
        let errorDiv = $("#passwordError");
        let msgDiv = $("#msg");

        errorDiv.hide().text("");
        msgDiv.text("");

        if(!email || !password) {
            msgDiv.html("<span class='text-danger'>Please fill all fields!</span>");
            return;
        }

        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            errorDiv.text("Needs 8+ chars, Uppercase, Lowercase, Number & Symbol.").show();
            return;
        }

        // Firebase logic replacing AJAX
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Registration Successful in Firebase!");
                window.location.href = "login.html";
            })
            .catch((error) => {
                msgDiv.html("<span class='text-danger'>" + error.message + "</span>");
            });
    });
});