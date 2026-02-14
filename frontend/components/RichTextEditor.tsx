'use client';

import { useRef, useEffect, useCallback } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Metin girin…',
  className = '',
  minHeight = '200px',
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value]);

  const emit = useCallback(() => {
    const el = ref.current;
    if (el) onChange(el.innerHTML || '');
  }, [onChange]);

  const exec = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    ref.current?.focus();
    emit();
  }, [emit]);

  return (
    <div className={`border-2 border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <div className="flex flex-wrap gap-1 p-2 bg-gray-100 border-b border-gray-300">
        <button
          type="button"
          title="Kalın"
          onClick={() => exec('bold')}
          className="p-2 rounded hover:bg-gray-200 font-bold"
        >
          B
        </button>
        <button
          type="button"
          title="İtalik"
          onClick={() => exec('italic')}
          className="p-2 rounded hover:bg-gray-200 italic"
        >
          I
        </button>
        <button
          type="button"
          title="Alt çizgi"
          onClick={() => exec('underline')}
          className="p-2 rounded hover:bg-gray-200 underline"
        >
          U
        </button>
        <span className="w-px h-6 bg-gray-400 self-center" />
        <button
          type="button"
          title="Başlık 2"
          onClick={() => exec('formatBlock', 'h2')}
          className="p-2 rounded hover:bg-gray-200 text-sm"
        >
          H2
        </button>
        <button
          type="button"
          title="Başlık 3"
          onClick={() => exec('formatBlock', 'h3')}
          className="p-2 rounded hover:bg-gray-200 text-sm"
        >
          H3
        </button>
        <button
          type="button"
          title="Paragraf"
          onClick={() => exec('formatBlock', 'p')}
          className="p-2 rounded hover:bg-gray-200 text-sm"
        >
          P
        </button>
        <span className="w-px h-6 bg-gray-400 self-center" />
        <button
          type="button"
          title="Liste"
          onClick={() => exec('insertUnorderedList')}
          className="p-2 rounded hover:bg-gray-200"
        >
          •
        </button>
        <button
          type="button"
          title="Numaralı liste"
          onClick={() => exec('insertOrderedList')}
          className="p-2 rounded hover:bg-gray-200"
        >
          1.
        </button>
        <span className="w-px h-6 bg-gray-400 self-center" />
        <button
          type="button"
          title="Link ekle"
          onClick={() => {
            const url = window.prompt('Link URL:');
            if (url) exec('createLink', url);
          }}
          className="p-2 rounded hover:bg-gray-200 text-sm"
        >
          Link
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        data-placeholder={placeholder}
        className="p-4 bg-white outline-none min-h-[200px] prose max-w-none"
        style={{ minHeight }}
        onInput={emit}
        onBlur={emit}
        suppressContentEditableWarning
      />
    </div>
  );
}
