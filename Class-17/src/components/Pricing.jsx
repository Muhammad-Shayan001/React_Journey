import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="pricing">
      <h2>Simple Pricing for Everyone</h2>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>Starter</h3>
          <div className="price">$0<span>/mo</span></div>
          <ul>
            <li>5,000 Words/mo</li>
            <li>5+ Templates</li>
            <li>1 User</li>
          </ul>
          <button className="btn-secondary">Start Free</button>
        </div>
        <div className="pricing-card featured">
          <h3>Pro</h3>
          <div className="price">$29<span>/mo</span></div>
          <ul>
            <li>50,000 Words/mo</li>
            <li>50+ Templates</li>
            <li>5 Users</li>
            <li>Priority Support</li>
          </ul>
          <button className="btn-primary">Get Pro</button>
        </div>
        <div className="pricing-card">
          <h3>Business</h3>
          <div className="price">$99<span>/mo</span></div>
          <ul>
            <li>Unlimited Words</li>
            <li>All Templates</li>
            <li>Unlimited Users</li>
            <li>API Access</li>
          </ul>
          <button className="btn-secondary">Contact Sales</button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
