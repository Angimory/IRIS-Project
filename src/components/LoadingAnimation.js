import React, { useState, useEffect } from "react";
import '../App.css';
const LoadingAnimation = () => {
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === "Loading...") {
          return "Loading.";
        } else if (prevText === "Loading.") {
          return "Loading..";
        } else if (prevText === "Loading..") {
          return "Loading...";
        } else {
          return "Loading...";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <h2 className="text-main">{loadingText}</h2>;
};

export default LoadingAnimation;
