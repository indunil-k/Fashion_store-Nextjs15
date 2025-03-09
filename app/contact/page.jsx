import React from "react";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>

      <form className="w-full max-w-2xl space-y-4">
        {/* Name & Email Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Phone Number Field */}
        <input
          type="text"
          placeholder="Phone number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Comment Field */}
        <textarea
          placeholder="Comment"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-red px-6 py-3 rounded-lg hover:bg-red-800 transition-all duration-200"
        >
          Send
        </button>
      </form>

      {/* WhatsApp Floating Icon */}
      {/* <a
        href="https://wa.me/yourwhatsapplink"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M20 3H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
        </svg>
      </a> */}
    </div>
  );
}
