import React, { useEffect, useState } from "react";
import Header from "./Header";
import GameCircle from "./GameCircle";
import Footer from "./Footer";
import "../Game.css";
import { isDraw, isWinner, getComputerMove } from "../helper";
import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  NO_CIRCLES,
  NO_PLAYER,
  PLAYER_1,
  PLAYER_2,
} from "../Constants";

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winner, setWinner] = useState(NO_PLAYER);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING);
    setWinner(NO_PLAYER);
  };

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  const circleClicked = (id) => {
    if (gameBoard[id] !== NO_PLAYER) return;
    if (gameState !== GAME_STATE_PLAYING) return;

    if (isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setWinner(currentPlayer);
    }

    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setWinner(NO_PLAYER);
    }

    setGameBoard((prev) => {
      return prev.map((circle, pos) => {
        if (pos === id) return currentPlayer;
        return circle;
      });
    });
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const renderCircle = (id) => {
    return (
      <GameCircle
        id={id}
        key={id}
        className={`player_${gameBoard[id]}`}
        onCircleClicked={() => circleClicked(id)}
      ></GameCircle>
    );
  };

  const suggestMove = () => {
    circleClicked(getComputerMove(gameBoard));
  };

  return (
    <>
      <Header
        gameState={gameState}
        currentPlayer={currentPlayer}
        winner={winner}
      />
      <div className="gameBoard">{initBoard()}</div>
      <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} />
    </>
  );
};

export default GameBoard;
