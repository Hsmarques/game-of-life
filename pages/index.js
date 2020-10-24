import Head from "next/head";
import styled from "styled-components";
import { Board } from "../Components/Board";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
const Title = styled.h1`
  outline: 1px solid tomato;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;
const Controls = styled.div`
  outline: 1px solid tomato;
  margin-top: 1rem;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Game of Life</title>
      </Head>
      <Container>
        <Title>Game of Life</Title>
        <Board>Board</Board>
        <Controls>Controls</Controls>
      </Container>
    </>
  );
}
