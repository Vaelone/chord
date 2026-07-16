import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Tile from './Tile';
import './InfoPage.css';

const EXAMPLE_CHAIN = [
  {
    iconSrc:
      'https://i.guim.co.uk/img/media/e0e27ceacf6271e6e4203c4a13287b9a6416828e/226_1394_2755_1653/master/2755.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fdaf920e5a2eefa5ea0cd987a65d002f',
    songInfo: 'Ariana Grande',
  },
  {
    iconSrc: 'https://i.scdn.co/image/ab67616d0000b2734bb9f35da9ff34b1e2314d8e',
    songTitle: 'The Way',
    artists: ['Ariana Grande', 'Mac Miller'],
    connectingArtist: 'Ariana Grande',
    linkStatus: 'valid',
  },
  {
    iconSrc: 'https://i.scdn.co/image/ab67616d0000b273ee0f38410382a255e4fb15f4',
    songTitle: 'Weekend',
    artists: ['Mac Miller', 'Miguel'],
    connectingArtist: 'Mac Miller',
    linkStatus: 'valid',
  },
  {
    iconSrc: 'https://i.scdn.co/image/ab6761610000e5eb4669166b571594eade778990',
    songInfo: 'Miguel',
  },
];

const RULES = [
  'Link the start artist to the goal artist using a chain of real songs.',
  'Your first song\'s main artist must be the start artist.',
  'Each later song\'s main artist must be someone credited on the previous song.',
  'Win by reaching the goal artist in 6 songs or fewer.',
  'Uncredited features do not count — the artist must be listed on the track.',
];

const InfoPage = ({ onClose }) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  return createPortal(
    <div className="info-overlay" onClick={onClose}>
      <div className="info-page" onClick={(e) => e.stopPropagation()}>
        <header className="info-header">
          <h2 className="info-title">How to Play</h2>
          <button type="button" className="info-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="info-body">
          <p className="info-lead">
            Link two artists through real songs. Each step is only valid if the next
            song&apos;s <strong>main artist</strong> connects to the previous one.
          </p>

          <section className="info-key-rule">
            <h3 className="info-section-label">The key rule</h3>
            <p>
              Spotify lists one artist first on every track — that&apos;s the{' '}
              <strong>main artist</strong>. It&apos;s the only credit that counts for
              linking.
            </p>
            <ul>
              <li>
                <strong>First song:</strong> main artist = start artist
              </li>
              <li>
                <strong>Next songs:</strong> main artist must be someone credited on
                the previous song
              </li>
            </ul>
          </section>

          <section className="info-example">
            <h3 className="info-section-label">Example</h3>
            <div className="info-demo-tiles">
              {EXAMPLE_CHAIN.map((tile, i) => {
                const tileMarker =
                  i === 0
                    ? 'start'
                    : i === EXAMPLE_CHAIN.length - 1
                      ? 'goal'
                      : i;

                return (
                <React.Fragment key={tile.songInfo ?? tile.songTitle}>
                  {i > 0 && <span className="info-demo-arrow" aria-hidden="true">→</span>}
                  <Tile
                    className="info-demo-tile"
                    iconSrc={tile.iconSrc}
                    songInfo={tile.songInfo}
                    songTitle={tile.songTitle}
                    artists={tile.artists}
                    connectingArtist={tile.connectingArtist}
                    linkStatus={tile.linkStatus}
                    tileMarker={tileMarker}
                  />
                </React.Fragment>
                );
              })}
            </div>
          </section>

          <section className="info-rules">
            <h3 className="info-section-label">Rules</h3>
            <ul className="info-rules-list">
              {RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

          <section className="info-legend">
            <div className="info-legend-item">
              <span className="info-legend-ring info-legend-ring--valid" />
              <span>Valid link — green ring around the photo</span>
            </div>
            <div className="info-legend-item">
              <span className="info-legend-chip info-legend-chip--linked">✓ Artist</span>
              <span>Main artist — green chip shows who linked the step</span>
            </div>
            <div className="info-legend-item">
              <span className="info-legend-ring info-legend-ring--invalid" />
              <span>Invalid link — main artist didn&apos;t match the previous step</span>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InfoPage;
