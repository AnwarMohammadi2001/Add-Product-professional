import React, { useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AddContext } from "../Context/AddContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Animation variants (you can move to utils/framermotion/variants.js)
const contentContainer = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.3 },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HeroSlider = () => {
  const { sliderImage, sliderLoading } = useContext(AddContext);

  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [progress, setProgress] = useState(0);

  if (sliderLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <p className="text-xl font-semibold">Loading slider...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] md:h-[400px] lg:h-[690px]  relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        slidesPerView={1}
        loop={true}
        spaceBetween={0}
        speed={1500}
        navigation={{
          prevEl,
          nextEl,
        }}
        grabCursor={true}
        className="overflow-visible shadow-lg cursor-pointer h-full relative"
        onAutoplayTimeLeft={(_, __, progressRatio) => {
          setProgress(1 - progressRatio);
        }}
      >
        {sliderImage?.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={contentContainer}
              initial="hidden"
              animate="show"
              className="w-full h-full md:h-[400px] lg:h-[690px] bg-cover bg-center relative flex md:pt-0 items-center justify-center"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>

              <motion.div
                variants={contentContainer}
                initial="hidden"
                animate="show"
                className="relative z-10 px-6 md:px-16 text-white flex flex-col items-center space-y-4 max-w-2xl"
              >
                <motion.h2
                  variants={contentItem}
                  className="text-2xl md:text-4xl mb-4 font-bold"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  variants={contentItem}
                  className="text-sm md:text-base mb-4"
                >
                  {slide.desc}
                </motion.p>
                <motion.div
                  variants={contentItem}
                  className="flex flex-col md:flex-row gap-5 items-center"
                >
                  <Link
                    to="/quote"
                    className="text-lg font-bold text-center cursor-pointer text-black bg-white py-3 rounded-full transition duration-300 px-10"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="absolute bottom-[100px] md:bottom-[190px] md:top-2/3 right-1/2 translate-x-1/2 md:right-16 md:translate-x-0 z-20 flex md:flex-col gap-10 group">
        <button
          ref={(node) => setNextEl(node)}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Next Slide"
          className="p-4 items-center justify-center rounded-full border border-white text-white shadow-md cursor-pointer hidden hover:bg-white hover:text-black group-hover:flex transition"
        >
          <MdArrowForwardIos size={24} />
        </button>

        <button
          ref={(node) => setPrevEl(node)}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Previous Slide"
          className="p-4 hidden items-center justify-center rounded-full border border-white text-white shadow-md cursor-pointer hover:bg-white hover:text-black group-hover:flex transition"
        >
          <MdArrowBackIos size={24} />
        </button>
      </div>

      {/* Circular progress indicator */}
      <div className="absolute bottom-5 left-10 z-20">
        <svg className="w-14 h-14 -rotate-90">
          <circle
            className="text-gray-400"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="24"
            cx="28"
            cy="28"
          />
          <circle
            className="text-white"
            strokeWidth="4"
            strokeDasharray={2 * Math.PI * 24}
            strokeDashoffset={2 * Math.PI * 24 * (1 - progress)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="24"
            cx="28"
            cy="28"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlider;
