export type DataType = {
  [url: string]: {
    notes: NotesType;
    title: string;
  };
};

export type NotesType = { [note: string]: NoteType };

export type NoteType = { posUrl: string; comment?: string };

export interface Highlight {
  string: string;
  container: string;
  anchorNode: string;
  anchorOffset: number;
  focusNode: string;
  focusOffset: number;
  color: string;
  textColor: string;
  href: string;
  uuid: string;
  createdAt: number;
}
