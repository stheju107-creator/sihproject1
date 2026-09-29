import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareerGuidance } from '../hooks/useCareerGuidance';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import {
  Compass,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const CareerGuidance: React.FC = () => {
  const navigate = useNavigate();
  const { pathways, loading, analyzing, analyzeProfile } = useCareerGuidance();

  // Student Profile State
  const [education, setEducation] = useState('Final Year Diploma in Computer Engineering');
  const [inputSkills, setInputSkills] = useState('JavaScript, Node.js Basics, Git, SQL');
  const [interests, setInterests] = useState('Cloud Computing, Backend APIs, AI systems');
  const [location, setLocation] = useState('Coimbatore / Chennai');
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = inputSkills.split(',').map((s) => s.trim()).filter(Boolean);
    await analyzeProfile({
      education,
      skills: skillsArray,
      interests,
      location,
    });
    setIsAnalyzed(true);
  };

  if (loading) {
    return <LoadingSkeleton type="card" rows={4} />;
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              STUDENT CAREER GUIDANCE & DYNAMIC PATHWAY ENGINE
            </h1>
            <Badge variant="teal">NSQF CAREER MATRIX</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Personalized competency matching connecting student skill profile to high-velocity industry roles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" dot>7-STAGE ROADMAP GENERATOR</Badge>
        </div>
      </div>

      {/* Student Profile Input Card */}
      <form
        onSubmit={handleAnalyze}
        className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            Trainee Competency Profile Evaluator
          </h3>
          <span className="text-2xs font-mono text-slate-400">Profile ID: STU-2026-COIMBATORE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
              Current Education / Diploma
            </label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs text-slate-900 font-medium"
            >
              <option value="Final Year Diploma in Computer Engineering">Diploma in Computer Engineering (DCE)</option>
              <option value="Diploma in Information Technology">Diploma in Information Tech (DIT)</option>
              <option value="Diploma in AI & Data Science">Diploma in AI & ML (DAI)</option>
              <option value="Diploma in Electrical & Electronics">Diploma in Electrical (DEEE)</option>
            </select>
          </div>

          <div>
            <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
              Acquired Skills (Comma separated)
            </label>
            <input
              type="text"
              value={inputSkills}
              onChange={(e) => setInputSkills(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
              placeholder="e.g. JavaScript, Python, Linux..."
            />
          </div>

          <div>
            <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
              Domain Interests
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
              placeholder="e.g. Cloud, Backend, Robotics..."
            />
          </div>

          <div>
            <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
              Preferred Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
              placeholder="e.g. Coimbatore, Chennai..."
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <Button
            type="submit"
            variant="teal"
            size="sm"
            loading={analyzing}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            {analyzing ? 'Computing Skill Match...' : 'Analyze Career Path'}
          </Button>
        </div>
      </form>

      {/* Recommendations Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
            RECOMMENDED CAREER PATHWAYS ({pathways.length} ALIGNED PATHS)
          </h3>
          {isAnalyzed && (
            <Badge variant="emerald" dot>Recalculated with Live Market Weights</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {pathways.map((path) => (
            <div
              key={path.id}
              onClick={() => navigate(`/career-path/${path.id}`)}
              className="bg-white border border-slate-200 rounded-md p-4 shadow-card hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="blue">{path.domain}</Badge>
                  <span className="text-2xs font-mono font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                    {path.matchPct}% Match
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between">
                  <span>{path.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
                </h4>

                <p className="text-2xs text-slate-500 mt-1 line-clamp-2 font-sans">{path.overview}</p>
              </div>

              {/* Progress and Missing Skills */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <div className="flex justify-between text-2xs font-mono mb-1">
                    <span className="text-slate-500">Curriculum Skill Match</span>
                    <span className="font-bold text-slate-800">{path.matchPct}%</span>
                  </div>
                  <ProgressBar value={path.matchPct} variant="gradient" size="xs" />
                </div>

                <div>
                  <span className="text-2xs font-mono uppercase text-rose-600 font-bold block mb-1">
                    Missing Competencies to Acquire:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {path.missingSkills.map((sk) => (
                      <span
                        key={sk}
                        className="px-1.5 py-0.2 bg-rose-50 text-rose-800 border border-rose-200 rounded text-2xs font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-2xs font-mono uppercase text-slate-400 font-bold block mb-1">
                    Recommended Bridge Courses:
                  </span>
                  <div className="text-2xs font-mono text-slate-700 space-y-0.5">
                    {path.recommendedCourses.map((c) => (
                      <div key={c} className="truncate">• {c}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs font-mono text-slate-500">
                <span>Avg Salary: <strong className="text-slate-900">{path.avgSalary}</strong></span>
                <span className="text-emerald-700 font-bold">{path.growthRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
