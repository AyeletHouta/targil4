import React from 'react';
import '../css/Keyboard.css';

const Keyboard = ({ onKeyPress, language, textCase }) => {
  const englishLayout = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
    '1234567890',
    ',.?!"\'',
    ' ',
  ];

  const englishCapitalLayout = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM',
    '1234567890',
    ',.?!"\'',
    ' ',
  ];

  const hebrewLayout = [
    'קראטוןםפ',
    'םןויחלך',
    'ףזשבהג',
    '1234567890',
    ',.?!"\'',
    ' ',
  ];

  const emojiLayout = [
    '😀😁😂🤣',
    '😃😄😅😆',
    '😉😊😋😎',
    '😍😘😗😙',
    '😚😇😐😑',
    ' ',
  ];

  const renderLayout = (layout) => {
    return layout.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {Array.from(row).map((char, charIndex) => (
          <button
            key={charIndex}
            onClick={() =>
              onKeyPress(
                textCase === 'uppercase' ? char.toUpperCase() : char
              )
            }
          >
            {textCase === 'uppercase' ? char.toUpperCase() : char}
            {char === ' ' && <span className="key-label">space</span>}
          </button>
        ))}
      </div>
    ));
  };

  let selectedLayout;
  switch (language) {
    case 'english':
      selectedLayout = textCase === 'uppercase' ? englishCapitalLayout : englishLayout;
      break;
    case 'hebrew':
      selectedLayout = hebrewLayout;
      break;
    case 'emojis':
      selectedLayout = emojiLayout;
      break;
    default:
      selectedLayout = englishLayout;
  }

  return (
    <div className="keyboard">
      {renderLayout(selectedLayout)}
    </div>
  );
};

export default Keyboard;
