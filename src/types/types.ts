export type DataTypeDep = {
  [url: string]: {
    notes: NotesType;
    title: string;
  };
};

export type NotesType = { [note: string]: NoteType };

export type NoteType = { posUrl: string; comment?: string };

// ! New starts here...

export type DataType = {
  [url: string]: PageGroup;
};

// export type PageGroup = {
//   highlights: Highlight[];
//   title: string;
//   favicon: string;
// };

export type PageGroup = {
  highlights: Highlight[];
  title: string;
  favicon: string;
};

export interface Highlight {
  string: string;
  container: string;
  anchorNode: string;
  anchorOffset: number;
  focusNode: string;
  focusOffset: number;
  color: string;
  textColor: string;
  comment: string;
  href: string;
  uuid: string;
  createdAt: number;
}

export interface HighlightType {
  selection: string;
  container: string;
  color: string;
  textColor: string;
  comment: string;
  href: string;
  uuid: string;
  createdAt: number;
}
