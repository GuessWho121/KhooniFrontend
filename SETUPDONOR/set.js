document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userEmail = sessionStorage.getItem('userEmail');
  const contacts = {
      user_email: userEmail,
      contact1: {
          name: document.getElementById('name1').value,
          phone: document.getElementById('phone1').value,
          email: document.getElementById('email1').value,
          relation: document.getElementById('relation1').value
      },
      contact2: {
          name: document.getElementById('name2').value,
          phone: document.getElementById('phone2').value,
          email: document.getElementById('email2').value,
          relation: document.getElementById('relation2').value
      }
  };

  try {
      const response = await fetch('http://156.67.110.227:15141/donor/emergency-contacts/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(contacts)
      });
      
      if (!response.ok) throw new Error(await response.text());
      alert('Contacts saved successfully!');
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to save contacts');
  }
});