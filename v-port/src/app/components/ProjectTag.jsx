import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  return (
    <button
      className={`rounded-full border px-4 py-1.5 text-xs transition-colors sm:text-sm ${
        isSelected
          ? "border-accent text-accent"
          : "border-border text-fg-muted hover:border-fg-muted hover:text-fg"
      }`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
