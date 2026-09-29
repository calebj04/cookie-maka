export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Meow Muse home">
        <span className="brand-mark" aria-hidden="true">
          m
        </span>
        <span>Meow Muse</span>
      </a>
      <span className="header-note">A daily pause, for cat people</span>
    </header>
  );
}
