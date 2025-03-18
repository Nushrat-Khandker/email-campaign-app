document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('emailForm');
  const responseMessage = document.getElementById('responseMessage');
  const campaignList = document.getElementById('campaignList');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const recipient = document.getElementById('recipient').value;
      
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subject, message, recipient })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          responseMessage.textContent = "Email sent successfully!";
        } else {
          responseMessage.textContent = `Error: ${data.message}`;
        }
      } catch (error) {
        responseMessage.textContent = `Error: ${error.message}`;
      }
    });
  }

  if (campaignList) {
    fetch('/api/get-campaigns')
      .then(response => response.json())
      .then(data => {
        data.forEach(campaign => {
          const li = document.createElement('li');
          li.textContent = `Subject: ${campaign.subject}, Recipient: ${campaign.recipient}`;
          campaignList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
      });
  }
});