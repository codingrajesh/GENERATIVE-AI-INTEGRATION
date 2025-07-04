import { useState } from 'react';
import axios from 'axios';

function GenerativeAi() {
  const [query, setQuery] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');

  const generativeHandler = async (e) => {
    e.preventDefault();
    setLoadingMessage('Loading your answer, please wait...');
    setGeneratedAnswer('');

    try {
      const API_URL =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAmvhxhTfEoG1OYog-h3rnv-KrkY1Lypik';

      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: query }] }],
      });

      const content =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No answer found';
      setGeneratedAnswer(content);
      setLoadingMessage('');
      setQuery('');
    } catch (error) {
      setLoadingMessage('');
      setGeneratedAnswer('Error fetching answer.');
      console.error(error.message);
    }
  };

  const styles = {
    textarea: {
      border: '2px solid violet',
      borderStyle: 'inset',
      fontSize: '1rem',
      fontWeight: 'bold',
      padding: '6px',
      width: '100%',
      resize: 'vertical',
    },
    button: {
      backgroundColor: 'violet',
      boxShadow: '4px 2px 2px gray',
      padding: '8px 16px',
      marginTop: '10px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    answerBox: {
      marginTop: '15px',
      padding: '10px',
      border: '1px solid #ccc',
      backgroundColor: 'rgb(168, 13, 168)',
      borderRadius: '12px',
      border: '1px solid whitesmoke',
    },
  };

  return (
    <form onSubmit={generativeHandler}>
      <textarea
        style={styles.textarea}
        rows={5}
        placeholder="Enter something here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <br />
      <button style={styles.button} type="submit">
        Search
      </button>

      {loadingMessage && <div style={styles.answerBox}>{loadingMessage}</div>}
      {generatedAnswer && <div style={styles.answerBox}>{generatedAnswer}</div>}
    </form>
  );
}

export default GenerativeAi;
