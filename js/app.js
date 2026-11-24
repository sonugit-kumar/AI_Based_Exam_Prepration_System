// Get Current User
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}


// Check Login
function checkLogin() {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}


// Get User Specific History
function getUserHistory(user) {
    const historyKey = "examHistory_" + user.email;
    return JSON.parse(localStorage.getItem(historyKey)) || [];
}


// Get User Specific Recommended Level
function getRecommendedLevel(user) {
    return localStorage.getItem("recommendedLevel_" + user.email) || "Easy";
}


// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}


// Dashboard
document.addEventListener("DOMContentLoaded", function () {

    const user = getCurrentUser();

    // Dashboard
    if (document.getElementById("studentName")) {

        if (!checkLogin()) return;

        document.getElementById("studentName").textContent = user.name;

        document.getElementById("dashboardPhoto").src =
            user.photo || "https://placehold.co/100x100/31205a/ffffff?text=User";


        // User Wise Exam History
        const history = getUserHistory(user);


        // Total Exams
        document.getElementById("totalExams").textContent = history.length;


        // Average and Best Score
        let average = 0;
        let best = 0;

        if (history.length > 0) {

            const total = history.reduce(
                (sum, exam) => sum + Number(exam.score || 0), 0
            );

            average = Math.round(total / history.length);

            best = Math.max(
                ...history.map(exam => Number(exam.score || 0))
            );
        }

        document.getElementById("averageScore").textContent = average + "%";

        document.getElementById("bestScore").textContent = best + "%";


        // Recommended Level
        document.getElementById("currentLevel").textContent =
            getRecommendedLevel(user);


        // Exam History Table
        const table = document.getElementById("historyTable");

        if (table) {

            table.innerHTML = "";

            if (history.length > 0) {

                history.slice().reverse().forEach(exam => {

                    const row = document.createElement("tr");

                    [
                        exam.subject || "-",
                        exam.topic || "-",
                        (exam.score || 0) + "%",
                        exam.difficulty || "-",
                        exam.date || "-"
                    ].forEach(value => {

                        const cell = document.createElement("td");

                        cell.textContent = value;

                        row.appendChild(cell);
                    });

                    table.appendChild(row);
                });

            } else {

                table.innerHTML = `
                    <tr>
                        <td colspan="5">No exam attempted yet.</td>
                    </tr>
                `;
            }
        }
    }


    // Exam Setup
    const setupForm = document.getElementById("examSetupForm");

    if (setupForm) {

        setupForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const currentUser = checkLogin();

            if (!currentUser) return;

            const subject = document.getElementById("subject").value;

            const topic = document.getElementById("topic").value;

            const count = Number(
                document.getElementById("questionCount").value
            );

            let difficulty = document.getElementById("difficulty").value;


            // Auto Difficulty
            if (difficulty === "auto") {
                difficulty = getRecommendedLevel(currentUser);
            }


            // User Specific Exam Settings
            const examSettings = {
                subject: subject,
                topic: topic,
                count: count,
                difficulty: difficulty,
                userEmail: currentUser.email
            };

            localStorage.setItem(
                "examSettings_" + currentUser.email,
                JSON.stringify(examSettings)
            );

            // Keep existing key for compatibility with current exam.js
            localStorage.setItem(
                "examSettings",
                JSON.stringify(examSettings)
            );

            window.location.href = "exam.html";
        });
    }


    // Profile Page
    if (document.getElementById("profileName")) {

        if (!checkLogin()) return;

        document.getElementById("profileName").textContent = user.name;

        document.getElementById("profileEmail").textContent = user.email;

        document.getElementById("profileImage").src =
            user.photo || "https://placehold.co/100x100/31205a/ffffff?text=User";

        document.getElementById("updateName").value = user.name;
    }

});


// Profile Update
function updateProfile() {

    const user = getCurrentUser();

    if (!user) return;

    const newName = document.getElementById("updateName").value.trim();

    const photoFile = document.getElementById("updatePhoto").files[0];


    if (!newName) {
        alert("Please enter your name.");
        return;
    }


    function saveUser(photo) {

        user.name = newName;

        if (photo) {
            user.photo = photo;
        }


        // Update Current User
        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        // Update Users List
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.map(item =>
            item.email === user.email ? user : item
        );

        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );


        // Update Profile Display
        document.getElementById("profileName").textContent = user.name;

        document.getElementById("profileImage").src =
            user.photo || "https://placehold.co/100x100/31205a/ffffff?text=User";

        document.getElementById("profileMessage").textContent =
            "Profile updated successfully!";
    }


    // Profile Photo Validation
    if (photoFile) {

        if (
            !photoFile.type.startsWith("image/") ||
            photoFile.size > 1024 * 1024
        ) {
            alert("Select a valid image smaller than 1 MB.");
            return;
        }


        const reader = new FileReader();

        reader.onload = function () {
            saveUser(reader.result);
        };

        reader.readAsDataURL(photoFile);

    } else {

        saveUser(null);
    }
}