import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import type { ChangeEvent } from "react";
import { StringPromptArray } from "@/utils/randomPrompt";

interface AnimatedTextAreaProps {
  element?: string;
  speed?: number;
  pause?: number;
  placeholderSequence?: string[];
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  autocomplete?: boolean;
  value: string;
  handleSubmit: (arg: string) => void;
  component?: string;
  isTop?: boolean;
}

const AnimatedTextArea: React.FC<AnimatedTextAreaProps> = ({
  element = "textarea",
  value,
  speed = 120,
  pause = 1000,
  placeholderSequence = StringPromptArray,
  className = "",
  style = {},
  onChange,
  handleSubmit,
  autocomplete = false,
  isTop,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [text, setText] = useState("");
  const [inputWidth, setInputWidth] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const updateInputWidth = () => {
      if (inputRef.current && element === "input") {
        setInputWidth(inputRef.current.offsetWidth);
      }
    };

    updateInputWidth();
    window.addEventListener("resize", updateInputWidth);

    return () => window.removeEventListener("resize", updateInputWidth);
  }, [element]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setPlaceholder((prev) => prev.substring(0, prev.length - 1));
          setCharIndex((prev) => prev - 1);
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % placeholderSequence.length);
      }
    } else {
      if (charIndex < (placeholderSequence[currentIndex] ?? "").length) {
        const newPlaceholder =
          placeholder + (placeholderSequence[currentIndex] ?? "").charAt(charIndex);
        if (element !== "input" || (element === "input" && newPlaceholder.length <= inputWidth)) {
          timer = setTimeout(() => {
            setPlaceholder(newPlaceholder);
            setCharIndex((prev) => prev + 1);
          }, speed);
        } else {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, pause);
        }
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    }

    return () => clearTimeout(timer);
  }, [
    placeholder,
    currentIndex,
    charIndex,
    placeholderSequence,
    speed,
    pause,
    isDeleting,
    element,
    inputWidth,
  ]);

  useEffect(() => {
    if (inputRef.current && isTop) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);
  useLayoutEffect(() => {
    setInputWidth(
      inputRef.current?.getBoundingClientRect().width
        ? inputRef.current?.getBoundingClientRect().width
        : 0
    );
  }, []);
  const onEnterHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(text);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!placeholder) {
      setPlaceholder("");
    }
  };
  const handleClick = () => {
    setIsFocused(true);
    setIsClicked(true);
    if (!placeholder) {
      setPlaceholder("");
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
    if (!isFocused) {
      setPlaceholder("");
    }
  };

  const elementProps = {
    ref: inputRef,
    className: `${className} placeholder-cursor`,
    "data-hj-allow": true,
    style: {
      ...style,
      overflow: "auto",
      resize: "none",
      border: "none",
      outline: "none",
      background: "transparent",
    },
    placeholder: isFocused && isClicked ? "" : placeholder,
    value: text,
    onChange: handleChange,
    onKeyPress: onEnterHandler,
    onFocus: handleFocus,
    onClick: handleClick,
    onBlur: handleBlur,
    autoFocus: isTop,
    autoComplete: autocomplete ? "on" : "off",
    ...rest,
  };

  return React.createElement(element, elementProps);
};

AnimatedTextArea.propTypes = {
  speed: PropTypes.number,
  pause: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  autocomplete: PropTypes.bool,
};

export default AnimatedTextArea;
