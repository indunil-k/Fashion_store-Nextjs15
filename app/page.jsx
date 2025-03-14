"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel images - assuming you have these images in your public folder
  const carouselImages = [
    {
      src: "/carousel1.jpg",
      title: "Discover Elegance & Comfort",
      subtitle: "Premium Chocolate Creations",
      cta: "Shop Now",
      link: "/shop/1"
    },
    {
      src: "/carousel2.jpg", // Use the same image if you don't have others yet
      title: "Handcrafted Excellence",
      subtitle: "Made with Love and Precision",
      cta: "Explore Collection",
      link: "/shop/featured"
    },
    {
      src: "/carousel3.jpg", // Use the same image if you don't have others yet
      title: "Gifts That Delight",
      subtitle: "Perfect for Every Occasion",
      cta: "Find Gifts",
      link: "/shop/gifts"
    }
  ];

  // Basic carousel controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("./api/getAllProducts");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px] overflow-hidden">
        {carouselImages.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={`Carousel Image ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="absolute inset-0 opacity-70"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {slide.title}
              </h1>
              <p className="text-xl mb-8 text-gray-200 max-w-2xl">
                {slide.subtitle}
              </p>
              <Link
                href={slide.link}
                className="mt-4 px-8 py-3 bg-pink-600 text-white rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <div className="absolute z-20 flex justify-between w-full top-1/2 transform -translate-y-1/2 px-4">
          <button 
            onClick={prevSlide} 
            className="bg-black/30 hover:bg-pink-600/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide} 
            className="bg-black/30 hover:bg-pink-600/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-pink-600 w-6" : "bg-gray-400/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Welcome text */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Store</h2>
        <p className="text-gray-400">
          Explore our wide range of chocolate delights and find the perfect treats for you.
        </p>
      </div>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                <ItemCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading products...</p>
        )}
      </section>

      {/* View All Button */}
      <section>
        <div className="text-center mt-12">
          <Link
            href="/shop/1"
            className="inline-block px-8 py-3 bg-pink-600 text-white rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all hover:shadow-lg hover:shadow-pink-600/20"
          >
            View All
          </Link>
        </div>
      </section>
      
      <br />

      {/* Subscribe Section with improved styling */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-6">Subscribe to Our E-mails</h2>
        <p className="text-gray-400 mb-8">Get exclusive updates and offers straight to your inbox.</p>
        <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto px-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 border border-gray-700 sm:rounded-l-lg rounded-t-lg sm:rounded-t-none bg-gray-900 text-white focus:outline-none focus:border-pink-600 w-full"
          />
          <button className="px-6 py-3 bg-pink-600 text-white sm:rounded-r-lg rounded-b-lg sm:rounded-b-none hover:bg-pink-700 transition-all">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}