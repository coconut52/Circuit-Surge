import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Thank you for contacting us. We will get back to you soon!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h2>Get in Touch with Circuit Surge</h2>
      <p>
        We’d love to hear from you! Whether you have questions about our platform, need assistance,
        or want to share your feedback, our team is here to help.
      </p>
      <h3>How can we assist you?</h3>
      <ul>
        <li>Have a question about our features or services? Let us know.</li>
        <li>Need technical support? We're ready to assist you.</li>
        <li>Want to provide feedback or suggestions? We value your input!</li>
      </ul>
      <p>
        Fill out the contact form below, and our team will get back to you as soon as possible. You
        can also reach us via email or social media for faster responses.
      </p>
      <h4>
        Thank you for choosing Circuit Surge as your electronic inventory management solution. We
        look forward to connecting with you!
      </h4>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;