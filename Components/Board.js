import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useInterval } from "../custom-hooks/useInterval";
import { CellBlock, CellAlive } from "./Cell";

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

const BoardContainer = styled.div`
  outline: 1px solid ${({ theme }) => theme.colors.primary};
  position: relative;
  width: 800px;
  height: 800px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  background-size: 8px 8px;
  background-image: linear-gradient(palevioletred 1px, transparent 1px),
    linear-gradient(90deg, palevioletred 1px, transparent 1px);
`;

export const Board = ({ hasGameStarted }) => {
  const boardRef = useRef(null);
  const createBoard = () => {
    let emptyBoard = [];
    for (let y = 0; y < 100; y++) {
      emptyBoard[y] = [];
      for (let x = 0; x < 100; x++) {
        emptyBoard[y][x] = false;
      }
    }

    return emptyBoard;
  };
  const [board, setBoard] = useState(createBoard());
  const [cells, setCells] = useState([]);

  const getElementOffset = () => {
    const rect = boardRef.current.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  };

  const handleClick = (event) => {
    const elemOffset = getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    let newBoard = board.map((inner) => inner.slice());

    const x = Math.floor(offsetX / 8);
    const y = Math.floor(offsetY / 8);

    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      newBoard[y][x] = !newBoard[y][x];
    }
    let newCells = [];
    newBoard.map((yRow, yIndex) =>
      yRow.map((xRow, xIndex) => {
        if (newBoard[yIndex][xIndex]) {
          newCells.push({ x: xIndex, y: yIndex });
        }
      })
    );
    setBoard(newBoard);
    setCells(newCells);
  };

  const runTick = () => {
    let newBoard = createBoard();

    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        let neighbours = getNumberOfNeighbours(board, x, y);
        if (board[y][x]) {
          if (neighbours === 2 || neighbours === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else if (!board[y][x] && neighbours === 3) {
          newBoard[y][x] = true;
        }
      }
    }

    let newCells = [];
    newBoard.map((yRow, yIndex) =>
      yRow.map((xRow, xIndex) => {
        if (newBoard[yIndex][xIndex]) {
          newCells.push({ x: xIndex, y: yIndex });
        }
      })
    );

    setBoard(newBoard);
    setCells(newCells);
  };

  const getNumberOfNeighbours = (board, x, y) => {
    let neighbours = 0;

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      let neighbourYposition = y + direction[0];
      let neighbourXposition = x + direction[1];

      if (
        neighbourXposition >= 0 &&
        neighbourXposition < 100 &&
        neighbourYposition >= 0 &&
        neighbourYposition < 100 &&
        board[neighbourYposition][neighbourXposition]
      ) {
        neighbours++;
      }
    }

    return neighbours;
  };

  const setCellAlive = (x, y) => {
    let newCells = [...cells, { x, y }];
    setCells(newCells);
  };

  useInterval(() => {
    if (hasGameStarted) {
      runTick();
    }
  }, 200);

  // useEffect(() => {
  //   if (hasGameStarted) {
  //     let id = setTimeout(() => runTick(), 1000);
  //     return () => {
  //       console.log("clearing interval");
  //       return clearTimeout(id);
  //     };
  //   }
  // }, [hasGameStarted]);

  return (
    <>
      <BoardContainer ref={boardRef} onClick={handleClick}>
        {cells.map((cell) => (
          <CellAlive x={cell.x} y={cell.y} key={`cell-${cell.x}-${cell.y}`} />
        ))}
      </BoardContainer>
    </>
  );
};
