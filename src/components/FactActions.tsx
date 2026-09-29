type FactActionsProps = {
  copied: boolean;
  disabled: boolean;
  hasFact: boolean;
  onCopy: () => void;
  onNext: () => void;
};

export function FactActions({
  copied,
  disabled,
  hasFact,
  onCopy,
  onNext,
}: FactActionsProps) {
  return (
    <div className="fact-actions">
      <button
        className="next-button"
        type="button"
        onClick={onNext}
        disabled={disabled}
      >
        {disabled ? "Loading..." : "Another fact"}
        <span aria-hidden="true">→</span>
      </button>
      {hasFact && (
        <button
          className="copy-button"
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Fact copied" : "Copy fact"}
        >
          {copied ? "Copied" : "Copy fact"}
        </button>
      )}
    </div>
  );
}
