type FactDisplayProps = {
  fact: string;
  factNumber: number;
  loading: boolean;
  error: string;
};

export function FactDisplay({
  fact,
  factNumber,
  loading,
  error,
}: FactDisplayProps) {
  return (
    <div className="fact-display" aria-live="polite" aria-busy={loading}>
      <div className="fact-meta">
        <span>CAT FACT</span>
        {factNumber > 0 && (
          <span>No. {String(factNumber).padStart(2, "0")}</span>
        )}
      </div>
      {error ? (
        <p className="fact-message fact-error">{error}</p>
      ) : loading && !fact ? (
        <p className="fact-message">Finding a fact...</p>
      ) : (
        <p key={factNumber} className="fact-copy">
          {fact}
        </p>
      )}
    </div>
  );
}
