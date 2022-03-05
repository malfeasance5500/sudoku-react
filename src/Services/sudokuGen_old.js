// function to perform random number generation
export const randGen = (sidesPerSquare = 3) => {
  var final = [];

  // initiate number range
  var num = new Array(sidesPerSquare ** 2);
  for (let square = 0; square < sidesPerSquare ** 2; square++) {
    num[square] = square + 1;
  }

  // generate random list of numbers
  for (var number = 0, count = 0; number < 9; number++, count++) {
    var choice = Math.floor(Math.random() * num.length);
    final.push(num[choice]);
    num.splice(choice, 1);
  }
  return final;
};

export const rowCheck = (out, rowCount, sidesPerSquare = 3, softLimits) => {
  let prevState = [...softLimits];

  let numRowAdd = [];
  let hardLimit = randGen(sidesPerSquare);

  let rowLog = [];

  for (let bigSquare = 1; bigSquare <= sidesPerSquare; bigSquare++) {
    let softLimit = [...hardLimit];

    // console.log("soft", softLimit);
    // console.log("hard", hardLimit);

    for (let smallSquare = 0; smallSquare < sidesPerSquare; smallSquare++) {
      let currentSquareCount = (bigSquare - 1) * 3 + smallSquare;
      var squareSoftLimit = [...softLimit];

      for (let prevSquare = rowCount - 1; prevSquare >= 0; prevSquare--) {
        let taken = out[prevSquare][currentSquareCount];
        // console.log("out", taken);
        let takenIndex = squareSoftLimit.indexOf(taken);
        if (takenIndex >= 0) squareSoftLimit.splice(takenIndex, 1);
      }

      // console.log("soft", softLimit);
      // console.log("square soft", squareSoftLimit);
      // console.log("hard", hardLimit);

      let addToRow = squareSoftLimit[0];

      if (addToRow) {
        // console.log("currentsquare", currentSquareCount, "addtorow", addToRow);
        prevState[currentSquareCount][addToRow] = addToRow;
        rowLog.push(addToRow);
        numRowAdd.push(addToRow);

        hardLimit.splice(hardLimit.indexOf(addToRow), 1);
        softLimit.splice(softLimit.indexOf(addToRow), 1);
      } else {
        let again = true;
        let squareCheck = 0;
        let limitCounter = 0;

        while (again) {
          // console.log("squarecheck", squareCheck, "limitCounter", limitCounter);
          if (squareCheck == currentSquareCount) {
            squareCheck = 0;
            limitCounter++;
            continue;
          }

          if (limitCounter == hardLimit.length) {
            // console.log("----------------RESTART----------------");
            return [false, false];
          }

          if (
            !prevState[squareCheck][hardLimit[limitCounter]] &&
            !prevState[currentSquareCount][rowLog[squareCheck]]
          ) {
            // console.log(
            //   "swap",
            //   "idx1",
            //   squareCheck,
            //   "val",
            //   rowLog[squareCheck],
            //   "idx2",
            //   currentSquareCount,
            //   hardLimit[limitCounter]
            // );
            delete prevState[squareCheck][rowLog[squareCheck]];

            prevState[squareCheck][hardLimit[limitCounter]] =
              hardLimit[limitCounter];
            prevState[currentSquareCount][rowLog[squareCheck]] =
              rowLog[squareCheck];

            addToRow = rowLog[squareCheck];
            // console.log("pre psuh", addToRow);
            numRowAdd[squareCheck] = hardLimit[limitCounter];
            // console.log("post push", addToRow);
            numRowAdd.push(addToRow);
            rowLog[squareCheck] = hardLimit[limitCounter];
            rowLog.push(addToRow);

            let softIndex = softLimit.indexOf(hardLimit[limitCounter]);
            if (softIndex >= 0) softLimit.splice(softIndex, 1);

            hardLimit.splice(limitCounter, 1);
            again = false;
          }
          squareCheck++;
        }
      }
    }
  }
  // console.log("====================");
  return [numRowAdd, prevState];
};

export const sudokuGen = (sidesPerSquare = 3) => {
  let out = [];
  let allSoftLimits = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  // generate sudoku rows
  while (out.length != sidesPerSquare ** 2) {
    let rowCount = out.length;

    let [row, newSoftLimits] = rowCheck(
      out,
      rowCount,
      sidesPerSquare,
      allSoftLimits
    );
    while (!row)
      [row, newSoftLimits] = rowCheck(
        out,
        rowCount,
        sidesPerSquare,
        allSoftLimits
      );

    allSoftLimits = [...newSoftLimits];
    out.push(row);

    for (let list in out) {
      // console.log("fuck", out.length);
      // console.log(out[list].toString(), new Set(out[list]).size);

      if (out[list].includes(undefined)) return;
      if (new Set(out[list]).size != sidesPerSquare ** 2) return;
    }
    // console.log("rows:", rowCount + 1);
  }
  return out.flat()
};

