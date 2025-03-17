import { useState, useEffect } from "react";
import WordGrid from "components/WordGrid";
import Keyboard from "components/Keyboard";
import type { WordGridData, Word } from "types/WordGrid";

export function Welcome() {

  const [wordGridData, setWordGridData] = useState(getEmptyWordGridData);
  
  useEffect(() => {
    const storedWordGridData: WordGridData | null = getStoredWordGridData();
    if (storedWordGridData) {
      setWordGridData(storedWordGridData);
    }
  }, []);

  function getEmptyWordGridData(): WordGridData {
    const wordGridData = [];
    for (let i = 0; i < 6; i++) {
      const word: Word = {letters: [], checked: false};
      for (let j = 0; j < 5; j++) {
        word.letters.push({ value: "", result: 0 });
      }
      wordGridData.push(word);
    }
    return wordGridData;
  }

  function getStoredWordGridData() : WordGridData | null {
    const storedDataString: string | null = localStorage.getItem("wordGridData");
    if (storedDataString) {
      const storedData: { [key: string]: WordGridData } = JSON.parse(storedDataString);
      const todayDateString: string = new Date().toDateString();
      if (storedData && storedData[todayDateString]) {
        return storedData[todayDateString];
      }
    }
    return null;
  }
  
  function typeLetter(typedLetter: string) {
    const editableRowIndex: number = wordGridData.findIndex(word => !word.checked);
    if (editableRowIndex >= 0) {
      const wordGridDataCopy: WordGridData = wordGridData.map(word => ({...word, letters: word.letters.map(letter => ({...letter}))}));
      const lastLetterIndex: number = wordGridData[editableRowIndex].letters.findLastIndex(letter => letter.value);
      if (typedLetter == "backspace") {
        if (lastLetterIndex != -1) {
          wordGridDataCopy[editableRowIndex].letters[lastLetterIndex].value = "";
        }
      } else {
        if (lastLetterIndex == -1) {
          wordGridDataCopy[editableRowIndex].letters[0].value = typedLetter;
        } else if (lastLetterIndex < 4) {
          wordGridDataCopy[editableRowIndex].letters[lastLetterIndex + 1].value = typedLetter;
        }
      }
      setWordGridData(wordGridDataCopy);
    }
  }

  async function checkWord(word: string | null) {
    if (word) {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const url = `${VITE_BACKEND_URL || "http://localhost:8000"}/api/guesses/`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ guess: word.toLowerCase() }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (response.ok) { 
        const resultArray: number[] = json.result;
        const wordGridDataCopy: WordGridData = wordGridData.map(word => ({...word, letters: word.letters.map(letter => ({...letter}))}));
        const currentWordIndex = wordGridDataCopy.findIndex(word => !word.checked);
        const todayDateString: string = new Date().toDateString();
        let totalScore: number = 0; // 5 needed to win
        // Update results from response
        resultArray.forEach((letterResult, letterIndex) => {
          totalScore += letterResult;
          wordGridDataCopy[currentWordIndex].letters[letterIndex].result = letterResult;
        });
        wordGridDataCopy[currentWordIndex].checked = true;
        // Set value wordGridData
        setWordGridData(wordGridDataCopy);
        // Update localStorage
        const dataToStore: { [key: string]: WordGridData } = {};
        dataToStore[todayDateString] = wordGridDataCopy;
        localStorage.setItem("wordGridData", JSON.stringify(dataToStore));
        if (totalScore == 5) {
          alert("Congrats, you guessed the word! Try again tomorrow for a new word!");
        }
      } else {
        alert("This word is not in our list of recognized words! Please try another word :)");
      }
    }
  }

  return (
    <main className="flex flex-col items-center pt-20 bg-white">
      <WordGrid data={wordGridData} />
      <Keyboard typeLetter={typeLetter} checkWord={checkWord} data={wordGridData} />
    </main>
  );
}
