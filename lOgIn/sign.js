document.addEventListener('DOMContentLoaded', () => {
    // Animation Toggle
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Registration Handler
    document.querySelector(".sign-up form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            name: document.querySelector(".sign-up input[placeholder='Name']").value.trim(),
            email: document.querySelector(".sign-up input[placeholder='Email']").value.trim(),
            password: document.querySelector(".sign-up input[placeholder='Password']").value.trim(),
            phone: document.querySelector(".sign-up input[placeholder='Phone Number']").value.trim().replace(/\D/g, ''), // Remove non-digits
            blood_type: document.querySelector(".sign-up input[placeholder='Blood Type']").value.toUpperCase().trim(),
            userType: document.querySelector(".sign-up input[name='userType']:checked")?.value
        };

        // Validations
        if (!formData.userType) {
            alert("Please select Donor or Recipient");
            return;
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            alert("Phone must be 10 digits");
            return;
        }

        if (!/^(A|B|AB|O)[+-]$/.test(formData.blood_type)) {
            alert("Invalid blood type (e.g., A+, O-)");
            return;
        }    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Invalid email format");
            return;
        }

        try {
            console.log("Final Registration Data:", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                blood_type: formData.blood_type
            });

            // Remove userType from payload
            const { userType, ...registrationData } = formData;

            // Check existing user
            const checkResponse = await fetch(`http://156.67.110.227:15141/user_exists?email=${encodeURIComponent(formData.email)}`);
            if (!checkResponse.ok) throw new Error("Server error");

            const checkData = await checkResponse.json();
            if (checkData.exists) {
                alert("User with this email already exists.");
                return;
            }

            // Send registration request
            const response = await fetch("http://156.67.110.227:15141/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registrationData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend Error Details:", errorData);
                const errorMessage = errorData.detail?.[0]?.msg || errorData.detail || "Registration failed";
                throw new Error(errorMessage);
            }
            sessionStorage.setItem('username', formData.name);
            // Redirect based on userType
            const redirectURL = formData.userType === "donor"
                ? `../SETUPDONOR/set.html?email=${encodeURIComponent(formData.email)}`
                : `../SETUPEME/setupr.html?email=${encodeURIComponent(formData.email)}`;

            window.location.href = redirectURL;

        } catch (error) {
            alert(`Error:\n${error.message}`);
            console.error("Registration error:", error);
        }
    });

    // Login Handler
    document.querySelector(".sign-in form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const credentials = {
            email: document.querySelector(".sign-in input[placeholder='Email']").value.trim(),
            password: document.querySelector(".sign-in input[placeholder='Password']").value.trim()
        };

        try {
            const response = await fetch("http://156.67.110.227:15141/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.detail || "Invalid email or password";
                throw new Error(errorMessage);
            }
            
            sessionStorage.setItem('username', response.username);
            window.location.href = `../dasHbOArd/db.html?email=${encodeURIComponent(credentials.email)}`;

        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error("Login error:", error);
        }
    });
});