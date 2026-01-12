$(document).ready(function() {
    let email = localStorage.getItem("userEmail");
    let base64Image = ""; 

    // 1. Login Check: User login pannala na login page-ku poidum
    if(!email) {
        window.location.href = "login.html";
        return;
    }

    $("#user_email_display").text(email);

    // 2. Firebase key-la '.' allow illa, so replacement
    let dbKey = email.replace(/\./g, ','); 

    // 3. Step 1: Firebase-la irundhu existing data-vai edukka (Fetch)
    database.ref('profiles/' + dbKey).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            $("#age").val(data.age);
            $("#dob").val(data.dob);
            $("#contact").val(data.contact);
            
            if(data.image) {
                $("#preview").attr("src", data.image);
                base64Image = data.image;
            }
        }
    }).catch((error) => {
        console.error("Error fetching data: ", error);
    });

    // 4. Step 2: Image-ai select panna preview kaatta
    $("#imageInput").change(function() {
        let file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                base64Image = e.target.result; 
                $("#preview").attr("src", base64Image);
            };
            reader.readAsDataURL(file);
        }
    });

    // 5. Step 3: Update Button Click - Firebase Realtime Database-la store panna
    $("#updateBtn").click(function() {
        let profileData = {
            age: $("#age").val(),
            dob: $("#dob").val(),
            contact: $("#contact").val(),
            image: base64Image 
        };

        // Realtime Database-la 'profiles' node-kulla save aagum
        database.ref('profiles/' + dbKey).set(profileData)
            .then(() => {
                alert("Profile Updated in Firebase Realtime Database!");
            })
            .catch((error) => {
                alert("Error updating profile: " + error.message);
            });
    });

    // 6. Redirect to View Profile Page
    $("#viewProfileBtn").click(function() {
        window.location.href = "display.html"; 
    });
});

// 7. Logout Function
function logout() {
    auth.signOut().then(() => {
        localStorage.removeItem("userEmail");
        window.location.href = "login.html";
    }).catch((error) => {
        alert("Logout Error: " + error.message);
    });
}