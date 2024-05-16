import React, { useState } from 'react';
import './App.css'; // Import CSS for styling
import Keyboard from './Keyboard';

const App = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('english');
  const [fontSize, setFontSize] = useState('medium');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [textCase, setTextCase] = useState('none'); // Add state for text case

  // Function to handle typing characters
  const handleKeyPress = (character) => {
    setText(text + character);
  };

  // Function to handle changing language
  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    // Logic to switch keyboard layout based on selected language
  };

  // Function to handle changing font size
  const handleChangeFontSize = (selectedSize) => {
    setFontSize(selectedSize);
  };

  // Function to handle changing font family
  const handleChangeFontFamily = (selectedFont) => {
    setFontFamily(selectedFont);
  };

  // Function to handle changing font color
  const handleChangeFontColor = (selectedColor) => {
    setFontColor(selectedColor);
  };

  // Function to handle toggling text case
  const handleToggleTextCase = () => {
    setTextCase(textCase === 'uppercase' ? 'none' : 'uppercase');
  };

  // Function to handle special actions
  const handleSpecialAction = (action) => {
    switch (action) {
      case 'delete':
        setText(text.slice(0, -1));
        break;
      case 'clear':
        setText('');
        break;
      // Add more cases for other special actions
      default:
        break;
    }
  };

  return (
    <div className="app-container">
      <div className="text-editor">
        <textarea
          value={text}
          style={{
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: fontColor,
            textTransform: textCase === 'uppercase' ? 'uppercase' : 'lowercase',
          }}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="options">
        <div className="language-options">
          <button onClick={() => handleChangeLanguage('english')}>English</button>
          <button onClick={() => handleChangeLanguage('hebrew')}>Hebrew</button>
          <button onClick={() => handleChangeLanguage('emojis')}>Emojis</button>
          {/* Add more language options */}
        </div>
        <div className="formatting-options">
          <button onClick={() => handleChangeFontSize('small')}>Small</button>
          <button onClick={() => handleChangeFontSize('medium')}>Medium</button>
          <button onClick={() => handleChangeFontSize('large')}>Large</button>
          {/* Add more font size options */}
          <select onChange={(e) => handleChangeFontFamily(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            {/* Add more font family options */}
          </select>
          <input type="color" onChange={(e) => handleChangeFontColor(e.target.value)} />
        </div>
        <div className="text-case-option">
          <button onClick={handleToggleTextCase}>{textCase === 'uppercase' ? 'Uppercase' : 'Lowercase'}</button>
        </div>
        <div className="special-actions">
          <button onClick={() => handleSpecialAction('delete')}>Delete</button>
          <button onClick={() => handleSpecialAction('clear')}>Clear</button>
          {/* Add more special actions */}
        </div>
      </div>
      <Keyboard onKeyPress={handleKeyPress} language={language} textCase={textCase} />
    </div>
  );
};

export default App;
