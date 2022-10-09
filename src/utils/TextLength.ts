const TextLength = (text: string) => {
  return text.length > 40 ? text.slice(0, 39) + "..." : text;
};

export default TextLength;
