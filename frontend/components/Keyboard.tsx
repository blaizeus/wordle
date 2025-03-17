import type { WordGridData, Word } from "../types/WordGrid";

interface KeyboardProps {
  typeLetter: (letter: string) => void;
  checkWord: (word: string | null) => void;
  data: WordGridData;
}

export default function Keyboard({ typeLetter, checkWord, data }: KeyboardProps) {

  const keyboardValues: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["enter", "Z", "X", "C", "V", "B", "N", "M", "backspace"]
  ]
  const keyboardValuesMobile: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "enter", "backspace"]

  function getOrValidateWord(): string | null {
    const currentWordIndex = data.findIndex(word => !word.checked);
    const currentWordObj: Word = data[currentWordIndex];
    let currentWord: string = "";
    currentWordObj.letters.forEach(letterObj => {
      currentWord += letterObj.value;
    });
    if (currentWord.length < 5) {
      alert("Chosen word must be 5 letters long. Please enter a valid 5 letter word and try again :)");
      return null;
    }
    return currentWord;
  }

  return (
    <>
      <div className="hidden sm:block">
        {keyboardValues.map((keyboardRow, rowIndex) => {
          return <div key={rowIndex} className="flex justify-center">
            {keyboardRow.map((keyName, keyIndex) => {
              return <button onClick={
                keyName == "enter" ? () => checkWord(getOrValidateWord()) : () => typeLetter(keyName)
              } className="bg-slate-200 min-w-6 py-4 px-4 m-1 rounded cursor-pointer font-bold text-black" key={keyIndex}>{keyName}</button>
            })}
        </div>
        })}
      </div>
      <div className="flex justify-center sm:hidden w-full flex-wrap">
        {keyboardValuesMobile.map((keyName, keyIndex) => {
          return <button onClick={
            keyName == "enter" ? () => checkWord(getOrValidateWord()) : () => typeLetter(keyName)
          } className="bg-slate-200 min-w-6 py-4 px-4 m-1 rounded cursor-pointer font-bold text-black" key={keyIndex}>{keyName}</button>
        })}
    </div>
    </>
  )
}
