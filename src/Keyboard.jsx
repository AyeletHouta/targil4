import React from 'react';

const Keyboard = ({ onKeyPress, language, textCase }) => {
  // Define keyboard layouts for different languages
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

  // Function to render keyboard layout
  const renderLayout = (layout) => {
    return layout.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {Array.from(row).map((char, charIndex) => (
          <button key={charIndex} onClick={() => onKeyPress(textCase === 'uppercase' ? char.toUpperCase() : char)}>
            {textCase === 'uppercase' ? char.toUpperCase() : char}
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
      {/* Render keyboard layout based on selected language */}
      {renderLayout(selectedLayout)}
    </div>
  );
};

export default Keyboard;
