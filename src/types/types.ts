export type DataType = {
  [url: string]: {
    notes: NotesType;
    title: string;
  };
};

export type NotesType = { [note: string]: NoteType };

export type NoteType = { posUrl: string; comment?: string };
