import React, { useState } from 'react';
import './App.css'; // Import CSS for styling
import Keyboard from './Keyboard';

const App = () => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]); // State to keep track of the text history
  const [language, setLanguage] = useState('english');
  const [fontSize, setFontSize] = useState('medium');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [textCase, setTextCase] = useState('none');

  // Function to handle changing language
  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  // Function to handle changing font family
  const handleChangeFontFamily = (selectedFont) => {
    setFontFamily(selectedFont);
  };

  // Function to handle changing font color
  const handleChangeFontColor = (selectedColor) => {
    setFontColor(selectedColor);
  };

  // Function to handle changing font size
  const handleChangeFontSize = (selectedSize) => {
    setFontSize(selectedSize);
  };

  // Function to handle toggling text case
  const handleToggleTextCase = () => {
    const transformation = textCase === 'uppercase' ? 'none' : 'uppercase';
    setTextCase(transformation);
  };

  // Function to handle converting all text to lowercase
  const handleConvertToLower = () => {
    saveHistory();
    setText(text.toLowerCase());
  };

  // Function to handle converting all text to uppercase
  const handleConvertToUpper = () => {
    saveHistory();
    setText(text.toUpperCase());
  };

  // Function to handle special actions
  const handleSpecialAction = (action) => {
    if (action === 'delete') {
      saveHistory();
      const newText = text.replace(/<span[^>]*>[^<]*<\/span>$/, '');
      setText(newText);
    } else if (action === 'clear') {
      saveHistory(); // Save the current state to history
      setText('');
    }
  };

  // Function to handle the undo action
  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setText(previousState);
    }
  };

  // Function to save the current text state to history
  const saveHistory = () => {
    setHistory((prevHistory) => [...prevHistory, text]);
  };

  const updateTextState = (e) => {
    const newText = e.target.innerHTML;
    saveHistory();
    setText(newText);
  };

  return (
    <div className="app-container">
      <div className="text-editor">
        <div
          className="editable-text"
          contentEditable
          onInput={updateTextState}
          style={{ fontFamily, color: fontColor, fontSize }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <div className="options">
        <div className="language-options">
          <button onClick={() => handleChangeLanguage('english')}>English</button>
          <button onClick={() => handleChangeLanguage('hebrew')}>Hebrew</button>
          <button onClick={() => handleChangeLanguage('emojis')}>Emojis</button>
        </div>
        <div className="formatting-options">
          <button onClick={() => handleChangeFontSize('small')}>Small</button>
          <button onClick={() => handleChangeFontSize('medium')}>Medium</button>
          <button onClick={() => handleChangeFontSize('large')}>Large</button>
        </div>
        <div className="formatting-options">
          <select onChange={(e) => handleChangeFontFamily(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
          <input type="color" onChange={(e) => handleChangeFontColor(e.target.value)} />
        </div>
        <div className="text-case-option">
          <button onClick={handleToggleTextCase}>{'caps lock'}</button>
          <button onClick={handleConvertToLower}>Lower All</button>
          <button onClick={handleConvertToUpper}>Upper All</button>
        </div>
        <div className="special-actions">
          <button onClick={() => handleSpecialAction('delete')}><img src="delete.png" alt="delete" /></button>
          <button onClick={() => handleSpecialAction('clear')}><img src="clear.png" alt="clear" /></button>
          <button onClick={handleUndo}><img src="undo.png" alt="undo" /></button>
        </div>
      </div>
      <Keyboard onKeyPress={(char) => {
        saveHistory(); // Save history before adding new text
        const styledChar = `<span style="font-family: ${fontFamily}; color: ${fontColor}; font-size: ${fontSize}">${char}</span>`;
        setText(text + styledChar);
      }} language={language} textCase={textCase} />
    </div>
  );
};

export default App;
