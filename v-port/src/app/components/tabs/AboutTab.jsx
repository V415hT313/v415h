"use client";
import React, { useState } from "react";
import TabButton from "../TabButton";

const SKILL_GROUPS = [
  { label: "Languages", items: ["Go", "Python", "SQL"] },
  { label: "Backend", items: ["REST APIs", "Gin", "Kafka", "WebSockets", "Microservices"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "Redis", "DynamoDB"] },
  {
    label: "DevOps / Cloud",
    items: ["AWS (EC2, Lambda, S3, SNS, IAM, ECR)", "Docker", "Kubernetes", "CI/CD"],
  },
  { label: "Monitoring", items: ["Elasticsearch", "Kibana", "Grafana", "ELK Stack"] },
  {
    label: "Other",
    items: ["Distributed Systems", "Event-Driven Architecture", "DSA", "Linux", "Git"],
  },
];

const EXPERIENCE = [
  {
    company: "Techmojo Solutions",
    role: "Member of Technical Staff (Backend Developer)",
    location: "Hyderabad, Telangana",
    dates: "Aug 2025 — Jun 2026",
    bullets: [
      "Built a Go based adapter service to ingest and transform player props betting data, publishing events to Kafka for downstream systems with 99.99% service availability.",
      "Developed backend services for betting market creation, updates, and expiration, maintaining market update latency below 35ms.",
      "Optimized a Kafka based event processing pipeline to handle 30,000+ messages/min, reducing end-to-end latency from 1257ms to 83ms through performance profiling, code optimization, and architectural improvements.",
      "Built an internal monitoring and observability service for Kafka consumer lag and system health, enabling proactive issue detection and reducing operational overhead.",
      "Established centralized logging using Elasticsearch and developed monitoring dashboards in Kibana and Grafana, reducing production debugging time by 80%.",
      "Replaced synchronous REST based communication with Kafka based asynchronous messaging, improving reliability, fault tolerance, and system scalability.",
      "Integrated backend support for 20+ sports into a cloud native SaaS betting platform, expanding platform capabilities while maintaining production stability.",
    ],
  },
  {
    company: "IPexcel",
    role: "Software Developer (Backend)",
    location: "Bengaluru, Karnataka",
    dates: "Apr 2024 — Jul 2025",
    bullets: [
      "Built backend services using Go (Golang) and the Gin framework, reducing API response time by 30% while improving application reliability.",
      "Developed multiple AWS Lambda functions for document automation, including PDF text/image extraction, DOCX/PPT processing using an ECR hosted container, and diarization based audio/video transcription with 95% accuracy.",
      "Implemented secure authentication using JWT and Role Based Access Control (RBAC), reducing unauthorized access by 40%.",
      "Containerized backend services using Docker and Docker Compose, reducing development and deployment effort by 15% while improving team productivity.",
      "Built cloud native microservices integrated with AWS S3, Lambda, EC2, SNS, and DynamoDB, improving system reliability and reducing production downtime by 40%.",
    ],
  },
];

const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted">
    <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
    {children}
  </span>
);

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label}>
            <h4 className="mb-2 text-sm font-medium text-fg">{group.label}</h4>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <div className="space-y-6">
        {EXPERIENCE.map((job) => (
          <div key={job.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <h4 className="text-sm font-medium text-fg">
                {job.role} <span className="font-normal text-fg-muted">· {job.company}</span>
              </h4>
              <span className="text-[11px] text-fg-muted">{job.dates}</span>
            </div>
            <p className="text-[11px] text-fg-muted">{job.location}</p>
            <ul className="bullet-list mt-2 text-sm text-fg-muted">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <div>
        <h4 className="text-sm font-medium text-fg">
          Bachelor of Technology (CSE) <span className="font-normal text-fg-muted">· 7.8 CGPA</span>
        </h4>
        <p className="mt-1 text-[11px] text-fg-muted">
          Galgotias University, Greater Noida <span className="mx-1.5">·</span> Aug 2019 – May 2023
        </p>
      </div>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <div className="flex flex-wrap gap-1.5">
        {[
          "Smart India Hackathon (SIH) — 2019",
          "Dextrix 2.0 — 2019",
          "Ethical Hacking Workshop — 2020, IIT Roorkee",
        ].map((cert) => (
          <Chip key={cert}>{cert}</Chip>
        ))}
      </div>
    ),
  },
];

const AboutTab = () => {
  const [tab, setTab] = useState("skills");

  return (
    <div className="py-8">
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">
        Backend Engineer with 2+ years of experience in Go, Python, distributed systems, AWS, Kafka, and event-driven architecture. Experienced in building high-performance services, optimizing latency, and maintaining reliable production systems. Currently focused on deepening expertise in distributed systems design.
      </p>

      <div className="mt-8 flex flex-row flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4">
        {TAB_DATA.map((t) => (
          <TabButton key={t.id} selectTab={() => setTab(t.id)} active={tab === t.id}>
            {t.title}
          </TabButton>
        ))}
      </div>

      <div className="mt-6 text-fg-muted">
        {TAB_DATA.find((t) => t.id === tab).content}
      </div>
    </div>
  );
};

export default AboutTab;
