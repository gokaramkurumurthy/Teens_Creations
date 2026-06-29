import React, { useEffect, useState } from 'react';

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
  const formEndpoint = import.meta.env.PROD ? '/api/contact.php' : '/api/contact';

  useEffect(() => {
    if (!status.message) return undefined;

    const timer = window.setTimeout(() => {
      setStatus({ type: '', message: '' });
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [status.message]);

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
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
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
        if (error.name === 'AbortError') {
          setStatus({ type: 'error', message: 'The request took too long. Please try again in a moment.' });
        } else {
          console.error('Form submission error:', error);
          setStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' });
        }
      } finally {
        window.clearTimeout(timeoutId);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Form submission setup error:', error);
      setStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' });
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
