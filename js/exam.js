// ==========================================
// SMARTPREP AI - QUESTION BANK
// ==========================================

const questionBank = {

    Python: [
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "fun", "define"],
            answer: 1
        },
        {
            question: "Which data type is mutable?",
            options: ["Tuple", "String", "List", "Integer"],
            answer: 2
        },
        {
            question: "What is the output of 2 ** 3?",
            options: ["6", "8", "9", "5"],
            answer: 1
        },
        {
            question: "Which symbol is used for comments in Python?",
            options: ["//", "#", "/*", "--"],
            answer: 1
        },
        {
            question: "Which function displays output?",
            options: ["input()", "print()", "display()", "show()"],
            answer: 1
        }
    ],

    Java: [
        {
            question: "Which keyword is used to create a class?",
            options: ["class", "define", "struct", "create"],
            answer: 0
        },
        {
            question: "Which method is the entry point of Java?",
            options: ["start()", "run()", "main()", "execute()"],
            answer: 2
        },
        {
            question: "Which keyword is used for inheritance?",
            options: ["implements", "extends", "inherits", "super"],
            answer: 1
        },
        {
            question: "Java is primarily which type of language?",
            options: ["Procedural", "Object-oriented", "Markup", "Query"],
            answer: 1
        },
        {
            question: "Which keyword creates an object?",
            options: ["class", "new", "this", "static"],
            answer: 1
        }
    ],

    DSA: [
        {
            question: "Which data structure follows LIFO?",
            options: ["Queue", "Stack", "Array", "Tree"],
            answer: 1
        },
        {
            question: "Which data structure follows FIFO?",
            options: ["Stack", "Tree", "Queue", "Graph"],
            answer: 2
        },
        {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            answer: 1
        },
        {
            question: "Which data structure uses nodes and pointers?",
            options: ["Array", "Linked List", "String", "Integer"],
            answer: 1
        },
        {
            question: "Which is a sorting algorithm?",
            options: ["Binary Search", "Bubble Sort", "DFS", "BFS"],
            answer: 1
        }
    ],

    DBMS: [
        {
            question: "What does DBMS stand for?",
            options: ["Database Management System", "Data Backup System", "Digital Base System", "Database Machine System"],
            answer: 0
        },
        {
            question: "Which SQL command retrieves data?",
            options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            answer: 2
        },
        {
            question: "Which key uniquely identifies a record?",
            options: ["Foreign Key", "Primary Key", "Candidate Key", "Composite Key"],
            answer: 1
        },
        {
            question: "Which SQL command removes a table?",
            options: ["DELETE", "REMOVE", "DROP", "UPDATE"],
            answer: 2
        },
        {
            question: "What is a collection of related data called?",
            options: ["Database", "Program", "Algorithm", "Network"],
            answer: 0
        }
    ],

    ML: [
        {
            question: "What does ML stand for?",
            options: ["Machine Learning", "Multiple Language", "Machine Logic", "Manual Learning"],
            answer: 0
        },
        {
            question: "Which is a supervised learning algorithm?",
            options: ["K-Means", "Linear Regression", "PCA", "Apriori"],
            answer: 1
        },
        {
            question: "Which algorithm is used for classification?",
            options: ["Logistic Regression", "K-Means", "PCA", "Apriori"],
            answer: 0
        },
        {
            question: "What is overfitting?",
            options: ["Good training but poor test performance", "Model does not learn", "No data", "Model runs faster"],
            answer: 0
        },
        {
            question: "Which Python library is used for machine learning?",
            options: ["HTML", "Scikit-learn", "CSS", "Bootstrap"],
            answer: 1
        }
    ],

    OS: [
        {
            question: "What does OS stand for?",
            options: ["Operating System", "Open Software", "Operating Software", "Output System"],
            answer: 0
        },
        {
            question: "Which is an operating system?",
            options: ["Python", "Windows", "MySQL", "HTML"],
            answer: 1
        },
        {
            question: "What is multitasking?",
            options: ["Running multiple tasks", "Deleting files", "Creating databases", "Writing code"],
            answer: 0
        },
        {
            question: "Which component manages computer memory?",
            options: ["Compiler", "Operating System", "Browser", "Editor"],
            answer: 1
        },
        {
            question: "What is a process?",
            options: ["A program in execution", "A database", "A hardware device", "A programming language"],
            answer: 0
        }
    ],

    CN: [
        {
            question: "What does LAN stand for?",
            options: ["Local Area Network", "Large Area Network", "Long Access Network", "Local Access Node"],
            answer: 0
        },
        {
            question: "Which protocol is used for web browsing?",
            options: ["FTP", "HTTP", "SMTP", "SSH"],
            answer: 1
        },
        {
            question: "How many layers are in the OSI model?",
            options: ["4", "5", "7", "8"],
            answer: 2
        },
        {
            question: "Which device connects different networks?",
            options: ["Keyboard", "Router", "Mouse", "Monitor"],
            answer: 1
        },
        {
            question: "What does IP stand for?",
            options: ["Internet Protocol", "Internal Program", "Information Process", "Internet Program"],
            answer: 0
        }
    ]

};


// ==========================================
// GLOBAL VARIABLES
// ==========================================

let questions = [];
let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 0;
let timerInterval = null;
let submittedResult = null;
let currentExamSettings = null;


// ==========================================
// USER DATA HELPERS
// ==========================================

function getLoggedInUser() {

    return JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

}


function getUserHistoryKey(user) {

    return "examHistory_" + user.email.toLowerCase();

}


function getUserLevelKey(user) {

    return "recommendedLevel_" + user.email.toLowerCase();

}


// ==========================================
// LOAD EXAM
// ==========================================

function loadExam() {

    const user = getLoggedInUser();

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // Load user-specific settings
    const settingsKey = "examSettings_" + user.email.toLowerCase();

    currentExamSettings = JSON.parse(
        localStorage.getItem(settingsKey) || "null"
    );

    // Backward compatibility with old settings
    if (!currentExamSettings) {

        const oldSettings = JSON.parse(
            localStorage.getItem("examSettings") || "null"
        );

        if (oldSettings && oldSettings.userEmail === user.email) {
            currentExamSettings = oldSettings;
        }
    }

    if (!currentExamSettings) {
        alert("Please select an exam first.");
        window.location.href = "dashboard.html";
        return;
    }

    const settings = currentExamSettings;

    const pool = questionBank[settings.subject];

    if (!pool || pool.length === 0) {
        alert("No questions available.");
        window.location.href = "dashboard.html";
        return;
    }

    const requestedCount = Number(
        settings.questionCount || settings.count
    );

    const count = [20, 30, 50].includes(requestedCount)
        ? requestedCount
        : 20;

    // Repeat and shuffle sample question pool
    questions = [];

    while (questions.length < count) {

        const shuffled = [...pool].sort(
            () => Math.random() - 0.5
        );

        questions.push(...shuffled);

    }

    questions = questions.slice(0, count);

    userAnswers = new Array(count).fill(null);

    currentQuestion = 0;

    timeLeft = count * 60;

    document.getElementById("subjectName").innerText =
        "Subject: " + settings.subject;

    showQuestion();

    startTimer();

}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("questionText").innerText =
        question.question;

    const container =
        document.getElementById("optionsContainer");

    container.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option";

        button.innerText = option;

        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.onclick = function () {

            userAnswers[currentQuestion] = index;

            showQuestion();

        };

        container.appendChild(button);

    });

    document.getElementById("prevBtn").disabled =
        currentQuestion === 0;

    document.getElementById("nextBtn").disabled =
        currentQuestion === questions.length - 1;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("examProgress").style.width =
        progress + "%";

}


// ==========================================
// NAVIGATION
// ==========================================

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

}


function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    clearInterval(timerInterval);

    updateTimer();

    timerInterval = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert("Time is over. Your exam will be submitted.");

            submitExam(true);

        }

    }, 1000);

}


function updateTimer() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    document.getElementById("timer").innerText =
        `Time: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


// ==========================================
// SUBMIT EXAM
// ==========================================

function submitExam(autoSubmit = false) {

    if (!questions.length || submittedResult) {
        return;
    }

    if (!autoSubmit) {

        const confirmSubmit = confirm(
            "Are you sure you want to submit your exam?"
        );

        if (!confirmSubmit) return;

    }

    clearInterval(timerInterval);

    calculateResult();

}


// ==========================================
// RESULT CALCULATION
// ==========================================

function calculateResult() {

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((question, index) => {

        if (userAnswers[index] === null) {

            unanswered++;

        } else if (userAnswers[index] === question.answer) {

            correct++;

        } else {

            wrong++;

        }

    });

    const total = questions.length;

    const score = Math.round((correct / total) * 100);

    let nextLevel;

    if (score <= 40) {
        nextLevel = "Easy";
    } else if (score <= 65) {
        nextLevel = "Medium";
    } else if (score <= 85) {
        nextLevel = "Hard";
    } else {
        nextLevel = "Advanced";
    }

    const user = getLoggedInUser();

    if (!user) {
        alert("User session expired. Please login again.");
        window.location.href = "login.html";
        return;
    }

    const settings = currentExamSettings;

    submittedResult = {

        subject: settings.subject,

        topic: settings.topic,

        difficulty: settings.difficulty || "Easy",

        total: total,

        correct: correct,

        wrong: wrong,

        unanswered: unanswered,

        score: score,

        nextLevel: nextLevel,

        date: new Date().toLocaleString(),

        userEmail: user.email

    };


    // ======================================
    // SAVE USER-WISE EXAM HISTORY
    // ======================================

    const historyKey = getUserHistoryKey(user);

    const history = JSON.parse(
        localStorage.getItem(historyKey) || "[]"
    );

    history.push(submittedResult);

    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );


    // ======================================
    // SAVE USER-WISE RECOMMENDED LEVEL
    // ======================================

    localStorage.setItem(
        getUserLevelKey(user),
        nextLevel
    );


    showResult(submittedResult);

}


// ==========================================
// SHOW PERFORMANCE ANALYSIS
// ==========================================

function showResult(result) {

    document.getElementById("examArea").classList.add("hidden");

    document.getElementById("resultArea").classList.remove("hidden");

    document.getElementById("resultSubject").innerText =
        "Subject: " + result.subject + " | Topic: " + result.topic;

    document.getElementById("scoreText").innerText =
        "Your Score: " + result.score + "%";

    document.getElementById("correctText").innerText =
        "Correct Answers: " + result.correct;

    document.getElementById("wrongText").innerText =
        "Incorrect Answers: " + result.wrong;

    document.getElementById("unansweredText").innerText =
        "Unanswered Questions: " + result.unanswered;

    document.getElementById("accuracyText").innerText =
        "Accuracy: " + result.score + "%";

    document.getElementById("levelText").innerText =
        "Recommended Next Difficulty: " + result.nextLevel;

    document.getElementById("analysisText").innerText =
        result.score >= 80
            ? "Excellent performance! You have demonstrated strong understanding. Try a harder examination next time."
            : result.score >= 60
                ? "Good performance. Revise your incorrect answers and practise more questions."
                : result.score >= 40
                    ? "You are making progress. Focus on your weak areas and practise more."
                    : "You need more practice. Start with basic concepts and attempt an easier examination.";

    document.getElementById("scoreProgress").style.width =
        result.score + "%";


    // Result Bar Chart
    const ctx = document.getElementById("resultChart");

    if (window.resultChartInstance) {
        window.resultChartInstance.destroy();
    }

    window.resultChartInstance = new Chart(ctx, {

        type: "bar",

        data: {

            labels: ["Correct", "Incorrect", "Unanswered"],

            datasets: [{

                label: "Number of Questions",

                data: [
                    result.correct,
                    result.wrong,
                    result.unanswered
                ],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444",
                    "#f59e0b"
                ],

                borderRadius: 8

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {
                    beginAtZero: true,
                    ticks: { color: "white" },
                    grid: { color: "#334155" }
                },

                x: {
                    ticks: { color: "white" },
                    grid: { display: false }
                }

            },

            plugins: {

                legend: {
                    labels: { color: "white" }
                }

            }

        }

    });

}


// ==========================================
// DOWNLOAD PDF SCORECARD
// ==========================================

function downloadPDF() {

    if (!submittedResult) {
        alert("No examination result available.");
        return;
    }

    if (!window.jspdf || typeof Chart === "undefined") {
        alert("PDF or Chart library could not load.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");

    const r = submittedResult;

    const student = getLoggedInUser() || {};

    const studentName = student.name || "Student";

    const studentEmail = student.email || "Not Available";


    // HEADER
    doc.setFillColor(20, 39, 44);

    doc.rect(0, 0, 210, 42, "F");

    doc.setTextColor(72, 199, 142);

    doc.setFontSize(24);

    doc.setFont("helvetica", "bold");

    doc.text("SmartPrep AI", 15, 19);

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    doc.text("EXAM PERFORMANCE SCORECARD", 15, 30);


    // STUDENT DETAILS
    doc.setTextColor(30, 50, 55);

    doc.setFontSize(15);

    doc.setFont("helvetica", "bold");

    doc.text("Student Information", 15, 56);

    doc.setFontSize(10);

    doc.setFont("helvetica", "normal");

    doc.text("Name: " + studentName, 15, 67);

    doc.text("Email: " + studentEmail, 15, 75);

    doc.text("Subject: " + r.subject, 15, 83);

    doc.text("Topic: " + (r.topic || "All Topics"), 15, 91);

    doc.text("Exam Date: " + r.date, 15, 99);


    // OVERALL SCORE
    doc.setFillColor(231, 247, 239);

    doc.roundedRect(15, 108, 180, 27, 4, 4, "F");

    doc.setTextColor(7, 150, 83);

    doc.setFontSize(20);

    doc.setFont("helvetica", "bold");

    doc.text("Overall Score: " + r.score + "%", 22, 126);


    // PERFORMANCE ANALYTICS
    doc.setTextColor(30, 50, 55);

    doc.setFontSize(15);

    doc.text("Performance Analytics", 15, 151);

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    const analytics = [

        "Total Questions: " + r.total,

        "Correct Answers: " + r.correct,

        "Incorrect Answers: " + r.wrong,

        "Unanswered Questions: " + r.unanswered,

        "Accuracy: " + r.score + "%",

        "Recommended Next Level: " + r.nextLevel

    ];

    let y = 163;

    analytics.forEach(function (item) {

        doc.text(item, 20, y);

        y += 8;

    });


    // BAR CHART
    doc.setFontSize(15);

    doc.setFont("helvetica", "bold");

    doc.text("Performance Bar Chart", 15, 221);

    const barCanvas = document.createElement("canvas");

    barCanvas.width = 1200;

    barCanvas.height = 500;

    const barCtx = barCanvas.getContext("2d");

    barCtx.fillStyle = "#ffffff";

    barCtx.fillRect(0, 0, 1200, 500);

    const barChart = new Chart(barCtx, {

        type: "bar",

        data: {

            labels: ["Correct", "Incorrect", "Unanswered"],

            datasets: [{

                label: "Number of Questions",

                data: [
                    r.correct,
                    r.wrong,
                    r.unanswered
                ],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444",
                    "#f59e0b"
                ],

                borderRadius: 12,

                barThickness: 100

            }]

        },

        options: {

            responsive: false,

            animation: false,

            plugins: {

                legend: {

                    labels: {
                        color: "#203a40"
                    }

                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "#203a40"
                    },

                    grid: {
                        display: false
                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {
                        color: "#203a40",
                        precision: 0
                    }

                }

            }

        }

    });

    const barImage = barCanvas.toDataURL("image/png");

    doc.addImage(barImage, "PNG", 15, 225, 180, 65);

    barChart.destroy();


    // PAGE 2 - PIE CHART
    doc.addPage();

    doc.setFillColor(20, 39, 44);

    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(72, 199, 142);

    doc.setFontSize(21);

    doc.setFont("helvetica", "bold");

    doc.text("Detailed Performance Analysis", 15, 21);

    doc.setTextColor(30, 50, 55);

    doc.setFontSize(15);

    doc.text("Answer Distribution - Pie Chart", 15, 52);


    // PIE CHART
    const pieCanvas = document.createElement("canvas");

    pieCanvas.width = 700;

    pieCanvas.height = 600;

    const pieCtx = pieCanvas.getContext("2d");

    pieCtx.fillStyle = "#ffffff";

    pieCtx.fillRect(0, 0, 700, 600);

    const pieChart = new Chart(pieCtx, {

        type: "pie",

        data: {

            labels: [
                "Correct Answers",
                "Incorrect Answers",
                "Unanswered"
            ],

            datasets: [{

                data: [
                    r.correct,
                    r.wrong,
                    r.unanswered
                ],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444",
                    "#f59e0b"
                ],

                borderColor: "#ffffff",

                borderWidth: 3

            }]

        },

        options: {

            responsive: false,

            animation: false,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#203a40",

                        padding: 20,

                        font: {
                            size: 18
                        }

                    }

                }

            }

        }

    });

    const pieImage = pieCanvas.toDataURL("image/png");

    doc.addImage(pieImage, "PNG", 30, 58, 150, 125);

    pieChart.destroy();


    // PERCENTAGE BREAKDOWN
    doc.setTextColor(30, 50, 55);

    doc.setFontSize(15);

    doc.setFont("helvetica", "bold");

    doc.text("Answer Breakdown", 15, 200);

    const correctPercent = ((r.correct / r.total) * 100).toFixed(1);

    const wrongPercent = ((r.wrong / r.total) * 100).toFixed(1);

    const unansweredPercent = ((r.unanswered / r.total) * 100).toFixed(1);

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    doc.setTextColor(34, 197, 94);

    doc.text("Correct Answers: " + correctPercent + "%", 20, 214);

    doc.setTextColor(239, 68, 68);

    doc.text("Incorrect Answers: " + wrongPercent + "%", 20, 224);

    doc.setTextColor(245, 158, 11);

    doc.text("Unanswered: " + unansweredPercent + "%", 20, 234);


    // PERFORMANCE REMARK
    let remark = "";

    if (r.score >= 80) {
        remark = "Excellent Performance!";
    } else if (r.score >= 60) {
        remark = "Good Performance. Keep Practising!";
    } else if (r.score >= 40) {
        remark = "Average Performance. Improve Your Concepts.";
    } else {
        remark = "Needs Improvement. Focus on Basic Concepts.";
    }

    doc.setTextColor(7, 150, 83);

    doc.setFontSize(14);

    doc.setFont("helvetica", "bold");

    doc.text(remark, 105, 260, {
        align: "center"
    });


    // FOOTER
    doc.setTextColor(120, 120, 120);

    doc.setFontSize(9);

    doc.setFont("helvetica", "normal");

    doc.text(
        "Generated by SmartPrep AI - Smart Exam Preparation System",
        105,
        285,
        { align: "center" }
    );


    // DOWNLOAD PDF
    doc.save("SmartPrep_AI_Scorecard.pdf");

}


// ==========================================
// INITIALIZE
// ==========================================

window.onload = loadExam;