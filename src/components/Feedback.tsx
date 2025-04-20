import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Feedback.css"; // Import the CSS file

const Feedback: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [rating, setRating] = useState<number>(5);

  const sendFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_vhuk3pl", // Replace with your EmailJS service ID
          "template_0tkqj6g", // Replace with your EmailJS template ID
          form.current,
          "xFtAgJKuoK-3gckP2" // Replace with your EmailJS public key
        )
        .then(
          () => {
            alert("Feedback sent successfully! 🚀");
          },
          (error) => {
            alert("Failed to send feedback. 😢");
            console.error("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      <form ref={form} onSubmit={sendFeedback} className="feedback-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="from_name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="user_email" required />

        <label>Rating</label>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star ${star <= rating ? "selected" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />

        <label htmlFor="message">Comments</label>
        <textarea id="message" name="message" required />

        <button type="submit" className="send-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;