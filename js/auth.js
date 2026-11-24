const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

let selectedPhoto = "";

// Profile Photo Preview
const photoInput = document.getElementById("profilePhoto");

if (photoInput) {
    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        // Photo is optional
        if (!file) {
            selectedPhoto = "";
            return;
        }

        // Validate image type
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            this.value = "";
            selectedPhoto = "";
            return;
        }

        // Validate image size
        if (file.size > 1024 * 1024) {
            alert("Please select an image smaller than 1 MB.");
            this.value = "";
            selectedPhoto = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {

            selectedPhoto = reader.result;

            const preview = document.getElementById("photoPreview");

            if (preview) {
                preview.src = selectedPhoto;
                preview.hidden = false;
            }
        };

        reader.readAsDataURL(file);
    });
}


// Registration
if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim().toLowerCase();

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("authMessage");


        // Password Match Validation
        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }


        // Password Length Validation
        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            return;
        }


        // Get Existing Users
        const users = JSON.parse(localStorage.getItem("users")) || [];


        // Check Duplicate Email
        const existingUser = users.find(
            user => user.email.toLowerCase() === email
        );

        // if (existingUser) {
        //     message.textContent = "This email is already registered.";
        //     return;
        // }


        // Create New User
        const user = {
            name: name,
            email: email,
            password: password,
            photo: selectedPhoto
        };


        // Save User
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));


        // Initialize User Specific Data
        localStorage.setItem(
            "examHistory_" + email,
            JSON.stringify([])
        );

        localStorage.setItem(
            "recommendedLevel_" + email,
            "Easy"
        );


        message.textContent = "Registration successful! Redirecting...";


        // Redirect to Login
        setTimeout(function () {
            window.location.href = "login.html";
        }, 1200);

    });
}


// Login
if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();

        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("authMessage");


        // Get Users
        const users = JSON.parse(localStorage.getItem("users")) || [];


        // Verify Login
        const user = users.find(
            item =>
                item.email.toLowerCase() === email &&
                item.password === password
        );


        if (!user) {
            message.textContent = "Invalid email or password.";
            return;
        }


        // Set Current User
        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        // Ensure User Data Exists
        const historyKey = "examHistory_" + email;

        if (!localStorage.getItem(historyKey)) {
            localStorage.setItem(historyKey, JSON.stringify([]));
        }

        const levelKey = "recommendedLevel_" + email;

        if (!localStorage.getItem(levelKey)) {
            localStorage.setItem(levelKey, "Easy");
        }


        // Redirect to Dashboard
        window.location.href = "dashboard.html";

    });
}