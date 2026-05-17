import { useEffect, useRef, useState } from 'react';
import './HangmanGame.css';
import Button from './shared/design-system/Button';
import Error from './shared/design-system/Error';
import Feedback from './shared/design-system/Feedback';
import Heading from './shared/design-system/Heading';
import Input from './shared/design-system/Input';
import Layout from './shared/design-system/Layout';

const MAX_MISTAKES = 6;
const WORDS_DATABASE = [
  'REACT',
  'JAVASCRIPT',
  'DEVELOPPEUR',
  'ENTRETIEN',
  'CLAVIER',
  'INTERFACE',
];

const getNewWord = () => {
  const randomIndex = Math.floor(Math.random() * WORDS_DATABASE.length);
  return WORDS_DATABASE[randomIndex].toUpperCase();
};

export function HangmanGame() {
  const [word, setWord] = useState(getNewWord());
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef(null);

  const handleGuess = letter => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) {
      if (guessedLetters.has(letter)) {
        setFeedback(`La lettre "${letter}" a déjà été proposée.`);
      }
      return;
    }

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);
    setFeedback('');

    if (!word.includes(letter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      if (newMistakes >= MAX_MISTAKES) {
        setGameStatus('lost');
        return;
      }
    }

    const allLettersGuessed = word
      .split('')
      .every(letter => newGuessedLetters.has(letter));
    if (allLettersGuessed) {
      setGameStatus('won');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const value = inputRef.current.value.toUpperCase();
    if (value && /^[A-Z]$/.test(value) && gameStatus === 'playing') {
      handleGuess(value);
      inputRef.current.value = '';
    }
  };

  const handleReset = () => {
    setWord(getNewWord());
    setGuessedLetters(new Set());
    setMistakes(0);
    setGameStatus('playing');
    setFeedback('');
  };

  useEffect(() => {
    if (gameStatus === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStatus]);

  if (!word) {
    return (
      <Layout>
        <div>Chargement...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading level={1}>Jeu du Pendu</Heading>

      <p>Trouvez le mot caché !</p>

      <Error variant="error">
        Erreurs restantes : {MAX_MISTAKES - mistakes}
      </Error>

      <p className="word-display">
        {word
          .split('')
          .map(letter => (guessedLetters.has(letter) ? letter : '_'))
          .join(' ')}
      </p>

      {gameStatus === 'playing' ? null : (
        <div className="game-status">
          <p>{gameStatus === 'won' ? 'Gagné ! Bravo !' : 'Perdu... Le mot a été pendu !'}</p>
          <Button onClick={handleReset}>Rejouer</Button>
        </div>
      )}

      {gameStatus === 'lost' && (
        <p>
          Le mot était : <strong>{word}</strong>
        </p>
      )}

      {gameStatus === 'playing' && (
        <form onSubmit={handleSubmit} className="form">
          <Input
            ref={inputRef}
            type='text'
            maxLength={1}
            pattern='[A-Za-z]'
            aria-label='Proposer une lettre'
            autoFocus
          />
          <Button type='submit'>
            Deviner
          </Button>
        </form>
      )}

      {feedback && <Feedback type="warning">{feedback}</Feedback>}

      <div className="guessed-letters-container">
        Lettres déjà proposées : {[...guessedLetters].sort().join(', ')}
      </div>
    </Layout>
  );
}
