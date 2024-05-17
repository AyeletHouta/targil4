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

  // Function to apply style to selected text
  const applyStyleToSelection = (styleName, styleValue) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const documentFragment = range.cloneContents();

      // Create a span to wrap the entire selection
      const span = document.createElement('span');
      span.style[styleName] = styleValue;

      // Get all child elements (spans) within the range
      const childSpans = documentFragment.querySelectorAll('span');

      // Apply the style to each child span individually
      childSpans.forEach((childSpan) => {
        childSpan.style[styleName] = styleValue;
      });

      // Clear the original selection
      range.deleteContents();

      // Append the cloned content to the span
      span.appendChild(documentFragment);

      // Insert the styled span into the document
      range.insertNode(span);

      // Update the text state with the new HTML
      updateTextState();
    }
  };

  // Function to handle changing language
  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  // Function to handle changing font size
  const handleChangeFontSize = (selectedSize) => {
    let fontSizeValue;

    if (selectedSize === 'small') {
      fontSizeValue = '15px';
    } else if (selectedSize === 'medium') {
      fontSizeValue = '30px';
    } else if (selectedSize === 'large') {
      fontSizeValue = '45px';
    }

    if (fontSizeValue && window.getSelection().toString()) {
      applyStyleToSelection('fontSize', fontSizeValue);
    }
  };

  // Function to handle changing font family
  const handleChangeFontFamily = (selectedFont) => {
    if (window.getSelection().toString()) {
      applyStyleToSelection('fontFamily', selectedFont);
    }
  };

  // Function to handle changing font color
  const handleChangeFontColor = (selectedColor) => {
    if (window.getSelection().toString()) {
      applyStyleToSelection('color', selectedColor);
    }
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
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        updateTextState();
      }
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

  // Function to update text state and history
  const updateTextState = () => {
    saveHistory();
    setText(document.querySelector('.editable-text').innerHTML);
  };

  // Function to save the current text state to history
  const saveHistory = () => {
    setHistory((prevHistory) => [...prevHistory, text]);
  };

  return (
    <div className="app-container">
      <div className="text-editor">
        <div
          className="editable-text"
          contentEditable
          dangerouslySetInnerHTML={{ __html: text || '<p><br></p>' }}
          style={{
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: fontColor,
          }}
          onInput={(e) => updateTextState()}
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
          <button onClick={() => handleSpecialAction('delete')}><img src="delete.png" /></button>
          <button onClick={() => handleSpecialAction('clear')}><img src="clear.png" /></button>
          <button onClick={handleUndo}><img src="undo.png" /></button>
        </div>
      </div>
      <Keyboard onKeyPress={(char) => {
        saveHistory(); // Save history before adding new text
        setText(text + char);
      }} language={language} textCase={textCase} />
    </div>
  );
};

export default App;
