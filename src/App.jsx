import React, { useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';

const App = () => {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState('english');
  const [fontSize, setFontSize] = useState('medium');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [textCase, setTextCase] = useState('none');
  const [activeFontSize, setActiveFontSize] = useState('medium');
  const [activeLanguage, setActiveLanguage] = useState('english');
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);

  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setActiveLanguage(selectedLanguage);
  };

  const handleChangeFontFamily = (selectedFont) => {
    setFontFamily(selectedFont);
  };

  const handleChangeFontColor = (selectedColor) => {
    setFontColor(selectedColor);
  };

  const handleChangeFontSize = (selectedSize) => {
    setFontSize(selectedSize);
    setActiveFontSize(selectedSize);
  };

  const handleToggleTextCase = () => {
    const transformation = textCase === 'uppercase' ? 'none' : 'uppercase';
    setTextCase(transformation);
    setIsCapsLockActive(transformation === 'uppercase');
  };

  const handleConvertToLower = () => {
    saveHistory();
    setText(text.toLowerCase());
  };

  const handleConvertToUpper = () => {
    saveHistory();
    setText(text.toUpperCase());
  };

  const handleSpecialAction = (action) => {
    if (action === 'delete') {
      saveHistory();
      const newText = text.replace(/<span[^>]*>[^<]*<\/span>$/, '');
      setText(newText);
    } else if (action === 'clear') {
      saveHistory(); 
      setText('');
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setText(previousState);
    }
  };

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
          <button 
            onClick={() => handleChangeLanguage('english')}
            style={{ backgroundColor: activeLanguage === 'english' ? 'lightblue' : 'white' }}
          >
            English
          </button>
          <button 
            onClick={() => handleChangeLanguage('hebrew')}
            style={{ backgroundColor: activeLanguage === 'hebrew' ? 'lightblue' : 'white' }}
          >
            Hebrew
          </button>
          <button 
            onClick={() => handleChangeLanguage('emojis')}
            style={{ backgroundColor: activeLanguage === 'emojis' ? 'lightblue' : 'white' }}
          >
            Emojis
          </button>
        </div>
        <div className="formatting-options">
          <button 
            onClick={() => handleChangeFontSize('small')}
            style={{ backgroundColor: activeFontSize === 'small' ? 'lightblue' : 'white' }}
          >
            Small
          </button>
          <button 
            onClick={() => handleChangeFontSize('medium')}
            style={{ backgroundColor: activeFontSize === 'medium' ? 'lightblue' : 'white' }}
          >
            Medium
          </button>
          <button 
            onClick={() => handleChangeFontSize('large')}
            style={{ backgroundColor: activeFontSize === 'large' ? 'lightblue' : 'white' }}
          >
            Large
          </button>
        </div>
        <div className="formatting-options">
          <select onChange={(e) => handleChangeFontFamily(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
          <input type="color" onChange={(e) => handleChangeFontColor(e.target.value)} />
        </div>
        <div className="text-case-option">
          <button 
            onClick={handleToggleTextCase}
            style={{ backgroundColor: isCapsLockActive ? 'lightblue' : 'white' }}
          >
            {'caps lock'}
          </button>
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
        saveHistory();
        const styledChar = `<span style="font-family: ${fontFamily}; color: ${fontColor}; font-size: ${fontSize}">${char === ' ' ? '&nbsp;' : char}</span>`;
        setText(text + styledChar);
      }} language={language} textCase={textCase} />
    </div>
  );
};

export default App;
