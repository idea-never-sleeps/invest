'use client';

import Image from 'next/image';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Container>
      <Background />
      <BackgroundVector
        fill={true}
        src="/bg.svg"
        alt="background"
        sizes="100vh"
      />
      <Text>404 | The requested content is not found.</Text>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: #ffffff;
`;

const Text = styled.span`
  font-size: 20px;
  font-weight: 500;
  padding: 20px;
`;

const Background = styled.div`
  background-color: #000;
  z-index: -2;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const BackgroundVector = styled(Image)`
  z-index: -1;
  position: absolute;
  stroke-width: 1.085px;
  stroke: #fff;
  opacity: 0.58;
  object-fit: cover;
`;
