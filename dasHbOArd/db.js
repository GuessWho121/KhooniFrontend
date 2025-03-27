document.addEventListener("DOMContentLoaded", () => {
    // Get user ID from localStorage
    const userId = localStorage.getItem("user_id")
  
    if (!userId) {
      // Redirect to login if user is not logged in
      window.location.href = "/sign.html"
      return
    }
  
    // Fetch dashboard data
    fetchDashboardData(userId)
  
    // Handle logout
    const logoutLink = document.querySelector('a[href="../lOgIn/sign.html"]')
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Clear user data from localStorage
        localStorage.removeItem("user_id")
        localStorage.removeItem("user_email")
        localStorage.removeItem("user_name")
  
        // Redirect to login page
        window.location.href = "/sign.html"
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
  
  