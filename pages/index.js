import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { Board } from "../Components/Board";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Button = styled.button`
  background: ${({ theme, hasGameStarted }) =>
    hasGameStarted ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, hasGameStarted }) =>
    hasGameStarted ? `white` : theme.colors.primary};
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
`;

export default function Home() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [newBoard, setNewBoard] = useState(new Date());
  return (
    <>
      <Head>
        <title>Game of Life</title>
      </Head>
      <Container>
        <Title>Game of Life</Title>
        <Board hasGameStarted={hasGameStarted} />
        <Button
          key={newBoard}
          onClick={() => {
            setHasGameStarted(!hasGameStarted);
            setNewBoard(new Date());
          }}
          hasGameStarted={hasGameStarted}
        >
          {hasGameStarted ? `Stop` : `Start`}
        </Button>
      </Container>
    </>
  );
}
