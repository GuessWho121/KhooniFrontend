document.addEventListener("DOMContentLoaded", () => {
    // Get user ID from localStorage
    const userId = localStorage.getItem("user_id")
  
    if (!userId) {
      // Redirect to login if user is not logged in
      window.location.href = "#"
      return
    }
  
    // Fetch dashboard data
    fetchDashboardData(userId)
  
    // Handle logout
    const logoutLink = document.querySelector('a[href="#"]')
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Clear user data from localStorage
        localStorage.removeItem("user_id")
        localStorage.removeItem("user_email")
        localStorage.removeItem("user_name")
  
        // Redirect to login page
        window.location.href = "#"
      })
    }
  })
  
  async function fetchDashboardData(userId) {
    try {
      const response = await fetch(`/api/dashboard/${userId}`)
  
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }
  
      const data = await response.json()
  
      // Update dashboard information
      updateDashboardUI(data)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to load dashboard data")
    }
  }
  
  function updateDashboardUI(data) {
    // Update user-specific information if needed
    // For example, we could personalize the greeting or show donor-specific content
  
    // Personalize the download form if user data is available
    const emailField = document.getElementById("email")
    if (emailField && data.user && data.user.email) {
      emailField.value = data.user.email
    }
  
    // If we have the user's name, we could split it into first and last name
    if (data.user && data.user.name) {
      const nameParts = data.user.name.split(" ")
      const firstName = document.getElementById("first-name")
      const lastName = document.getElementById("last-name")
  
      if (firstName && nameParts.length > 0) {
        firstName.value = nameParts[0]
      }
  
      if (lastName && nameParts.length > 1) {
        lastName.value = nameParts.slice(1).join(" ")
      }
    }
  
    // We could also show/hide elements based on whether the user is a donor or recipient
    if (data.is_donor) {
      // Show donor-specific content
      const donorElements = document.querySelectorAll(".donor-only")
      donorElements.forEach((el) => (el.style.display = "block"))
  
      // Hide recipient-specific content
      const recipientElements = document.querySelectorAll(".recipient-only")
      recipientElements.forEach((el) => (el.style.display = "none"))
    } else if (data.is_receiver) {
      // Show recipient-specific content
      const recipientElements = document.querySelectorAll(".recipient-only")
      recipientElements.forEach((el) => (el.style.display = "block"))
  
      // Hide donor-specific content
      const donorElements = document.querySelectorAll(".donor-only")
      donorElements.forEach((el) => (el.style.display = "none"))
    }
  
    // Update welcome message
    const welcomeElement = document.querySelector(".welcome h1")
    if (welcomeElement) {
      welcomeElement.textContent = `Welcome, ${data.user.name}!`
    }
  
    // Update user type information
    const userTypeElement = document.querySelector(".user-type")
    if (userTypeElement) {
      if (data.is_donor) {
        userTypeElement.textContent = "Donor"
      } else if (data.is_receiver) {
        userTypeElement.textContent = "Recipient"
      } else {
        userTypeElement.textContent = "User"
      }
    }
  
    // Update blood type information
    const bloodTypeElement = document.querySelector(".blood-type")
    if (bloodTypeElement) {
      if (data.is_donor && data.donor_profile) {
        bloodTypeElement.textContent = data.donor_profile.blood_type
      } else if (data.is_receiver && data.receiver_profile) {
        bloodTypeElement.textContent = data.receiver_profile.required_blood_type
      } else {
        bloodTypeElement.textContent = "N/A"
      }
    }
  
    // Additional dashboard updates can be added here based on the HTML structure
  }
  
  