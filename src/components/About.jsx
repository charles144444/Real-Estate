import React from "react";

// You can use Heroicons or similar for icons, but here we'll use emoji for simplicity.
const features = [
  {
    icon: "🏠",
    text: "Comprehensive property listings with up-to-date information and high-quality photos.",
  },
  {
    icon: "🔎",
    text: "Advanced search filters to help you find homes that match your needs and budget.",
  },
  {
    icon: "💬",
    text: "Secure messaging and application tools for seamless communication between renters and landlords.",
  },
  {
    icon: "📚",
    text: "Resources and guides to help you navigate the rental process with confidence.",
  },
  {
    icon: "🛡️",
    text: "Support for landlords, including listing management and tenant screening tools.",
  },
];

const About = () => (
  <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-2 flex items-center justify-center">
    <div className="container mx-auto max-w-2xl bg-white/95 rounded-2xl shadow-xl p-6 border border-gray-200 backdrop-blur">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500 drop-shadow tracking-tight">
        About DevCharles Housing
      </h2>
      <p className="text-gray-700 mb-4 text-base leading-relaxed text-center">
        Welcome to{" "}
        <span className="font-semibold text-blue-600">DevCharles Housing</span>, your
        trusted partner in finding and managing rental properties. Our platform was
        founded with a simple vision: to make property rental simple, transparent,
        and accessible for everyone. Whether you are a tenant searching for your
        next home or a landlord looking to list your property, we are here to
        support you every step of the way.
      </p>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-blue-700 mb-1">Our Story</h3>
        <p className="text-gray-700 leading-relaxed">
          DevCharles Housing was born out of the need for a more user-friendly and
          reliable rental experience. We noticed that many people struggled with
          outdated listings, lack of communication, and confusing processes. Our team
          set out to build a platform that puts people first, leveraging technology
          to bridge the gap between renters and property owners.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">What We Offer</h3>
        <ul className="list-none space-y-2 mt-1 mb-1">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-xl">{feature.icon}</span>
              <span className="text-gray-800">{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-blue-700 mb-1">Our Mission</h3>
        <p className="text-gray-700 leading-relaxed">
          We are committed to making the rental process as smooth and stress-free as
          possible. Our mission is to empower individuals and families to find the
          perfect place to call home, while providing property owners with the tools
          they need to succeed.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Why Choose Us?</h3>
        <p className="text-gray-700 leading-relaxed">
          At DevCharles Housing, we believe in transparency, integrity, and
          innovation. Our platform is designed with your needs in mind, offering a
          safe and supportive environment for all users. We continuously improve our
          services based on your feedback, ensuring that we remain at the forefront
          of the rental industry.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-blue-700 mb-1">Join Our Community</h3>
        <p className="text-gray-700 leading-relaxed">
          Whether you’re searching for a new place to live or looking to rent out
          your property, DevCharles Housing is here to help. Explore our listings,
          connect with our community, and experience a better way to rent.
        </p>
      </div>
      <p className="text-gray-700 text-center text-base mt-6 font-medium">
        Thank you for choosing{" "}
        <span className="text-blue-600 font-bold">DevCharles Housing</span>. Together,
        we’re redefining the rental experience—making it smarter, safer, and more
        enjoyable for everyone.
      </p>
    </div>
  </section>
);

export default About;