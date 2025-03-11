import React from 'react';

const LyricsDisplay = ({ matchedLyrics, currentTime, onLyricClick }) => {
  const getCurrentLyricIndex = (time) => {
    return matchedLyrics.findIndex(
      (lyric) => time >= lyric.start && time <= lyric.end
    );
  };

  const currentIndex = getCurrentLyricIndex(currentTime);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Matched Lyrics</h3>
      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px'
      }}>
        {matchedLyrics.map((lyric, index) => {
          const isCurrentLyric = index === currentIndex;
          const confidenceColor = 
            lyric.confidence > 0.9 ? '#4CAF50' :
            lyric.confidence > 0.7 ? '#FFA726' :
            '#F44336';

          return (
            <div
              key={index}
              data-lyric-index={index}
              style={{
                padding: '10px',
                backgroundColor: isCurrentLyric ? '#E3F2FD' : 'white',
                marginBottom: '5px',
                borderRadius: '4px',
                cursor: 'pointer',
                borderLeft: `4px solid ${confidenceColor}`,
                transition: 'all 0.3s ease',
                transform: isCurrentLyric ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isCurrentLyric ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
              }}
              onClick={() => onLyricClick(lyric.start)}
            >
              <div style={{
                fontWeight: isCurrentLyric ? '600' : 'normal'
              }}>
                {lyric.text}
              </div>
              <div style={{
                fontSize: '0.8em',
                color: '#666',
                marginTop: '4px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>{lyric.start.toFixed(2)}s - {lyric.end.toFixed(2)}s</span>
                <span>Confidence: {(lyric.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LyricsDisplay;