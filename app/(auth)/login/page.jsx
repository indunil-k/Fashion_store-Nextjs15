"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login code will be sent to: ${email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">{process.NEXT_PUBLIC_APP_NAME}</h2>

        <h3 className="text-xl font-bold mb-2">Log in</h3>
        <p className="text-gray-400 text-sm mb-4">
          Enter your email and we'll send you a login code
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
