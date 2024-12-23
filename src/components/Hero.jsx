import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="h-[500px] w-full relative overflow-hidden">
      <Image
        fill
        src="https://img.freepik.com/free-photo/robot-hand-3d-background-presenting-technology-gesture_53876-143119.jpg?t=st=1733576717~exp=1733580317~hmac=1f41a42225509f2750e66b84d911e9faa05c1fd5e8b97e5b0fca2aed2c151366&w=740"
        alt="background image"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" /> {/* Overlay for better text visibility */}
      <div className="container mx-auto text-center relative z-10 h-full flex flex-col justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold p-4">
          Learning Management System
        </h1>
        <p className="px-4 md:px-10 text-xl text-gray-100 max-w-5xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
          quibusdam rem quas deleniti ducimus tempore. Praesentium ducimus tempore obcaecati est perferendis dicta, accusamus
          explicabo soluta eligendi modi maxime?
        </p>
      </div>
    </section>
  );
}

export default Hero;

