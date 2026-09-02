'use client';

import React, { useState, useEffect } from 'react';
import { LawvoxAPI } from '../../services/api';
import { FileText, Plus, Trash2, Clock, Scale } from 'lucide-react';

interface NoteItem {
  id: number;
  title: string;
  case_id: string;
  case_name?: string;
  citation?: string;
  content: string;
  created_at: string;
}

export const NotesView: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [caseId, setCaseId] = useState('kesavananda-bharati');
  const [content, setContent] = useState('');

  const loadNotes = async () => {
    const data = await LawvoxAPI.getNotes();
    if (data) {
      setNotes(data);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await LawvoxAPI.createNote({
      title: title.trim(),
      case_id: caseId,
      content: content.trim(),
    });

    setTitle('');
    setContent('');
    setIsCreating(false);
    loadNotes();
  };

  const handleDelete = async (id: number) => {
    await LawvoxAPI.deleteNote(id);
    loadNotes();
  };

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <FileText className="w-5 h-5 text-purple-600" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                My Legal Notes & Annotations
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Synchronized case briefs, courtroom arguments, and constitutional cross-references.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreating(!isCreating)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            {isCreating ? 'Cancel' : 'New Research Note'}
          </button>
        </div>

        {/* Create Note Form */}
        {isCreating && (
          <form onSubmit={handleCreate} className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-serif">Create New Research Note</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ratio on Article 19(1)(a)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Linked Landmark Case</label>
                <select
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500 bg-white"
                >
                  <option value="kesavananda-bharati">Kesavananda Bharati v. State of Kerala (1973)</option>
                  <option value="maneka-gandhi">Maneka Gandhi v. Union of India (1978)</option>
                  <option value="puttaswamy">Justice K.S. Puttaswamy v. Union of India (2017)</option>
                  <option value="vishaka">Vishaka v. State of Rajasthan (1997)</option>
                  <option value="shreya-singhal">Shreya Singhal v. Union of India (2015)</option>
                  <option value="indian-young-lawyers">Indian Young Lawyers Association (2018)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Note Content & Analysis</label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your case brief, ratio points, and citation arguments..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm"
              >
                Save Note to Database
              </button>
            </div>
          </form>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900 font-serif">{note.title}</h3>
                  <button
                    type="button"
                    onClick={() => handleDelete(note.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {note.case_name && (
                  <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold mb-3">
                    <Scale className="w-3.5 h-3.5" />
                    <span>{note.case_name}</span>
                  </div>
                )}
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{note.content}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Saved in lawvox.db
                </span>
                <span>Note #{note.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
