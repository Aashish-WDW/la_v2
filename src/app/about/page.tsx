import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="prose prose-lg">
          <p className="mb-4">
            Welcome to our platform! We are dedicated to providing the best experience
            for our users through innovative solutions and cutting-edge technology.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">
            Our mission is to create a seamless and engaging platform that connects
            people with the content and resources they need.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p className="mb-4">
            We are a team of passionate individuals working together to bring you
            the best possible experience. Our diverse backgrounds and expertise
            allow us to approach challenges from multiple perspectives.
          </p>
        </div>
      </div>
    </main>
  );
} 