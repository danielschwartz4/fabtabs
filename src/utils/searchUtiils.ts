export const centerSearchWord = (text: string, word: string) => {
  // start x chars in front of word
  return text.substring(text.indexOf(word) - 30, text.indexOf(word) + 100);
};
