'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { initialNotes } from '@/data/notes';
import { mockCases } from '@/data/cases';
import { ResearchNote } from '@/types';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  Check,
  ExternalLink,
} from 'lucide-react';

export default function NotesPage() {
  const { showToast } = useToast();
  const [notes, setNotes] = useState<ResearchNote[]>(initialNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState('all');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<ResearchNote | null>(null);
  const [viewingNote, setViewingNote] = useState<ResearchNote | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCaseId, setFormCaseId] = useState(mockCases[0].id);
  const [formChapter, setFormChapter] = useState('');
  const [formTimestamp, setFormTimestamp] = useState('00:00');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');

  const filteredNotes = notes.filter((n) => {
    if (selectedCaseFilter !== 'all' && n.caseId !== selectedCaseFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.caseTitle.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenCreate = () => {
    setEditingNote(null);
    setFormTitle('');
    setFormCaseId(mockCases[0].id);
    setFormChapter('General Notes');
    setFormTimestamp('00:00');
    setFormContent('');
    setFormTags('Constitutional Law, Precedent');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (note: ResearchNote) => {
    setEditingNote(note);
    setFormTitle(note.title);
    setFormCaseId(note.caseId);
    setFormChapter(note.chapterTitle || '');
    setFormTimestamp(note.timestamp || '00:00');
    setFormContent(note.content);
    setFormTags(note.tags.join(', '));
    setIsCreateModalOpen(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('Please provide a title and note content', 'error');
      return;
    }

    const matchedCase = mockCases.find((c) => c.id === formCaseId) || mockCases[0];
    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingNote) {
      // Update existing
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? {
                ...n,
                title: formTitle.trim(),
                caseId: formCaseId,
                caseTitle: matchedCase.shortTitle,
                chapterTitle: formChapter,
                timestamp: formTimestamp,
                content: formContent.trim(),
                tags: tagsArray,
              }
            : n
        )
      );
      showToast('Research note updated successfully', 'success');
    } else {
      // Create new
      const newNote: ResearchNote = {
        id: `note-${Date.now()}`,
        title: formTitle.trim(),
        caseId: formCaseId,
        caseTitle: matchedCase.shortTitle,
        chapterTitle: formChapter || 'Chapter Notes',
        timestamp: formTimestamp || '00:00',
        dateCreated: 'Today',
        content: formContent.trim(),
        tags: tagsArray.length > 0 ? tagsArray : ['Constitutional Law'],
      };
      setNotes((prev) => [newNote, ...prev]);
      showToast('New research note created', 'success');
    }

    setIsCreateModalOpen(false);
  };

  const handleDeleteNote = (id: string, title: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (viewingNote?.id === id) setViewingNote(null);
    showToast(`Deleted note: "${title}"`, 'info');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                  My Research Notes
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {notes.length} case memos, judicial ratio notes, and arguments
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleOpenCreate}
              leftIcon={<Plus className="w-4 h-4" />}
              className="rounded-2xl px-5 font-bold shadow-md"
            >
              Write New Note
            </Button>
          </div>

          {/* Search & Case Filter */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by keywords, cases, tags..."
                className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <select
              value={selectedCaseFilter}
              onChange={(e) => setSelectedCaseFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Precedent Cases</option>
              {mockCases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setViewingNote(note)}
                className="group bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-purple-300 shadow-soft-sm hover:shadow-soft transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <Badge variant="purple" size="sm">
                      {note.caseTitle}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {note.dateCreated}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors font-serif line-clamp-1 mb-2">
                    {note.title}
                  </h3>

                  {note.chapterTitle && (
                    <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {note.chapterTitle} ({note.timestamp})
                    </p>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenEdit(note)}
                      className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Edit Note"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id, note.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-serif">
              No notes found
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create your first case note or clear your search filter to see existing notes.
            </p>
            <Button variant="primary" size="sm" onClick={handleOpenCreate}>
              Create Note
            </Button>
          </div>
        )}

        {/* Create / Edit Note Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title={editingNote ? 'Edit Research Note' : 'Create New Legal Note'}
          subtitle="Record case observations, key ratio decidendi, and citations"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveNote} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Note Title *
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Basic Structure test for Article 368..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Related Case Precedent
                </label>
                <select
                  value={formCaseId}
                  onChange={(e) => setFormCaseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                >
                  {mockCases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.shortTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chapter / Audio Timestamp
                </label>
                <input
                  type="text"
                  value={formTimestamp}
                  onChange={(e) => setFormTimestamp(e.target.value)}
                  placeholder="e.g. 08:45 or Chapter 3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Note Content & Legal Analysis *
              </label>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                rows={5}
                placeholder="Write your research notes, legal principles, paragraphs cited, or courtroom arguments..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:border-purple-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder="e.g. Art 21, Due Process, Privacy"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {editingNote ? 'Save Changes' : 'Create Note'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* View Note Modal */}
        {viewingNote && (
          <Modal
            isOpen={!!viewingNote}
            onClose={() => setViewingNote(null)}
            title={viewingNote.title}
            subtitle={`${viewingNote.caseTitle} • ${viewingNote.dateCreated}`}
            maxWidth="lg"
          >
            <div className="space-y-4">
              {viewingNote.chapterTitle && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs font-semibold text-purple-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>{viewingNote.chapterTitle} (Timestamp: {viewingNote.timestamp})</span>
                </div>
              )}

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {viewingNote.content}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {viewingNote.tags.map((tag, i) => (
                  <Badge key={i} variant="purple" size="sm">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const toEdit = viewingNote;
                    setViewingNote(null);
                    handleOpenEdit(toEdit);
                  }}
                  leftIcon={<Edit2 className="w-4 h-4" />}
                >
                  Edit Note
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setViewingNote(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AppLayout>
  );
}
