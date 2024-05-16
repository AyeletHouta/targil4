import React from 'react';
/*jjjj */
const Keyboard = ({ onKeyPress, language }) => {
  // Define keyboard layouts for different languages
  const englishLayout = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
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

  const renderKeyboardLayout = (layout) => {
    return layout.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {row.split('').map((char, charIndex) => (
          <button key={charIndex} onClick={() => onKeyPress(char)}>
            {char}
          </button>
        ))}
      </div>
    ));
  };

  let selectedLayout;
  switch (language) {
    case 'english':
      selectedLayout = englishLayout;
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
      {renderKeyboardLayout(selectedLayout)}
    </div>
  );
};

export default Keyboard;
