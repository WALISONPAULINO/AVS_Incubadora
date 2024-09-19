import '@testing-library/react-native/extend-expect';
import Index from '../../../src/Telas/Index';
import App from '../../../App';
import { render, screen } from '@testing-library/react-native';

describe("Testes de componentes", () => {
    test("Testando se Index abre através de App. Nesse cenário o usuário está deslogado", () => {
        render(<App />)
    })
})