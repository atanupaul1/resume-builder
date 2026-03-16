"use client";

interface Props {
  isLoading: boolean;
  suggestion: string;
  error: string;
  label?: string;
  onAccept: (val: string) => void;
  onReject: () => void;
  onRetry?: () => void;
}

export default function AISuggestionBox({
  isLoading,
  suggestion,
  error,
  label = "AI suggestion",
  onAccept,
  onReject,
  onRetry,
}: Props) {
  if (!isLoading && !suggestion && !error) return null;

  return (
    <div className="mt-2 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-indigo-100">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          {label}
        </span>
        <button
          onClick={onReject}
          className="ml-auto text-indigo-300 hover:text-indigo-500 transition-colors"
          title="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        {isLoading && (
          <div className="flex items-center gap-2 text-indigo-500">
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
            <span className="text-xs text-indigo-500">Generating…</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-red-500">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-xs text-indigo-500 hover:text-indigo-700 underline ml-2"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {suggestion && !isLoading && !error && (
          <>
            <p className="text-xs text-gray-700 leading-relaxed italic">
              &ldquo;{suggestion}&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-2.5">
              <button
                onClick={() => onAccept(suggestion)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Use this
              </button>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-indigo-200 text-indigo-600 text-xs font-medium rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Regenerate
                </button>
              )}
              <button
                onClick={onReject}
                className="text-xs text-gray-400 hover:text-gray-600 ml-auto"
              >
                Discard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
