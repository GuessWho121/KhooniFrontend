document.addEventListener("DOMContentLoaded", () => {
  // Pre-fill email field from localStorage if available
  const emailField = document.getElementById("email")
  if (emailField && localStorage.getItem("user_email")) {
    emailField.value = localStorage.getItem("user_email")
  }

  // Handle form submission
  const receiverForm = document.querySelector("form")
  if (receiverForm) {
    receiverForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Validate form
      const email = document.getElementById("email").value
      const bloodUnit = document.getElementById("bloodUnit").value
      const contactDetails = document.getElementById("contactDetails").value
      const doctorMobile = document.getElementById("doctorMobile").value

      // Emergency contact 1 (required)
      const name1 = document.getElementById("name1").value
      const phone1 = document.getElementById("phone1").value
      const email1 = document.getElementById("email1").value
      const relation1 = document.getElementById("relation1").value

      // Emergency contact 2 (optional)
      const name2 = document.getElementById("name2").value
      const phone2 = document.getElementById("phone2").value
      const email2 = document.getElementById("email2").value
      const relation2 = document.getElementById("relation2").value

      // Validate required fields
      if (!email || !bloodUnit || (!contactDetails && !doctorMobile)) {
        alert("Please fill in all required fields")
        return
      }

      // Validate emergency contact 1
      if (!name1 || !phone1 || !email1 || !relation1) {
        alert("Please fill in all required fields for Emergency Contact 1")
        return
      }

      try {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("bloodUnit", bloodUnit)
        formData.append("contactDetails", contactDetails)
        formData.append("doctorMobile", doctorMobile)

        // Emergency contact 1
        formData.append("name1", name1)
        formData.append("phone1", phone1)
        formData.append("email1", email1)
        formData.append("relation1", relation1)

        // Emergency contact 2 (if provided)
        if (name2 && phone2 && email2 && relation2) {
          formData.append("name2", name2)
          formData.append("phone2", phone2)
          formData.append("email2", email2)
          formData.append("relation2", relation2)
        }

        const response = await fetch("/api/submit-recipient-form", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (response.ok) {
          // Redirect to the specified page
          window.location.href = data.redirect
        } else {
          alert(data.detail || "Form submission failed")
        }
      } catch (error) {
        console.error("Error:", error)
        alert("An error occurred during form submission")
      }
    })
  }
})

