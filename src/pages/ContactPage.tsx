import "../styles/ContactPage.css"; // Import CSS
import logo from "../assets/bitescout-green.png"; // Import logo

const ContactPage = () => {
  return (
    <div className="contact-page">
      <img src={logo} alt="BiteScout Logo" className="contact-logo animated-logo" />
      <h1 className="animated-text">Welcome to BiteScout</h1>
      <p className="description animated-text">
        Discover your favorite dining experiences with BiteScout. We help food lovers connect with the best restaurants, whether you're looking for hidden gems or popular spots. Reach out to us for support, feedback, or partnership inquiries.
      </p>
      <div className="contact-details animated-text">
        <p className="contact-info">
          📞 <strong>Phone:</strong> +1 (800) 555-1234
        </p>
        <p className="contact-info">
          ✉️ <strong>Email:</strong> <a href="mailto:bitescout@gmail.com">bitescout@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
