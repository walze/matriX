const allChars = Array.from({ length: 2 ** 16 }, (_, i) => i + 1).map((i) =>
  String.fromCharCode(i)
);

console.log(allChars);

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
if (!ctx) throw "something is wrong with you";
