import React, { useState } from 'react';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  projectTitle: '',
  message: '',
};

function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let result;

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { message: text || 'Unexpected server response' };
      }

      if (response.ok && result.success) {
        setStatus({ type: 'success', message: result.message || 'Message sent successfully!' });
        setFormData(initialFormData);
      } else {
        setStatus({ type: 'error', message: result.message || `Failed to send message (${response.status})` });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleFormSubmit}>
        {status.message && (
          <div className={`form-status ${status.type === 'success' ? 'success' : 'error'}`}>
            {status.message}
          </div>
        )}

        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
          >
            <option value="">Service Interest</option>
            <option value="film">Film Production</option>
            <option value="tv">Television & Digital</option>
            <option value="talent">Talent Management</option>
            <option value="events">Event Management</option>
            <option value="marketing">Marketing & Publicity</option>
          </select>
        </div>

        <input
          type="text"
          name="projectTitle"
          placeholder="Project Title"
          value={formData.projectTitle}
          onChange={handleInputChange}
        />

        <textarea
          name="message"
          placeholder="Tell us about your project..."
          rows="5"
          value={formData.message}
          onChange={handleInputChange}
          required
        ></textarea>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <div className="button-arrow">→</div>
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
