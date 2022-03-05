// function to perform random number generation
const randGen = (sidesPerSquare = 3) => {
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

const deepCopy = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // create array or object to hold values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    outObject[key] = deepCopy(value);
  }

  return outObject;
};

const rowCheck = (
  out,
  rowCount,
  sidesPerSquare = 3,
  softLimits,
  squareLimit
) => {
  // let prevSoftState = [...softLimits];
  // let prevSquareState = [...squareLimit];

  let prevSoftState = deepCopy(softLimits);
  let prevSquareState = deepCopy(squareLimit);

  let numRowAdd = [];
  let hardLimit = randGen(sidesPerSquare);

  let rowLog = [];

  for (let bigSquare = 1; bigSquare <= sidesPerSquare; bigSquare++) {
    // let softLimit = [...hardLimit];
    let softLimit = deepCopy(hardLimit);

    // console.log("soft", softLimit);
    // console.log("softstate", prevSoftState);
    // console.log("hard", hardLimit);
    // console.log("square", squareLimit);

    for (let smallSquare = 0; smallSquare < sidesPerSquare; smallSquare++) {
      let currentSquareCount = (bigSquare - 1) * 3 + smallSquare;

      // calculate which square the space belongs to
      let squareCalc =
        Math.floor(currentSquareCount / sidesPerSquare) +
        Math.floor(rowCount / sidesPerSquare) * sidesPerSquare;
      // console.log(
      //   "**********" + squareCalc + "**********" + rowCount,
      //   currentSquareCount
      // );
      // var rowSoftLimit = [...softLimit];
      var rowSoftLimit = deepCopy(softLimit);

      for (let prevSquare = rowCount - 1; prevSquare >= 0; prevSquare--) {
        let taken = out[prevSquare][currentSquareCount];
        // console.log("out", taken);
        let takenIndex = rowSoftLimit.indexOf(taken);
        if (takenIndex >= 0) rowSoftLimit.splice(takenIndex, 1);
      }

      for (let takenNum of Object.keys(prevSquareState[squareCalc])) {
        let taken = prevSquareState[squareCalc][takenNum];
        // console.log("square out", taken);
        let takenIndex = rowSoftLimit.indexOf(taken);
        if (takenIndex >= 0) rowSoftLimit.splice(takenIndex, 1);
      }

      // console.log("soft", softLimit);
      // console.log("square soft", rowSoftLimit);
      // console.log("hard", hardLimit);

      let addToRow = rowSoftLimit[0];

      if (addToRow) {
        // console.log("currentsquare", currentSquareCount, "addtorow", addToRow);
        prevSoftState[currentSquareCount][addToRow] = [addToRow, squareCalc];
        prevSquareState[squareCalc][addToRow] = addToRow;

        rowLog.push(addToRow);
        numRowAdd.push(addToRow);

        hardLimit.splice(hardLimit.indexOf(addToRow), 1);
        softLimit.splice(softLimit.indexOf(addToRow), 1);
      } else {
        let again = true;
        let squareCheck = 0;
        let limitCounter = 0;

        while (again) {
          // console.log(
          //   "squarecheck",
          //   squareCheck,
          //   "limitCounter",
          //   limitCounter,
          //   "current square",
          //   currentSquareCount,
          //   hardLimit.length
          // );

          if (limitCounter == hardLimit.length) {
            // console.log("----------------RESTART----------------");
            return [false, false, false];
          }

          if (squareCheck == currentSquareCount) {
            squareCheck = 0;
            limitCounter++;
            continue;
          }

          if (
            !prevSoftState[squareCheck][hardLimit[limitCounter]] &&
            !prevSoftState[currentSquareCount][rowLog[squareCheck]] &&
            !squareLimit[squareCalc][rowLog[squareCheck]]
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

            const swapSquare =
              prevSoftState[squareCheck][rowLog[squareCheck]][1];
            const swapValue =
              prevSoftState[squareCheck][rowLog[squareCheck]][0];
            delete prevSoftState[squareCheck][rowLog[squareCheck]];

            // console.log("swapsquare", swapSquare, swapValue);
            // console.log(prevSquareState);
            // break

            prevSquareState[squareCalc][rowLog[squareCheck]] =
              rowLog[squareCheck];

            // console.log(
            //   prevSoftState,
            //   squareCheck,
            //   rowLog,
            //   limitCounter,
            //   hardLimit,
            //   prevSquareState
            // );
            // console.log(
            //   "test",
            //   prevSoftState[squareCheck][rowLog[squareCheck]]
            // );

            // console.log("pre swap square", prevSquareState);
            delete prevSquareState[swapSquare][rowLog[squareCheck]];
            // console.log("post swap square", prevSquareState);

            prevSquareState[swapSquare][hardLimit[limitCounter]] =
              hardLimit[limitCounter];

            // break

            prevSoftState[squareCheck][hardLimit[limitCounter]] = [
              hardLimit[limitCounter],
              swapSquare,
            ];
            prevSoftState[currentSquareCount][rowLog[squareCheck]] = [
              rowLog[squareCheck],
              squareCalc,
            ];

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
  // console.log(
  //   "===================================================================================="
  // );
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!RETURN TRUEEEEEEEE");
  return [numRowAdd, prevSoftState, prevSquareState];
};

export const sudokuGen = (sidesPerSquare = 3) => {
  let out = [];
  // limit per col
  let colSoftLimits = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  // limit per square
  let squareLimit = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  // generate sudoku rows
  while (out.length != sidesPerSquare ** 2) {
    let rowCount = out.length;
    let row, newSoftLimits, newSquareLimit;

    [row, newSoftLimits, newSquareLimit] = rowCheck(
      out,
      rowCount,
      sidesPerSquare,
      colSoftLimits,
      squareLimit
    );

    let count = 0;
    while (!row || !newSoftLimits || !newSquareLimit) {
      if (count == 1) {
        return sudokuGen();
      }
      count++;
      // console.log(
      //   "!!!!!!!!!!!!!!!!!RESTART CHECK",
      //   row,
      //   newSoftLimits,
      //   newSquareLimit,
      //   squareLimit
      // );
      [row, newSoftLimits, newSquareLimit] = rowCheck(
        out,
        rowCount,
        sidesPerSquare,
        colSoftLimits,
        squareLimit
      );
    }

    colSoftLimits = [...newSoftLimits];
    squareLimit = [...newSquareLimit];

    out.push(row);

    for (let list in out) {
      // console.log("fuck", out.length);
      // console.log(out[list].toString(), new Set(out[list]).size);

      if (out[list].includes(undefined)) return;
      if (new Set(out[list]).size != sidesPerSquare ** 2) return;
    }
    // console.log("rows:", rowCount + 1);
    // console.log(squareLimit);
    // console.log(colSoftLimits);
    // if (rowCount == 5) return;
  }
  return out.flat();
};
