import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { skillsApi } from '../services/skillsApi';
import { Skill } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { ErrorState } from '../components/ui/ErrorState';
import {
  ArrowLeft,
  Briefcase,
  BookOpen,
  Award,
  Building,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const SkillDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSkill() {
      try {
        setLoading(true);
        const data = await skillsApi.getSkillById(id || 'skill-docker-cont');
        if (data) {
          setSkill(data);
        } else {
          setError('Skill competency profile not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch skill details');
      } finally {
        setLoading(false);
      }
    }
    loadSkill();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton type="table" rows={6} />;
  }

  if (error || !skill) {
    return (
      <ErrorState
        title="Skill Not Found"
        message={error || 'Could not find ontology record for this skill.'}
        onRetry={() => navigate('/skills')}
      />
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="xs"
            onClick={() => navigate('/skills')}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Skills
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono">
                {skill.name}
              </h1>
              <Badge variant="teal">{skill.category}</Badge>
              <Badge variant="emerald">{skill.growth} Velocity</Badge>
            </div>
            <p className="text-2xs font-mono text-slate-500 mt-0.5">
              Ontology Node: {skill.id} • {skill.bloomLevel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="teal"
            size="xs"
            onClick={() => navigate('/skill-graph')}
            icon={<Layers className="w-3.5 h-3.5" />}
          >
            Explore in Skill Graph
          </Button>
          <Button
            variant="primary"
            size="xs"
            onClick={() => navigate('/curriculum-advisor')}
            icon={<BookOpen className="w-3.5 h-3.5" />}
          >
            Curriculum Alignment Advisor
          </Button>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Live Market Demand</span>
          <span className="text-lg font-bold font-mono text-teal-700">{skill.demandPct}%</span>
          <ProgressBar value={skill.demandPct} variant="teal" size="xs" className="mt-1" />
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Curriculum Coverage</span>
          <span className="text-lg font-bold font-mono text-rose-700">{skill.curriculumCoveragePct}%</span>
          <ProgressBar value={skill.curriculumCoveragePct} variant="rose" size="xs" className="mt-1" />
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">State Syllabus Deficit</span>
          <span className="text-lg font-bold font-mono text-rose-600">-{skill.gapPct}%</span>
          <span className="text-2xs font-mono text-slate-400 block mt-1">Severe institutional omission</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Momentum Index</span>
          <span className="text-lg font-bold font-mono text-slate-900">{skill.momentumScore}/100</span>
          <span className="text-2xs font-mono text-emerald-700 block mt-1">High hiring acceleration</span>
        </div>
      </div>

      {/* Description & Competency Taxonomy */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
          COMPETENCY DEFINITION & SCOPE
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">{skill.description}</p>
        
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 items-center text-xs">
          <span className="text-2xs font-mono uppercase text-slate-400 font-bold">Related Skills:</span>
          {skill.relatedSkills.map((rs) => (
            <span
              key={rs}
              onClick={() => navigate(`/skills?q=${encodeURIComponent(rs)}`)}
              className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-2xs font-mono text-slate-700 hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300 cursor-pointer transition-colors"
            >
              {rs}
            </span>
          ))}
        </div>
      </div>

      {/* Target Occupational Roles + Related State Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Connected Occupational Roles */}
        <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-700" />
              Connected Occupational Roles ({skill.relatedRoles.length})
            </h3>
            <Badge variant="blue">MAPPED</Badge>
          </div>

          <div className="space-y-2">
            {skill.relatedRoles.map((role) => (
              <div
                key={role.id}
                onClick={() => navigate(`/job-roles/${role.id}`)}
                className="p-2.5 bg-slate-50/70 border border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 hover:text-teal-700">{role.title}</div>
                  <div className="text-2xs font-mono text-slate-500">Match Affinity Score</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-teal-700">{role.matchPct}%</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing State Syllabi Coverage */}
        <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-700" />
              State Polytechnic & ITI Syllabi Mapping
            </h3>
            <Badge variant="rose">DEFICIENT</Badge>
          </div>

          <div className="space-y-2">
            {skill.relatedCourses.map((course) => (
              <div
                key={course.id}
                className="p-2.5 bg-slate-50/70 border border-slate-200 rounded flex flex-col justify-between text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{course.name}</span>
                  <Badge variant="slate">{course.instituteType}</Badge>
                </div>
                <div className="flex items-center justify-between text-2xs font-mono text-slate-500">
                  <span>Syllabus Coverage:</span>
                  <span className="font-bold text-rose-700">{course.coverage}% Covered</span>
                </div>
                <ProgressBar value={course.coverage} variant="rose" size="xs" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications & Industry Adoption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Industry Certifications */}
        <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            Recognized Global & Industry Certifications
          </h3>
          <div className="space-y-2">
            {skill.certifications.map((cert) => (
              <div key={cert} className="p-2.5 bg-teal-50/40 border border-teal-200/70 rounded text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span className="font-medium text-slate-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Hiring Share */}
        <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            Top Hiring Employers for this Skill
          </h3>
          <div className="space-y-2">
            {skill.industryAdoption.map((emp) => (
              <div key={emp.company} className="flex items-center justify-between text-xs p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-semibold text-slate-800">{emp.company}</span>
                <span className="font-mono text-2xs font-bold text-slate-700">{emp.demandShare}% of openings</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
