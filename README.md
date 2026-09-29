# CAREERLINK — Labour-Market Intelligence & Curriculum Alignment Platform

**Smart India Hackathon 2026**  
**Problem Statement ID:** PS-26134  
**Team:** NexGen  
**Theme:** Labour-Market Intelligence & Technical Education Alignment (Polytechnic / ITI / Engineering)

---

## Executive Summary

**CAREERLINK** is an enterprise closed-loop Labour-Market Intelligence (LMI) and Automated Curriculum Alignment platform designed for State Directorates of Technical Education (DoTE) and Vocational Councils. It dynamically parses real-time job openings, identifies emerging competency clusters, calculates 3-layer skill divergence gaps (Industry Demand vs. Syllabi vs. Trainee Competence), and proposes Explainable AI (XAI) laboratory course modifications with decentralized employer quorum consensus.

---

## Key Modules & Visual Hierarchy

1. **Header & Global Status Bar:**
   - Real-time indexing telemetry (12,480 job postings indexed across 18 public and enterprise boards).
   - Engine status indicators (Labour Market Engine: ONLINE, Curriculum Alignment Engine: ONLINE).
   - Role Selector for 5 institutional personas (District Planner, Curriculum Director, Industry Evaluator, State Admin, Student/Trainee).

2. **Core Intelligence Feedback Loop:**
   - 8-stage synchronized pipeline:
     `01 Labour Demand (+18.4%)` → `02 Skills Detected (632)` → `03 Skill Gaps (41.2%)` → `04 AI Curriculum (28 Recs)` → `05 Employer Validation (89%)` → `06 Capacity Deficit (-1,700)` → `07 Career Guidance (Active)` → `08 Placement Rate (78.2%)`

3. **KPI Intelligence Matrix:**
   - Jobs Analyzed (12,480) with dynamic micro-sparklines.
   - Active Roles (148) & Critical Divergent Roles (42).
   - Employer Signal Quorum (37 Corporations, 89.4% Consensus).

4. **Demand vs. Training Output:**
   - Interactive time-series area chart tracking monthly market vacancies (12,480/mo) vs. certified polytechnic graduates (8,210/mo).
   - Algorithmic Monte Carlo capacity simulation modal (`Model Projections →`).

5. **Urgent Action Center:**
   - Critical Gap: Docker & Containerization Omission in DCE-302 (Review in XAI Advisor).
   - Capacity Bottleneck: Coimbatore District -1,700 Seat Shortfall (Allocate Capital Grant Modal).
   - Employer Consensus: TCS & Infosys Syllabus Audit Quorum (Audit Notes Drawer).

6. **Fastest Accelerating Skills:**
   - Prompt Engineering (+48%), Node.js (+34%), Docker (+31%), PyTorch (+29%), Kubernetes (+26%).

7. **District Priority Heatmap & GIS Planner:**
   - Spatial technical infrastructure and trainer shortage density across Coimbatore, Chennai, Pune, Bengaluru, and Madurai.

8. **3-Layer Skill Gap Analysis:**
   - Tri-axial comparison: Live Industry Demand % vs. State Syllabus Coverage % vs. Trainee Exit Practical Passing Score %.

9. **AI Curriculum Advisor & XAI Explainability Drawer:**
   - Automated syllabus modernization proposals (ADD, UPDATE, EXPAND, RESTRUCTURE).
   - Week-by-week laboratory practical syllabus blueprints and NSQF credit mappings.

10. **Employer Quorum Validation:**
    - Decentralized voting portal allowing engineering leaders from TCS, Infosys, Zoho, Bosch, and L&T to audit, approve, or request revisions.

11. **Student Career Guidance & 7-Stage Roadmap:**
    - Personalized roadmap matching:
      `Current Skills` → `Foundation` → `Core Skills` → `Advanced Skills` → `Capstone Project` → `Employer Mock Review` → `Job Ready`

12. **Emerging Tech Radar:**
    - Horizon scanning across Generative AI, Cloud-Native, EV Powertrains, Cybersecurity SOC, Edge AI, ROS 2, and RISC-V VLSI.

---

## Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS with enterprise color system
- **Icons:** Lucide React
- **Data Visualization:** Recharts + Custom SVG Sparklines
- **Routing:** React Router v7

---

## Getting Started

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---

## Architectural Extensibility

CAREERLINK features a dedicated service client layer (`src/services/api.ts`, `labourMarketApi.ts`, `skillsApi.ts`, `curriculumApi.ts`, `careerApi.ts`) designed for plug-and-play integration with a Node.js/Express or FastAPI backend.
