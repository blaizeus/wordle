import type { WordGridData } from "../types/WordGrid";
import LetterBox from "./LetterBox";

interface WordGridProps {
  data: WordGridData;
}

export default function WordGrid({ data }: WordGridProps) {
  return (
    <div className="mb-12">
    {data.map((word, wordIndex) => {
        return <div key={wordIndex} style={{display: "flex"}}>
        {word.letters.map((letter, letterIndex) => {
            return <LetterBox key={letterIndex} letter={letter.value} result={letter.result} checkedWord={word.checked} />
        })}
        </div>
    })}
    </div>
  )
}
