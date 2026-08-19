import React from "react";
import ThemeToggle from "./ThemeToggle";

const skills = ["Go", "Python", "AWS", "DSA", "Kafka", "Redis", "Postgres", "ML"];

const ProfileHeader = () => {
  return (
    <header className="flex items-start justify-between gap-6 pt-12 pb-6 sm:pt-16">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-accent sm:text-2xl">
          Vaishnavi Tiwari
        </h1>
        <p className="mt-1.5 text-[10px] uppercase tracking-widest text-fg-muted sm:text-[11px]">
          Backend Engineer 

        </p>

        <p className="mt-1.5 flex flex-wrap items-center text-[10px] uppercase tracking-widest text-fg-muted sm:text-[11px]">
          {skills.map((skill, i) => (
            <React.Fragment key={skill}>
              {i > 0 && <span className="mx-2 text-border">|</span>}
              {skill}
            </React.Fragment>
          ))}
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default ProfileHeader;
