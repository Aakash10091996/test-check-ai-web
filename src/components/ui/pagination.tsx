import { Testimonials } from "@/constants/testimonials";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

interface PaginationProps {
  activeIndex: number;
  onNavigate: (index: number) => void; // Function to call when a pagination dot is clicked
}

const Pagination: React.FC<PaginationProps> = ({ activeIndex, onNavigate }) => {
  return (
    <div className="flex mt-6 justify-center space-x-2">
      {Testimonials.map((val, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === activeIndex ? "bg-lightGreyText w-4" : "bg-input"
          }`}
          aria-label={`Go to slide ${index}`}
          onClick={() => onNavigate(index)}
        />
      ))}
    </div>
  );
};

export default Pagination;
