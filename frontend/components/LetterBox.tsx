interface LetterBoxProps {
  letter: string;
  result: number | null;
  checkedWord: boolean;
}

export default function LetterBox({ letter, result, checkedWord }: LetterBoxProps) {
  const getColors = (): { backgroundColor: string; color: string } => {
    let colors: { backgroundColor: string; color: string } = {backgroundColor: "", color: ""};
    switch (result) {
      case -1:
        colors.backgroundColor = "grey";
        colors.color = "white";
        break;
      case 0:
        colors.backgroundColor = "#c9b458";
        colors.color = "white";
        break;
      case 1:
        colors.backgroundColor = "#6aaa64";
        colors.color = "white";
        break;
      default:
        break;
    }
    return checkedWord ? colors : {backgroundColor: "", color: "black"};
  }

  return (
    <div
    style={getColors()}
    className="flex justify-center items-center h-16 w-16 m-0.5 border-2 border-gray-300 font-bold text-3xl">{letter}</div>
  )
}
