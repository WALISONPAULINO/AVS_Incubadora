import React from 'react';
import { render } from '@testing-library/react-native';
import Cadastro from '../../../src/Telas/cadastro';
import { AuthContext } from '../context/auth';

const mockAuthContext = {
    cadastro: jest.fn(),
  };

describe('Teste simples de renderização', () => {

  test('Testando se exibe o campo de "Nome"', () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Cadastro />
      </AuthContext.Provider>
    );
    expect(getByText('Nome')).toBeTruthy();
  });


  test('Testando se exibe o campo de "E-mail"', () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Cadastro />
      </AuthContext.Provider>
    );

    expect(getByText('E-mail')).toBeTruthy();
  });

  // Teste para verificar se o campo de "Senha" aparece
  test('Testando se exibe o campo de "Senha"', () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Cadastro />
      </AuthContext.Provider>
    );

    expect(getByText('Senha')).toBeTruthy();
  });

  test('Testando se exibe o botão "Cadastrar"', () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Cadastro />
      </AuthContext.Provider>
    );

    expect(getByText('Cadastrar')).toBeTruthy();
  });

});
