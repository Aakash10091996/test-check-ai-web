"use client";
import React, { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useSpring, useTransform } from "framer-motion";

const padding = 130;
const height = padding + 70;

function Counter({ value }: { value: number }) {
  return (
    <span className="z-20 flex overflow-hidden rounded leading-none">
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </span>
  );
}

function Digit({
  place,
  value,
  tenseColor,
  gradientColors,
}: {
  place: number;
  value: number;
  tenseColor?: string;
  gradientColors?: string[];
}) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <span className="relative -mt-8 h-[14rem] w-44 overflow-hidden tabular-nums max-sm:-mt-6 max-sm:h-36 max-sm:w-28">
      {[...Array(10).keys()].map(
        (i: number) =>
          (value >= place || i !== 0) && (
            <Number
              key={i}
              mv={animatedValue}
              number={i}
              tenseColor={tenseColor}
              gradientColors={gradientColors}
            />
          )
      )}
    </span>
  );
}
function Number({
  mv,
  number,
  tenseColor,
  gradientColors,
}: {
  mv: MotionValue;
  number: number;
  tenseColor?: string;
  gradientColors?: string[];
}) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
      24;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className={`absolute flex items-center justify-center  bg-[#7366FF] bg-clip-text text-[16rem] font-black text-transparent max-sm:text-[10rem] ${
        tenseColor && number === 0 ? `text ${tenseColor}` : ""
      }`}
    >
      {gradientColors ? (
        <span className="text-[16rem] font-black text-transparent max-sm:text-[10rem]">
          {number}
        </span>
      ) : (
        number
      )}
    </motion.span>
  );
}

export default function AnimatedSpeedUpComponent() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < 45) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 150);

    return () => clearInterval(timer);
  }, [count]);

  return <Counter value={count} />;
}
