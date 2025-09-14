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

export const walkTwoBases = (prevBases: Array<boolean>) => {
  const [first, second, third] = prevBases;
  let runsScored = 0;

  // Calculate runs scored based on forced advances
  if (first && second && third) {
    // Bases loaded: second and third both score
    runsScored = 2;
  } else if ((first && second) || (first && third) || (second && third)) {
    // Any two bases occupied: one runner scores
    runsScored = 1;
  }
  // All other cases: no runs scored

  // Result is always: first = false, second = true, third = true (except empty bases)
  const newBases = [
    false, // First base always empty after walk
    true,  // Batter always goes to second
    true   // Third always occupied (except when bases were completely empty)
  ];

  // Special case: if bases were completely empty, third stays empty
  if (!first && !second && !third) {
    newBases[2] = false;
  }

  return { newBases,  runsScored };
};
