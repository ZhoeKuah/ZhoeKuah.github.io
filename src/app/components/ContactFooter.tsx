import React from 'react';

const ContactFooter = () => {
    const webhookUrl = 'https://discord.com/api/webhooks/1476124111141863485/flKUPtbU-A_9GeAQE5Oqbe8C6PPauSNsk6ybp7kvqQbH9rOHW86N1RdzxrB1WZCUNMj6';

    const sendNotification = async (message) => {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content: message }),
        });
    };

    const handleContactSubmission = () => {
        const message = 'A new contact form submission!'; // Customize the message
        sendNotification(message);
    };

    return (
        <div className='contact-footer'>
            <button onClick={handleContactSubmission}>Submit</button>
        </div>
    );
};

export default ContactFooter;