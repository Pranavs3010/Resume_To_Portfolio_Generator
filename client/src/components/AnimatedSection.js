// client/src/components/AnimatedSection.js
import React from "react";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  return (
    <div
      ref={ref}
      className={`section-to-animate ${inView ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
