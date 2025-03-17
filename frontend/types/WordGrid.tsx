export interface Letter {
    value: string;
    result: number | null;
}

export interface Word {
    letters: Letter[];
    checked: boolean;
}

export type WordGridData = Word[];
