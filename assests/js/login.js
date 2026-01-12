/**
 * Firebase Login Function
 * Intha function login.html-la ulla button click pannum podhu run aagum.
 */
function submitLogin() {
    // 1. User enter panna email matrum password-ai edukkirom
    let email = $("#login_email").val();
    let password = $("#login_password").val();
    let msgDiv = $("#msg");

    // Input validation (Optional but good)
    if (!email || !password) {
        msgDiv.text("Please fill in all fields.").addClass("text-danger");
        return;
    }

    msgDiv.text("Logging in...").removeClass("text-danger").addClass("text-primary");

    // 2. Firebase Auth function-ai use panni login panrom
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // 3. Login success aana alert kaatti, email-ai save panrom
            alert("Login Successful!");
            
            // Profile page-kku thevaiyaana email-ai browser storage-la vaikkirom
            localStorage.setItem("userEmail", email);

            // 4. Automatic-aa profile.html-ku redirect panrom
            window.location.href = "profile.html"; 
        })
        .catch((error) => {
            // 5. Edhavadhu error vandhaal (wrong password etc.) message kaattum
            msgDiv.text("Error: " + error.message).removeClass("text-primary").addClass("text-danger");
            console.error("Login failed:", error.message);
        });
}