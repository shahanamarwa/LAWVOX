'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { initialProfile } from '@/data/profile';
import { UserProfile } from '@/types';
import {
  User,
  Mail,
  Building2,
  Award,
  Clock,
  BookOpen,
  Bookmark,
  TrendingUp,
  FileText,
  Edit3,
  Shield,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function ProfilePage() {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState(profile.name);
  const [formSalutation, setFormSalutation] = useState(profile.salutation);
  const [formRole, setFormRole] = useState(profile.role);
  const [formEmail, setFormEmail] = useState(profile.email);
  const [formInstitution, setFormInstitution] = useState(profile.institution);
  const [formBarNumber, setFormBarNumber] = useState(profile.barCouncilNumber);
  const [formInterests, setFormInterests] = useState(profile.researchInterests.join(', '));

  const handleOpenEdit = () => {
    setFormName(profile.name);
    setFormSalutation(profile.salutation);
    setFormRole(profile.role);
    setFormEmail(profile.email);
    setFormInstitution(profile.institution);
    setFormBarNumber(profile.barCouncilNumber);
    setFormInterests(profile.researchInterests.join(', '));
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const interestsArray = formInterests.split(',').map((s) => s.trim()).filter(Boolean);

    setProfile((prev) => ({
      ...prev,
      name: formName.trim(),
      salutation: formSalutation.trim(),
      role: formRole.trim(),
      email: formEmail.trim(),
      institution: formInstitution.trim(),
      barCouncilNumber: formBarNumber.trim(),
      researchInterests: interestsArray.length > 0 ? interestsArray : prev.researchInterests,
    }));

    setIsEditModalOpen(false);
    showToast('Advocate profile updated successfully', 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Profile Card Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-purple-800/30">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-purple-500 p-1 shadow-lg">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold font-serif">
                  {profile.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-serif">
                    {profile.salutation} {profile.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" /> Verified Advocate
                  </span>
                </div>

                <p className="text-sm text-purple-200 mt-1 font-medium">
                  {profile.role}
                </p>

                <div className="flex items-center gap-3 text-xs text-purple-300 mt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> {profile.institution}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Bar No: {profile.barCouncilNumber}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="gold"
              size="md"
              onClick={handleOpenEdit}
              leftIcon={<Edit3 className="w-4 h-4" />}
              className="rounded-2xl px-5 font-bold shadow-gold-glow flex-shrink-0"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Listening & Research Statistics Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Precedent Listening Statistics
            </h3>
            <span className="text-xs font-semibold text-slate-400">All Time</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
              <Clock className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-xl font-extrabold text-slate-900">{profile.stats.totalListeningTime}</p>
              <p className="text-xs font-semibold text-slate-500">Total Listening</p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <BookOpen className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-xl font-extrabold text-slate-900">{profile.stats.casesListened}</p>
              <p className="text-xs font-semibold text-slate-500">Cases Listened</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
              <Bookmark className="w-5 h-5 text-amber-600 mb-2" />
              <p className="text-xl font-extrabold text-slate-900">{profile.stats.bookmarksCount}</p>
              <p className="text-xs font-semibold text-slate-500">Bookmarked Cases</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <TrendingUp className="w-5 h-5 text-emerald-600 mb-2" />
              <p className="text-xl font-extrabold text-slate-900">{profile.stats.dailyAverage}</p>
              <p className="text-xs font-semibold text-slate-500">Daily Average</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
              <FileText className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xl font-extrabold text-slate-900">{profile.stats.notesCount}</p>
              <p className="text-xs font-semibold text-slate-500">Notes Created</p>
            </div>
          </div>
        </div>

        {/* Research Areas & Information Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Research Areas */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Constitutional Research Domains
            </h3>
            <p className="text-xs text-slate-500">
              Personalized topics curated for courtroom citations and academic papers
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.researchInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Account & Contact Info */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Chamber & Credentials Information
            </h3>

            <div className="space-y-3 pt-1 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Chamber Email</span>
                <span className="font-bold text-slate-900">{profile.email}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Bar Registration</span>
                <span className="font-bold text-slate-900">{profile.barCouncilNumber}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Affiliated Bar</span>
                <span className="font-bold text-slate-900">{profile.institution}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Advocate Profile"
          subtitle="Update your credentials, chamber email, and research interests"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Salutation
                </label>
                <input
                  type="text"
                  value={formSalutation}
                  onChange={(e) => setFormSalutation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Professional Role / Chamber Title *
              </label>
              <input
                type="text"
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bar Council Enrollment No.
                </label>
                <input
                  type="text"
                  value={formBarNumber}
                  onChange={(e) => setFormBarNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Institution / Bar Association
              </label>
              <input
                type="text"
                value={formInstitution}
                onChange={(e) => setFormInstitution(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Research Interests (Comma separated)
              </label>
              <textarea
                value={formInterests}
                onChange={(e) => setFormInterests(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Profile
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppLayout>
  );
}
