'use client';

import LineBackground from '@/components/background';
import Image from 'next/image';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Container>
      <LineBackground />
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
