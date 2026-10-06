import { useState } from 'react';
import Layout from '../components/Layout/Layout';

// Import company logos
import flt1 from '../assets/img/flt-1.png';
import flt2 from '../assets/img/flt-2.png';
import flt3 from '../assets/img/flt-3.png';
import flt4 from '../assets/img/flt-4.png';

// JSON Data Structure for Pricing Plans
const pricingPlans = [
  {
    id: 1,
    name: "Standard Plan",
    icon: "fa-solid fa-wand-magic-sparkles",
    iconColor: "text-purple",
    iconBgColor: "bg-light-purple",
    pricing: {
      monthly: 49,
      yearly: 99
    },
    features: [
      { text: "Up to 05 users monthly", available: true },
      { text: "Free 5 host & domain", available: true },
      { text: "Custom infrastructure", available: true },
      { text: "Access to all our room", available: true },
      { text: "24/7 dedicated Support", available: false },
      { text: "Unlimited updates", available: false },
      { text: "Landing pages & Web widgets", available: false }
    ],
    buttonClass: "btn-dark",
    highlighted: false
  },
  {
    id: 2,
    name: "Professional Plan",
    icon: "fa-solid fa-wand-magic-sparkles",
    iconColor: "text-primary",
    iconBgColor: "bg-light-primary",
    pricing: {
      monthly: 129,
      yearly: 149
    },
    features: [
      { text: "Up to 05 users monthly", available: true },
      { text: "Free 5 host & domain", available: true },
      { text: "Custom infrastructure", available: true },
      { text: "Access to all our room", available: true },
      { text: "24/7 dedicated Support", available: false },
      { text: "Unlimited updates", available: false },
      { text: "Landing pages & Web widgets", available: false }
    ],
    buttonClass: "btn-primary",
    highlighted: true
  },
  {
    id: 3,
    name: "Platinum Plan",
    icon: "fa-solid fa-wand-magic-sparkles",
    iconColor: "text-success",
    iconBgColor: "bg-light-success",
    pricing: {
      monthly: 149,
      yearly: 199
    },
    features: [
      { text: "Up to 05 users monthly", available: true },
      { text: "Free 5 host & domain", available: true },
      { text: "Custom infrastructure", available: true },
      { text: "Access to all our room", available: true },
      { text: "24/7 dedicated Support", available: false },
      { text: "Unlimited updates", available: false },
      { text: "Landing pages & Web widgets", available: false }
    ],
    buttonClass: "btn-dark",
    highlighted: false
  }
];

// JSON Data for Companies
const companies = [
  { id: 1, logo: flt1, alt: "Company 1" },
  { id: 2, logo: flt2, alt: "Company 2" },
  { id: 3, logo: flt3, alt: "Company 3" },
  { id: 4, logo: flt4, alt: "Company 4" },
  { id: 5, logo: flt1, alt: "Company 5" }
];

// JSON Data for FAQs
const faqs = [
  {
    id: 1,
    question: "How To Book A resort with Booer.com?",
    answer: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements."
  },
  {
    id: 2,
    question: "Can We Pay After Check-out?",
    answer: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements."
  },
  {
    id: 3,
    question: "Is This Collaborate with Oyo?",
    answer: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements."
  },
  {
    id: 4,
    question: "Can We get Any Transport For Walk?",
    answer: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements."
  },
  {
    id: 5,
    question: "Can We Get Any Extra Services?",
    answer: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements."
  }
];

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };

  const handleGetStarted = (planName) => {
    // Add your navigation/purchase logic here
  };

  const handleContactUs = () => {
    // Add your contact logic here
  };

  return (
    <Layout footerMode="dark">
      {/* Hero Section */}
      <section className="position-relative">
        <div className="bg-light-primary position-absolute end-0 start-0 top-0 ht-500"></div>
        <div className="container">
          {/* Header */}
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-9 col-lg-11 col-md-12">
              <div className="prc-capstion text-center">
                <div className="prc-captions position-relative">
                  <h1 className="xl-heading">
                    Plan That Fit Your{' '}
                    <span className="position-relative z-4">
                      Scale
                      <span className="position-absolute top-50 start-50 translate-middle d-none d-md-block mt-4">
                        <svg width="185px" height="23px" viewBox="0 0 445.5 23">
                          <path
                            className="fill-primary opacity-7"
                            d="M409.9,2.6c-9.7-0.6-19.5-1-29.2-1.5c-3.2-0.2-6.4-0.2-9.7-0.3c-7-0.2-14-0.4-20.9-0.5 c-3.9-0.1-7.8-0.2-11.7-0.3c-1.1,0-2.3,0-3.4,0c-2.5,0-5.1,0-7.6,0c-11.5,0-23,0-34.5,0c-2.7,0-5.5,0.1-8.2,0.1 c-6.8,0.1-13.6,0.2-20.3,0.3c-7.7,0.1-15.3,0.1-23,0.3c-12.4,0.3-24.8,0.6-37.1,0.9c-7.2,0.2-14.3,0.3-21.5,0.6 c-12.3,0.5-24.7,1-37,1.5c-6.7,0.3-13.5,0.5-20.2,0.9C112.7,5.3,99.9,6,87.1,6.7C80.3,7.1,73.5,7.4,66.7,8 C54,9.1,41.3,10.1,28.5,11.2c-2.7,0.2-5.5,0.5-8.2,0.7c-5.5,0.5-11,1.2-16.4,1.8c-0.3,0-0.7,0.1-1,0.1c-0.7,0.2-1.2,0.5-1.7,1 C0.4,15.6,0,16.6,0,17.6c0,1,0.4,2,1.1,2.7c0.7,0.7,1.8,1.2,2.7,1.1c6.6-0.7,13.2-1.5,19.8-2.1c6.1-0.5,12.3-1,18.4-1.6 c6.7-0.6,13.4-1.1,20.1-1.7c2.7-0.2,5.4-0.5,8.1-0.7c10.4-0.6,20.9-1.1,31.3-1.7c6.5-0.4,13-0.7,19.5-1.1c2.7-0.1,5.4-0.3,8.1-0.4 c10.3-0.4,20.7-0.8,31-1.2c6.3-0.2,12.5-0.5,18.8-0.7c2.1-0.1,4.2-0.2,6.3-0.2c11.2-0.3,22.3-0.5,33.5-0.8 c6.2-0.1,12.5-0.3,18.7-0.4c2.2-0.1,4.4-0.1,6.7-0.1c11.5-0.1,23-0.2,34.6-0.4c7.2-0.1,14.4-0.1,21.6-0.1c12.2,0,24.5,0.1,36.7,0.1 c2.4,0,4.8,0.1,7.2,0.2c6.8,0.2,13.5,0.4,20.3,0.6c5.1,0.2,10.1,0.3,15.2,0.4c3.6,0.1,7.2,0.4,10.8,0.6c10.6,0.6,21.1,1.2,31.7,1.8 c2.7,0.2,5.4,0.4,8,0.6c2.9,0.2,5.8,0.4,8.6,0.7c0.4,0.1,0.9,0.2,1.3,0.3c1.1,0.2,2.2,0.2,3.2-0.4c0.9-0.5,1.6-1.5,1.9-2.5 c0.6-2.2-0.7-4.5-2.9-5.2c-1.9-0.5-3.9-0.7-5.9-0.9c-1.4-0.1-2.7-0.3-4.1-0.4c-2.6-0.3-5.2-0.4-7.9-0.6 C419.7,3.1,414.8,2.9,409.9,2.6z"
                          ></path>
                        </svg>
                      </span>
                    </span>
                  </h1>
                  <p className="fs-5">
                    Simple, transparent pricing that grows with you. Try any plan free for 30 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-9 col-lg-11 col-md-12">
              <div className="slideToggle position-relative">
                <label className="form-switch">
                  <span className={`beforeinput me-2 font--medium ${!isYearly ? 'text-primary' : ''}`}>
                    MONTHLY
                  </span>
                  <input 
                    type="checkbox" 
                    checked={isYearly} 
                    onChange={handleToggle}
                  />
                  <i></i>
                  <span className={`afterinput ms-2 font--medium ${isYearly ? 'text-primary' : ''}`}>
                    ANNUAL
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="row align-items-center justify-content-center g-4 mt-5">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="col-xl-4 col-lg-4 col-md-6">
                <div className={`card ${plan.highlighted ? 'border border-primary' : 'shadow'} rounded-4`}>
                  {/* Card Header */}
                  <div className="card-header d-flex justify-content-start align-items-center border-bottom py-3 px-4">
                    <span className={`square--60 circle ${plan.iconBgColor}`}>
                      <i className={`${plan.icon} fs-2 ${plan.iconColor}`}></i>
                    </span>
                    <div className="ps-2">
                      <h6 className={`text-uppercase fw-semibold lh-base ${plan.highlighted ? 'text-primary' : ''}`}>
                        {plan.name}
                      </h6>
                      <div className="hstack gap-2">
                        <div className="prcs-currency text-center">
                          <h2 className="fs-1 pricingtable__highlight mb-0">
                            ${isYearly ? plan.pricing.yearly : plan.pricing.monthly}
                          </h2>
                        </div>
                        <span className="h6 mb-0">/ Per User</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body - Features */}
                  <div className="card-body p-4">
                    <ul className="list-unstyled mb-0">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="mb-3">
                          <i className={`fa-regular ${feature.available ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'} me-2`}></i>
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer bg-white py-3 px-4">
                    <button 
                      className={`btn ${plan.buttonClass} fw-medium w-100 mb-0`}
                      onClick={() => handleGetStarted(plan.name)}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="gray-simple rounded-3 py-5 px-xl-5 px-4">
                <h5 className="text-center mb-4 mb-md-5">
                  Trusted by more than 900 companies around the world
                </h5>
                <div className="row align-items-center justify-content-center gx-5 gy-4 row-cols-xl-5 row-cols-lg-5 row-cols-md-5 row-cols-sm-2 row-cols-3">
                  {companies.map((company) => (
                    <div key={company.id} className="col">
                      <div className="client-thumb text-center">
                        <img src={company.logo} className="img-fluid" alt={company.alt} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2>Frequently Asked Questions</h2>
              <p className="mb-0">Perceived end knowledge certainly day sweetness why cordially</p>
            </div>
          </div>

          <div className="row align-items-start">
            <div className="col-xl-12 col-lg-12 col-md-12 mt-4">
              <div className="accordion accordion-flush" id="accordionFlushExample">
                {faqs.map((faq, index) => (
                  <div key={faq.id} className="accordion-item border rounded-2">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${faq.id}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${faq.id}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <div className="py-5 bg-primary">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-8 col-lg-8 col-md-8">
              <h4 className="text-light fw-bold lh-base fs-1 m-0">Still, have a question?</h4>
              <p className="text-light opacity-75 mb-0">
                He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
              </p>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-3">
              <div className="text-md-end">
                <button 
                  className="btn btn-whites text-dark fw-medium" 
                  type="button"
                  onClick={handleContactUs}
                >
                  Contact Us<i className="fa-regular fa-paper-plane ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pricing;