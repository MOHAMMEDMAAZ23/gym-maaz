document.addEventListener("DOMContentLoaded", () => {
    // Signup Form Handling
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    role: document.getElementById("role").value // Get role from dropdown
                })
            });

            if (!response.ok) {
                alert("Signup failed! Check console for errors.");
                console.error("Signup error:", await response.text());
                return;
            }

            const data = await response.json();
            alert("Signup successful! Please login.");
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Login Form Handling
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value
                })
            });

            if (!response.ok) {
                alert("Login failed! Check your email and password.");
                console.error("Login error:", await response.text());
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role); // Store user role

            alert("Login successful!");

            // Redirect based on role
            window.location.href = data.role === "admin" ? "admin_dashboard.html" : "user_dashboard.html";
        });
    }
});
