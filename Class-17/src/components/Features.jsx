import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Blog Writing",
      description: "Generate SEO-optimized blog posts in minutes, not hours.",
      icon: "📝"
    },
    {
      title: "Social Media",
      description: "Create engaging captions for Instagram, Twitter, and LinkedIn.",
      icon: "📱"
    },
    {
      title: "Email Marketing",
      description: "Write high-converting emails that get opened and clicked.",
      icon: "📧"
    }
  ];

  return (
    <section id="features" className="features">
      <h2>Why Choose ContentAI?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
