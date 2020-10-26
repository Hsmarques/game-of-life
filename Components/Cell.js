import styled from "styled-components";

const CellAliveDiv = styled.div.attrs(({ x, y }) => ({
  style: {
    left: `${8 * x + 1}px`,
    top: `${8 * y + 1}px`,
  },
}))`
  background: ${({ theme }) => theme.colors.primary};
  position: absolute;
  width: 7px;
  height: 7px;
  z-index: 1;
`;

export const CellAlive = ({ x, y }) => {
  return <CellAliveDiv x={x} y={y} />;
};
