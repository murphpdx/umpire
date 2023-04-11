import {ReactNode} from "react";


export const getNumberSuffix = (inningNumber: number) => {
  let inning: string = '';
  switch (inningNumber) {
    case 1:
      inning = `${inningNumber}st`
      break;
    case 2:
      inning = `${inningNumber}nd`
      break;
    case 3:
      inning = `${inningNumber}rd`
      break;
    default:
      inning = `${inningNumber}th`
      break;
  }
  return inning;
}

export const renderIcons = (filledNode: ReactNode, outlinedNode: ReactNode, count: number, total: number): ReactNode => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push(filledNode)
  }
  for (let i = count; i < total; i++) {
    nodes.push(outlinedNode)
  }
  return nodes;
}
