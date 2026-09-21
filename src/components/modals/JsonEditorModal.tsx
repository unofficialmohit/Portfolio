import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw, Download, Copy, Check, AlertCircle, FileCode } from 'lucide-react';
import { PortfolioData } from '../../types';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface JsonEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  onDownload: () => void;
  hasCustomEdits: boolean;
}

export const JsonEditorModal: React.FC<JsonEditorModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onSave,
  onReset,
  onDownload,
  hasCustomEdits,
}) => {
  const [jsonString, setJsonString] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lock background scroll when modal is open
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setJsonString(JSON.stringify(currentData, null, 2));
      setParseError(null);
      setSaveSuccess(false);
    }
  }, [isOpen, currentData]);

  if (!isOpen) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonString(val);
    try {
      JSON.parse(val);
      setParseError(null);
    } catch (err: any) {
      setParseError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.personal || !parsed.projects) {
        setParseError('Missing fundamental properties (personal, projects, etc.)');
        return;
      }
      onSave(parsed);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: any) {
      setParseError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1612]/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl bg-[#FFFDF9] border border-[#DFCDB2] paper-shadow-lift overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#EDE0CD] bg-[#FAF5EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EADBCA] flex items-center justify-center text-[#8C4A21]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#2C2419]">
                  Global JSON Data Studio
                </h3>
                {hasCustomEdits && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-900 border border-amber-300">
                    Live Custom Edits Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7A6753]">
                Manage all portfolio content through <code className="font-mono bg-[#EADBCA]/60 px-1 py-0.5 rounded">portfolioData.json</code>. Changes reflect immediately on this site.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#EFE4D3] hover:bg-[#E3D4C0] text-[#4A3B2A] transition-colors cursor-pointer"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2.5 bg-[#F6EFE3] border-b border-[#EDE0CD] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FFFDF9] hover:bg-[#FAF4EA] text-[#4A3B2A] border border-[#DFCDB7] transition-all cursor-pointer font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FFFDF9] hover:bg-[#FAF4EA] text-[#4A3B2A] border border-[#DFCDB7] transition-all cursor-pointer font-medium"
              title="Download portfolioData.json directly"
            >
              <Download className="w-3.5 h-3.5 text-[#C7622B]" />
              <span>Download .json</span>
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FFFDF9] hover:bg-[#FAF4EA] text-red-700 border border-[#DFCDB7] transition-all cursor-pointer font-medium"
              title="Revert to original default data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Quick Jump Shortcuts */}
          <div className="hidden md:flex items-center gap-1 text-[11px] text-[#7C6953]">
            <span className="font-semibold mr-1">Sections:</span>
            {['personal', 'mascots', 'projects', 'education', 'skills', 'contact'].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  const targetIndex = jsonString.indexOf(`"${sec}":`);
                  if (targetIndex !== -1) {
                    const textarea = document.getElementById('json-editor-textarea') as HTMLTextAreaElement;
                    if (textarea) {
                      textarea.focus();
                      textarea.setSelectionRange(targetIndex, targetIndex + sec.length + 3);
                      // Scroll into view
                      const lineCount = jsonString.substring(0, targetIndex).split('\n').length;
                      textarea.scrollTop = lineCount * 20;
                    }
                  }
                }}
                className="px-2 py-0.5 rounded bg-[#EADECC] hover:bg-[#DAC9B7] text-[#3D3021] font-mono capitalize transition-colors"
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 relative bg-[#221D17] overflow-hidden flex flex-col">
          <textarea
            id="json-editor-textarea"
            value={jsonString}
            onChange={handleTextChange}
            spellCheck={false}
            className="w-full flex-1 p-4 sm:p-6 font-mono text-xs sm:text-sm text-[#F7F2EB] bg-transparent leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-[#A86438] selection:text-white"
          />

          {/* Status & Error Notification Bar */}
          <div className="px-4 py-2.5 bg-[#17130F] border-t border-[#3B3024] flex items-center justify-between text-xs font-mono">
            {parseError ? (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="truncate max-w-lg">{parseError}</span>
              </div>
            ) : saveSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4" />
                <span>Saved successfully! All website sections updated in real time.</span>
              </div>
            ) : (
              <div className="text-[#A39281] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>JSON Valid • Ready to apply</span>
              </div>
            )}

            <div className="text-[#80705E]">
              {jsonString.split('\n').length} lines
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF5EC] border-t border-[#EDE0CD] flex items-center justify-between">
          <span className="text-xs text-[#7A6953] font-sans">
            Tip: You can edit anything—roles, project URLs, mascot dialogue, education, or skills!
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A4936] hover:text-[#2C2419] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={Boolean(parseError)}
              className="px-6 py-2 rounded-xl bg-[#C7622B] hover:bg-[#A84A16] text-white text-xs sm:text-sm font-semibold paper-shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
