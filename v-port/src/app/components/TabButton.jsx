import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "100%" },
};

const TabButton = ({ active, selectTab, children }) => {
  return (
    <button onClick={selectTab}>
      <p
        className={`mb-2 text-xs sm:text-sm ${
          active ? "text-fg" : "text-fg-muted hover:text-fg"
        }`}
      >
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-0.5 bg-accent"
      />
    </button>
  );
};

export default TabButton;
