export const firstCharacters = (str) => {
  const words = str?.trim().split(" ");
  if (!str) return "";

  return words.map((word) => word.charAt(0).toUpperCase()).join("");
};
