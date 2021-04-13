export default function setColor(idx: any) {
  const sectionColors = ["#FFB803", "#F61C36", "#2CB416", "#FAFF05", "#5FD8FF", "#E089FF"];

  return sectionColors[parseInt(idx) - 1];
};