import { useState, useEffect } from "react";

const videoSrc = "/trashchessgameplay.mp4";
const TARGET_URL = "https://chess-game-virid-three.vercel.app/";

const goToGame = () => window.open(TARGET_URL, "_blank", "noopener,noreferrer");

export default function PopupAd() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 400);
  };

  if (dismissed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Barlow:wght@400;600&display=swap');

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
          transition: opacity 0.4s ease;
          opacity: 0;
          pointer-events: none;
        }

        .popup-overlay.show {
          opacity: 1;
          pointer-events: all;
        }

        .popup-card {
          background: #0d0d0d;
          border-radius: 16px;
          overflow: hidden;
          width: 100%;
          max-width: 500px;
          border: 1px solid rgba(255, 80, 0, 0.4);
          box-shadow: 0 0 60px rgba(255, 60, 0, 0.25);
          transform: scale(0.88) translateY(24px);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .popup-overlay.show .popup-card {
          transform: scale(1) translateY(0);
        }

        .popup-header {
          background: #111;
          padding: 20px 20px 16px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 80, 0, 0.25);
          position: relative;
        }

        .popup-tag {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #ff5000;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .popup-headline {
          font-family: 'Black Ops One', cursive;
          font-size: clamp(22px, 5vw, 32px);
          color: #fff;
          line-height: 1.1;
          margin: 0;
          text-shadow: 0 0 30px rgba(255, 80, 0, 0.5);
        }

        .popup-headline span {
          color: #ff5000;
        }

        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.5);
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: background 0.2s, color 0.2s;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.14);
          color: #fff;
        }

        .video-wrap {
          position: relative;
          aspect-ratio: 16/9;
          background: #000;
        }

        .video-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .popup-footer {
          padding: 14px 16px;
          display: flex;
          gap: 10px;
          background: #111;
        }

        .btn-yes {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #ff5000;
          color: #fff;
          font-family: 'Black Ops One', cursive;
          font-size: 15px;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: transform 0.15s, background 0.2s;
        }

        .btn-yes:hover {
          background: #ff6a20;
          transform: scale(1.03);
        }

        .btn-yes:active {
          transform: scale(0.97);
        }

        .btn-no {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }

        .btn-no:hover {
          color: rgba(255,255,255,0.75);
          border-color: rgba(255,255,255,0.25);
        }
      `}</style>

      <div className={`popup-overlay ${visible ? "show" : ""}`}>
        <div className="popup-card">
          <div className="popup-header">
            <button className="close-btn" onClick={close} aria-label="Close">✕</button>
            <div className="popup-tag">⚡ Challenge</div>
            <h2 className="popup-headline">
              Are you <span>better</span><br />than this player?
            </h2>
          </div>

          <div className="video-wrap" onClick={goToGame} style={{cursor:"pointer"}}>
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline

            />
          </div>

          <div className="popup-footer">
            <button className="btn-yes" onClick={goToGame}>💪 Yes I Am!</button>
            <button className="btn-no" onClick={goToGame}>Maybe not</button>
          </div>
        </div>
      </div>
    </>
  );
}
