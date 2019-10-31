import React from 'react';

import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>30 de Outubro</strong>
        <button type="button">
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>
    </Container>
  );
}
