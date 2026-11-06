# Testes automatizados do Banco Web

Projeto de estudos para aprender a automatizar testes de aplicações web com Cypress e JavaScript. Os testes exercitam fluxos de login e transferência na aplicação Banco Web.

## Componentes do projeto

- `cypress/e2e/`: especificações de teste executadas pelo Cypress.
- `cypress/fixtures/credenciais.json`: dados de login válidos e inválidos usados nos testes.
- `cypress/support/commands/`: implementação dos Custom Commands, separados por funcionalidade.
- `cypress/support/commands.js`: importa e registra os arquivos de comandos.
- `cypress/support/e2e.js`: carrega os comandos e registra o reporter para os testes E2E.
- `cypress.config.js`: configuração E2E, URL base da aplicação e integração com o reporter.
- `package.json`: dependências e scripts npm do projeto.
- `cypress/reports/html/`: relatório HTML gerado pelo Mochawesome Reporter após a execução.

## Pré-requisitos

- Node.js e npm instalados.
- A API [banco-api](https://github.com/juliodelimas/banco-api) em execução.
- A aplicação web [banco-web](https://github.com/juliodelimas/banco-web) em execução e acessível em `http://localhost:4000`, conforme `baseUrl` em `cypress.config.js`.

Configure e inicie a API e a aplicação seguindo as instruções dos respectivos repositórios. Inicie os dois serviços antes de executar os testes. Se a aplicação web estiver em outra URL, atualize `baseUrl` em `cypress.config.js`.

## Instalação

Clone este repositório, acesse a pasta do projeto e instale as dependências:

```bash
git clone https://github.com/cintiadiasl/banco-web-tests-2.git
cd banco-web-tests-2
npm install
```

## Execução

Com a API e a aplicação web em execução, use um dos comandos:

```bash
npm test
```

Executa os testes no navegador em modo headless. O script `test-qa` também executa `cypress run`:

```bash
npm run test-qa
```

Para executar com o navegador visível:

```bash
npm run cy:headed
```

Para abrir a interface interativa do Cypress:

```bash
npm run cy:open
```

O script `test-prod` também executa `cypress run`; ele não configura uma URL de produção. A URL utilizada continua sendo a definida em `cypress.config.js`.

Após a execução, consulte o relatório HTML em `cypress/reports/html/index.html`. O Cypress também pode produzir screenshots e vídeos conforme a configuração e o resultado dos testes; esses artefatos ficam sob `cypress/` e estão ignorados pelo Git.

## Testes E2E

### Login (`cypress/e2e/login.cy.js`)

- Login com credenciais válidas: verifica se o acesso apresenta a tela de realização de transferência.
- Login com credenciais inválidas: verifica a mensagem de erro no toast.
- Antes de cada cenário, abre a página inicial e registra um screenshot.

### Transferências (`cypress/e2e/transferencia.cy.js`)

- Transferência de valor válido: verifica a mensagem de sucesso.
- Transferência acima de R$ 5.000,00 sem token: verifica a mensagem de autenticação necessária.
- Antes de cada cenário, abre a página e realiza login com credenciais válidas.

## Custom Commands

Os comandos estão em `cypress/support/commands/` e são importados por `cypress/support/commands.js`.

- `cy.verificarMensagemNoToast(mensagem)`: verifica se o elemento `.toast` contém exatamente a mensagem informada.
- `cy.selecionarOpcaoNaCombobox(labelDoCampo, opcao)`: localiza uma combobox pelo `label` associado, abre a lista e seleciona a opção indicada.
- `cy.fazerLoginComCredenciaisValidas()`: lê as credenciais válidas do fixture `credenciais.json`, preenche usuário e senha e envia o formulário.
- `cy.fazerLoginComCredenciaisInvalidas()`: usa as credenciais inválidas do fixture e envia o formulário.
- `cy.realizarTransferencia(contaOrigem, contaDestino, valor)`: seleciona as contas de origem e destino, informa o valor e aciona a transferência.

As credenciais são dados de teste mantidos no fixture. Use credenciais apropriadas ao ambiente de teste; não armazene credenciais reais ou sensíveis no repositório.
