document.addEventListener("DOMContentLoaded", () => {
    // Get user ID from localStorage
    const userId = localStorage.getItem("user_id")
  
    if (!userId) {
      // Redirect to login if user is not logged in
      window.location.href = "/sign.html"
      return
    }
  
    // Fetch user profile data
    fetchProfileData(userId)
  
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
  
  async function fetchProfileData(userId) {
    try {
      const response = await fetch(`/api/profile/${userId}`)
  
      if (!response.ok) {
        throw new Error("Failed to fetch profile data")
      }
  
      const data = await response.json()
  
      // Update profile information
      updateProfileUI(data)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to load profile data")
    }
  }
  
  function updateProfileUI(data) {
    // Update welcome message
    const welcomeElement = document.querySelector(".welcome h1")
    if (welcomeElement) {
      welcomeElement.textContent = `Welcome back ${data.user.name}...`
    }
  
    // Update profile details
    const nameElement = document.querySelector(".name")
    if (nameElement) {
      nameElement.innerHTML = `<b>Name:</b> ${data.user.name}`
    }
  
    const genderElement = document.querySelector(".gender")
    if (genderElement && data.profile.gender) {
      genderElement.innerHTML = `<b>Gender:</b> ${data.profile.gender}`
    }
  
    const dobElement = document.querySelector(".dob")
    if (dobElement && data.profile.dob) {
      dobElement.innerHTML = `<b>D.O.B:</b> ${formatDate(data.profile.dob)} <span class="sp"><b>Age:</b> ${data.profile.age || "N/A"}</span>`
    }
  
    const bloodGroupElement = document.querySelector(".dets")
    if (bloodGroupElement && data.profile.blood_group) {
      bloodGroupElement.innerHTML = `<b>Blood Group:</b> ${data.profile.blood_group} <span class="sp1"><b>Rh Factor:</b> ${data.profile.rh_factor}</span>`
    }
  
    // Update contact details
    const phoneElement = document.querySelector(".phn")
    if (phoneElement && data.profile.phone) {
      phoneElement.innerHTML = `<b>Phone No.:</b> ${data.profile.phone}`
    }
  
    const emailElement = document.querySelector(".email")
    if (emailElement) {
      emailElement.innerHTML = `<b>E-Mail:</b> ${data.user.email}`
    }
  
    // Update emergency contacts
    if (data.emergency_contacts && data.emergency_contacts.length > 0) {
      // First emergency contact
      const contact1 = data.emergency_contacts[0]
  
      const name1Element = document.querySelector(".name1")
      if (name1Element) {
        name1Element.innerHTML = `<b>Name:</b> ${contact1.name}`
      }
  
      const phone1Element = document.querySelector(".phn1")
      if (phone1Element) {
        phone1Element.innerHTML = `<b>Phone No.:</b> ${contact1.phone}`
      }
  
      const email1Element = document.querySelector(".email1")
      if (email1Element) {
        email1Element.innerHTML = `<b>E-Mail:</b> ${contact1.email}`
      }
  
      const relation1Element = document.querySelector(".rel1")
      if (relation1Element) {
        relation1Element.innerHTML = `<b>Relation:</b> ${contact1.relation}`
      }
  
      // Second emergency contact (if available)
      if (data.emergency_contacts.length > 1) {
        const contact2 = data.emergency_contacts[1]
  
        const name2Element = document.querySelector(".name2")
        if (name2Element) {
          name2Element.innerHTML = `<b>Name:</b> ${contact2.name}`
        }
  
        const phone2Element = document.querySelector(".phn2")
        if (phone2Element) {
          phone2Element.innerHTML = `<b>Phone No.:</b> ${contact2.phone}`
        }
  
        const email2Element = document.querySelector(".email2")
        if (email2Element) {
          email2Element.innerHTML = `<b>E-Mail:</b> ${contact2.email}`
        }
  
        const relation2Element = document.querySelector(".rel2")
        if (relation2Element) {
          relation2Element.innerHTML = `<b>Relation:</b> ${contact2.relation}`
        }
      }
    }
  }
  
  // Helper function to format date
  function formatDate(dateString) {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
  }
  
  