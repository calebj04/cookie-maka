import { useEffect, useState } from "react";
import { FactActions } from "./components/FactActions";
import { FactDisplay } from "./components/FactDisplay";
import { Header } from "./components/Header";

type CatFactResponse = {
  fact: string;
};

async function getRandomCatFact(signal?: AbortSignal) {
  const response = await fetch("https://catfact.ninja/fact", {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Cat facts returned ${response.status}`);
  }

  const data = (await response.json()) as CatFactResponse;
  if (typeof data.fact !== "string" || !data.fact.trim()) {
    throw new Error("The cat fact response was empty.");
  }

  return data.fact;
}

export function App() {
  const [fact, setFact] = useState("");
  const [factNumber, setFactNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getRandomCatFact(controller.signal)
      .then((nextFact) => {
        setFact(nextFact);
        setFactNumber(1);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError("The cat fact could not load. Please try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  async function fetchAnotherFact() {
    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const nextFact = await getRandomCatFact();
      setFact(nextFact);
      setFactNumber((current) => current + 1);
    } catch {
      setError("The cat fact could not load. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyFact() {
    try {
      await navigator.clipboard.writeText(fact);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Clipboard access is unavailable in this browser.");
    }
  }

  return (
    <div className="page-shell">
      <div className="site-wrap">
        <Header />
        <main className="main-content" id="home">
          <div className="intro">
            <p className="eyebrow">A small dose of cat knowledge</p>
            <h1>Curious cats.</h1>
            <p className="intro-copy">
              One interesting thing about cats, whenever you need it.
            </p>
          </div>
          <section className="fact-section" aria-label="Random cat fact">
            <FactDisplay
              fact={fact}
              factNumber={factNumber}
              loading={loading}
              error={error}
            />
            <FactActions
              copied={copied}
              disabled={loading}
              hasFact={Boolean(fact)}
              onCopy={copyFact}
              onNext={fetchAnotherFact}
            />
          </section>
        </main>
        <footer className="footer">
          <span>Meow Muse</span>
          <span>Facts from catfact.ninja</span>
        </footer>
      </div>
    </div>
  );
}