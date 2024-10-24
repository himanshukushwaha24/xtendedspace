import React from "react";

const ThankYou = () => {
  return (
    <div className="packerWrapper">
      <section className="thanks">
        <div className="thanks-img">
          <img src="/images/thank-you.webp" alt="Thank You" />
        </div>
        <h2>Thank you for registration!</h2>
        <p>
          We appreciate your booking. Your transport request has been received,
          and we will reach you soon.
        </p>
        <a className="thanks-btn" href="/packers-and-movers-in-india">
          Back home
        </a>

        <p>
          If you have any issues{" "}
          <span>
            <a
              className="whatsapp"
              href="https://api.whatsapp.com/send?phone=919911090800&text=Hello"
            >
              Contact Us
            </a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default ThankYou;
