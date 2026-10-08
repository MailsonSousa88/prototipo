# Cosmos

Protótipo de média fidelidade de um aplicativo de estudos focado em organização, constância e sessões de foco. A proposta combina uma lista de tarefas com uma sequência diária que, visualmente, constrói um cosmos de estrelas e constelações.

> Este projeto é exclusivamente um protótipo de interface. Não possui backend, autenticação, banco de dados ou persistência local. Os dados são simulados em memória e reiniciam ao recarregar a aplicação.

## Funcionalidades

- Splash screen e onboarding em três etapas.
- Tela inicial com sequência diária interativa.
- Planeta animado que funciona como botão para incrementar a sequência.
- Lista de tarefas com filtros de hoje, próximas e concluídas.
- Criação simulada de tarefas.
- Marcação de tarefas e subtarefas como concluídas.
- Detalhes da tarefa.
- Configuração de sessões de foco de 15, 25 ou 50 minutos.
- Cronômetro com pausa, continuação e encerramento.
- Tela de conclusão da sessão de foco.
- Cosmos interativo inspirado no grafo do Obsidian.
- Movimentação da constelação por toque ou mouse.
- Estrelas selecionáveis e animadas.
- Estatísticas do Cosmos apresentadas sob demanda em uma gaveta inferior.
- Perfil e resumo semanal.
- Navegação compatível com Android, iOS e web.

## Tecnologias

| Tecnologia | Versão | Utilização |
| --- | --- | --- |
| React | 19.1 | Componentes, hooks e composição da interface. |
| React Native | 0.81.5 | Construção da interface nativa e multiplataforma. |
| TypeScript | 5.9 | Tipagem dos modelos, propriedades, navegação e ViewModels. |
| Expo | SDK 54 | Ambiente de desenvolvimento, execução e build do aplicativo. |
| React Native Web | 0.21 | Execução do protótipo em navegadores. |

## Bibliotecas utilizadas

- `@expo/vector-icons`: ícones da interface através do conjunto Ionicons.
- `expo-font`: carregamento das fontes necessárias para os ícones do Expo.
- `expo-status-bar`: controle visual da barra de status.
- `react-native-safe-area-context`: respeito às áreas seguras de aparelhos com notch e barras do sistema.
- `react-native-svg`: desenho das conexões e dos pontos da constelação.
- `react-dom`: renderização da versão web.

Não foi utilizada uma biblioteca externa de navegação ou gerenciamento de estado. Como se trata de um protótipo, a navegação e o estado global são controlados pelo `useAppViewModel` com hooks do React.

## Animações e interações

As animações foram construídas com a API `Animated` do próprio React Native.

### Planeta da sequência

- `Animated.Value` controla a flutuação vertical do planeta.
- `Animated.timing` define duração e progressão das animações.
- `Animated.sequence` alterna a subida e descida.
- Uma rotação contínua mantém a pequena lua em órbita.
- `useNativeDriver: true` executa transformações de maneira mais eficiente.
- O planeta inteiro é um `Pressable` e incrementa a sequência ao ser tocado.

### Cosmos

- `PanResponder` captura movimentos de toque e mouse.
- `Animated.ValueXY` mantém a posição do grafo durante o arraste.
- `react-native-svg` desenha as linhas que conectam as estrelas.
- `Animated.loop` e interpolação de escala/opacidade criam o pulso das estrelas especiais.
- Cada estrela possui uma área clicável para apresentar sua identificação.
- As estatísticas permanecem escondidas até a abertura pelo botão de menu.

## Arquitetura MVVM

O projeto utiliza uma organização inspirada em MVVM para separar dados, comportamento e apresentação:

```text
src/
├── components/
│   └── ui.tsx
├── models/
│   ├── app.ts
│   └── mockData.ts
├── theme/
│   └── index.ts
├── viewmodels/
│   ├── useAppViewModel.ts
│   ├── useCosmosViewModel.ts
│   └── useSequencePlanetViewModel.ts
└── views/
    ├── AppView.tsx
    ├── CosmosView.tsx
    ├── FocusViews.tsx
    ├── HomeView.tsx
    ├── OnboardingViews.tsx
    ├── ProfileView.tsx
    └── TaskViews.tsx
```

### Models

Contêm os contratos TypeScript e os dados simulados utilizados pelo protótipo:

- Tipos de tela e navegação.
- Modelo de tarefa.
- Modelo de estrela.
- Tarefas iniciais e conteúdo do onboarding.

### ViewModels

Concentram o estado e o comportamento da aplicação:

- `useAppViewModel`: navegação, tarefas, sequência e fluxo das sessões de foco.
- `useCosmosViewModel`: movimentação do grafo, estrela selecionada, animações e abertura das estatísticas.
- `useSequencePlanetViewModel`: flutuação do planeta e órbita contínua da lua.

### Views

Renderizam as telas e encaminham as interações do usuário aos ViewModels. As Views não conhecem backend ou mecanismos de persistência.

### Components

Contêm elementos visuais reutilizáveis, como botões, cabeçalhos, itens de tarefa, ícones e barra de navegação.

O arquivo `App.tsx` apenas inicializa os providers e conecta o ViewModel principal à View raiz.

## Requisitos

- Node.js 20 ou superior.
- npm.
- Expo Go no dispositivo, caso queira testar em Android ou iOS sem gerar um build nativo.

## Instalação

```bash
npm install
```

## Execução

Iniciar o servidor do Expo:

```bash
npm start
```

Executar diretamente no navegador:

```bash
npm run web
```

Executar no Android:

```bash
npm run android
```

Executar no iOS:

```bash
npm run ios
```

No Windows, a execução do iOS depende de um dispositivo com Expo Go ou de um ambiente macOS para o simulador nativo.

## Validação

Verificar os tipos TypeScript:

```bash
npm run typecheck
```

Gerar o bundle web de produção:

```bash
npx expo export --platform web
```

Verificar a configuração e a compatibilidade das dependências Expo:

```bash
npx expo-doctor
```

Na última validação do protótipo, o TypeScript e o bundle web foram concluídos sem erros, e o Expo Doctor aprovou todas as 18 verificações.

## Direção visual

A interface utiliza uma estética de observatório calmo:

- Fundo claro nas telas de produtividade.
- Fundo noturno no Cosmos e durante sessões de foco.
- Roxo como cor principal.
- Amarelo para estrelas e descobertas.
- Superfícies arredondadas e espaçamento amplo.
- Feedback visual em botões, estrelas e elementos interativos.

## Limitações do protótipo

- As tarefas existem apenas durante a sessão atual.
- A sequência não é limitada a um incremento diário real.
- O cronômetro não continua em segundo plano.
- Datas, horários, perfil e estatísticas são demonstrativos.
- Não existem contas, sincronização ou notificações reais.
