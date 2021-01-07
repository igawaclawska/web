import { useState } from 'react'
import removeAccents from 'remove-accents'

export default function BottomInput ({
  handleCorrectAnswer,
  bookmarkToStudy,
  notifyKeyPress
}) {
  const [currentInput, setCurrentInput] = useState('')
  const [hintLength, setHintLength] = useState(0)

  function hint () {
    return bookmarkToStudy.from.substring(0, hintLength)
  }

  function handleHint () {
    setCurrentInput('')
    setHintLength(hintLength + 1)
  }

  function eliminateTypos (x) {
    return x.trim().toUpperCase()
    // .replace(/[^a-zA-Z ]/g, '')
  }

  function checkResult () {
    var a = removeAccents(eliminateTypos(currentInput))
    var b = removeAccents(eliminateTypos(bookmarkToStudy.from))
    if (a === b) {
      handleCorrectAnswer()
    }
  }

  return (
    <div className='bottomInput'>
      <button onClick={e => handleHint()}>Hint</button>

      <input
        type='text'
        placeholder={hint()}
        value={currentInput}
        onChange={e => setCurrentInput(e.target.value)}
        onKeyUp={e => {
          if (currentInput !== '') {
            notifyKeyPress()
          }
          if (e.key === 'Enter') {
            checkResult()
          }
        }}
        autoFocus
      />

      <button onClick={checkResult}>Check</button>
    </div>
  )
}