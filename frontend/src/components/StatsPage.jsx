import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getStatistics } from '../utils/localStorage';
import './StatsPage.css';

const StatsPage = ({ onClose }) => {
  const stats = getStatistics() || { gamesPlayed: 0, wins: 0, guesses: [] };

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  const totalGuesses = stats.guesses.reduce((total, numGuesses) => total + numGuesses, 0);
  const averageGuesses = stats.gamesPlayed > 0 ? (totalGuesses / stats.gamesPlayed).toFixed(1) : '0';
  const bestScore = stats.guesses.length > 0 ? Math.min(...stats.guesses) : '—';
  const winRate = stats.gamesPlayed > 0 ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(0) : '0';
  const losses = stats.gamesPlayed - stats.wins;

  const guessCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  stats.guesses.forEach((guesses) => {
    if (guesses >= 3 && guesses <= 8) {
      guessCounts[guesses - 2]++;
    }
  });

  const maxBarVal = Math.max(losses, ...Object.values(guessCounts), 1);
  const barHeight = (count) => Math.max((count / maxBarVal) * 100, count > 0 ? 12 : 4);

  const distribution = [
    { label: '1', count: guessCounts[1] },
    { label: '2', count: guessCounts[2] },
    { label: '3', count: guessCounts[3] },
    { label: '4', count: guessCounts[4] },
    { label: '5', count: guessCounts[5] },
    { label: '6', count: guessCounts[6] - losses },
    { label: 'X', count: losses, isFail: true },
  ];

  const lastRunLabel = (() => {
    const lastRun = stats.lastRun;
    if (!lastRun) return null;
    if (!lastRun.won) return 'X';
    const songs = lastRun.tileCount - 2;
    if (songs >= 1 && songs <= 6) return String(songs);
    return null;
  })();

  const lastRunSummary = (() => {
    const lastRun = stats.lastRun;
    if (!lastRun) return null;
    if (!lastRun.won) return "Your last game: didn't connect";
    const songs = lastRun.tileCount - 2;
    if (songs >= 1 && songs <= 6) {
      return `Your last game: ${songs} song${songs === 1 ? '' : 's'}`;
    }
    return null;
  })();

  return createPortal(
    <div className="stats-overlay" onClick={onClose}>
      <div className="stats-page" onClick={(e) => e.stopPropagation()}>
        <header className="stats-header">
          <h2 className="stats-title">Stats</h2>
          <button type="button" className="stats-close" onClick={onClose} aria-label="Close stats">
            ✕
          </button>
        </header>

        <div className="stats-body">
          <section className="stats-chart-section">
            <h3 className="stats-section-label">Guess distribution</h3>
            {lastRunSummary && (
              <p className="stats-last-run">{lastRunSummary}</p>
            )}
            <div className="stats-chart">
              {distribution.map(({ label, count, isFail }) => {
                const isLatest = lastRunLabel === label;

                return (
                  <div
                    key={label}
                    className={[
                      'stats-bar-col',
                      isLatest ? 'stats-bar-col--latest' : '',
                      isLatest && isFail ? 'stats-bar-col--latest-fail' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div className="stats-bar-track">
                      <div
                        className={`stats-bar${isFail ? ' stats-bar--fail' : ''}${isLatest ? ' stats-bar--latest' : ''}`}
                        style={{
                          height: `${
                            isLatest && count === 0 ? 12 : barHeight(count)
                          }%`,
                        }}
                      >
                        {count > 0 && <span className="stats-bar-count">{count}</span>}
                      </div>
                    </div>
                    {isLatest && <span className="stats-bar-you">You</span>}
                    <span
                      className={`stats-bar-label${isFail ? ' stats-bar-label--fail' : ''}${isLatest ? ' stats-bar-label--latest' : ''}`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="stats-cards">
            <div className="stats-card">
              <span className="stats-card-label">Win rate</span>
              <span className="stats-card-value">{winRate}%</span>
            </div>
            <div className="stats-card">
              <span className="stats-card-label">Avg. songs</span>
              <span className="stats-card-value">{averageGuesses}</span>
            </div>
            <div className="stats-card">
              <span className="stats-card-label">Best score</span>
              <span className="stats-card-value">{bestScore}</span>
            </div>
            <div className="stats-card">
              <span className="stats-card-label">Games played</span>
              <span className="stats-card-value">{stats.gamesPlayed}</span>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StatsPage;
