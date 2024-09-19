import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../../../src/Telas/Index'

describe('Componente Login', () => {
  test('Testando se renderiza o formulário de login corretamente', () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    expect(getByPlaceholderText('Digite seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });

  test('Testando se exibe "E-mail" e "Senha" na tela', () => {
    const { getByText } = render(<Login />);
    
    expect(getByText('E-mail')).toBeTruthy();
    expect(getByText('Senha')).toBeTruthy();
  });

});
