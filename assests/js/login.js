function submitLogin() {
    let email = $("#login_email").val();
    let password = $("#login_password").val();
    let msgDiv = $("#msg");

    if (!email || !password) {
        msgDiv.text("Please fill in all fields.").addClass("text-danger");
        return;
    }

    // Consistency check: Same email validation as register
    let emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@gmail\.com$/;
    if (!emailRegex.test(email)) {
        msgDiv.text("Invalid format. Must start with alphabet and end with @gmail.com").addClass("text-danger");
        return;
    }

    msgDiv.text("Verifying...").removeClass("text-danger").addClass("text-primary");

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            localStorage.setItem("userEmail", email);
            // Redirect to Student Dashboard [cite: 2026-01-15]
            window.location.href = "profile.html"; 
        })
        .catch((error) => {
            msgDiv.text("Error: " + error.message).removeClass("text-primary").addClass("text-danger");
        });
}