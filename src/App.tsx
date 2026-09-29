import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { AuthLayout } from './components/layout/AuthLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { LabourIntelligence } from './pages/LabourIntelligence';
import { JobRoles } from './pages/JobRoles';
import { RoleDetails } from './pages/RoleDetails';
import { SkillIntelligence } from './pages/SkillIntelligence';
import { SkillDetails } from './pages/SkillDetails';
import { SkillGraph } from './pages/SkillGraph';
import { SkillGapAnalysis } from './pages/SkillGapAnalysis';
import { CurriculumAdvisor } from './pages/CurriculumAdvisor';
import { CurriculumDetails } from './pages/CurriculumDetails';
import { EmployerValidation } from './pages/EmployerValidation';
import { TrainingCapacity } from './pages/TrainingCapacity';
import { DistrictPlanning } from './pages/DistrictPlanning';
import { DistrictDetails } from './pages/DistrictDetails';
import { CareerGuidance } from './pages/CareerGuidance';
import { CareerPathDetails } from './pages/CareerPathDetails';
import { EmergingTechRadar } from './pages/EmergingTechRadar';
import { Reports } from './pages/Reports';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Layout Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main Application Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Labour Intelligence */}
          <Route path="/labour-intelligence" element={<LabourIntelligence />} />
          <Route path="/job-roles" element={<JobRoles />} />
          <Route path="/job-roles/:id" element={<RoleDetails />} />
          
          {/* Skills & Graph */}
          <Route path="/skills" element={<SkillIntelligence />} />
          <Route path="/skills/:id" element={<SkillDetails />} />
          <Route path="/skill-graph" element={<SkillGraph />} />
          
          {/* Gap & Curriculum Alignment */}
          <Route path="/skill-gap-analysis" element={<SkillGapAnalysis />} />
          <Route path="/curriculum-advisor" element={<CurriculumAdvisor />} />
          <Route path="/curriculum/:id" element={<CurriculumDetails />} />
          <Route path="/employer-validation" element={<EmployerValidation />} />
          
          {/* District & Capacity Planning */}
          <Route path="/training-capacity" element={<TrainingCapacity />} />
          <Route path="/district-planning" element={<DistrictPlanning />} />
          <Route path="/district/:id" element={<DistrictDetails />} />
          
          {/* Career Guidance & Tech Radar */}
          <Route path="/career-guidance" element={<CareerGuidance />} />
          <Route path="/career-path/:id" element={<CareerPathDetails />} />
          <Route path="/emerging-tech" element={<EmergingTechRadar />} />
          
          {/* Operations & Reports */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
