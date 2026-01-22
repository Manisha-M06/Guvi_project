// assests/js/profile.js

let base64Image = ""; 

// Intha functions-ai window-la add panna dhaan HTML buttons-ku thieriyum
window.viewProfile = function() {
    console.log("Navigating to display.html");
    window.location.href = "display.html"; 
};

window.logout = function() {
    auth.signOut().then(() => {
        localStorage.removeItem("userEmail");
        window.location.href = "login.html";
    });
};

window.updateProfile = function() {
    let email = localStorage.getItem("userEmail");
    if(!email) return;
    
    let dbKey = email.replace(/\./g, ','); 

    let profileData = {
        age: $("#age").val(),
        dob: $("#dob").val(),
        contact: $("#contact").val(),
        image: base64Image 
    };

    database.ref('profiles/' + dbKey).set(profileData)
        .then(() => alert("Profile Updated!"))
        .catch((e) => alert("Error: " + e.message));
};

$(document).ready(function() {
    let email = localStorage.getItem("userEmail");

    if(!email) {
        window.location.href = "login.html";
        return;
    }

    $("#user_email").text(email);
    let dbKey = email.replace(/\./g, ','); 

    // Fetch existing data
    database.ref('profiles/' + dbKey).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            $("#age").val(data.age);
            $("#dob").val(data.dob);
            $("#contact").val(data.contact);
            if(data.image) {
                $("#preview_img").attr("src", data.image);
                base64Image = data.image;
            }
        }
    });

    // Image logic
    $("#imageInput").change(function() {
        let file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                base64Image = e.target.result; 
                $("#preview_img").attr("src", base64Image);
            };
            reader.readAsDataURL(file);
        }
    });
});