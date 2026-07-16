import './ViewportNotice.css';

const ViewportNotice = () => (
  <div
    className="viewport-notice"
    role="dialog"
    aria-modal="true"
    aria-labelledby="viewport-notice-title"
  >
    <div className="viewport-notice__card">
      <svg
        className="viewport-notice__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="4"
          width="20"
          height="14"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M8 21h8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M12 18v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="viewport-notice__title" id="viewport-notice-title">
        Chord
      </h1>
      <p className="viewport-notice__message">
        Chord is built for larger screens. Open this page on a tablet or computer
        to play.
      </p>
    </div>
  </div>
);

export default ViewportNotice;
