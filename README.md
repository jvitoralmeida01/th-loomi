## Decisões / Arquitetura
O projeto seguiu o uso das tecnologias indicadas no pdf do desafio.
Foi adotado uma estrutura de Clean Architecture para realizar a comunicação com a API, onde
o app router do NextJS funciona como a camada de Apresentação do Clean Arch
Para mitigar a lentidão da API, foram aplicadas duas estratégias de caching em conjunto:
  - Caching com TTL padrão
  - Caching com revalidação eager para prevenir visualização de dados stale após atualizações


## Como rodar o projeto
> npm install
> npm run dev


## Autenticação
O login foi feito pela API, qualquer conta autenticada por lá, é autenticada para fazer login.
Mas por precaução, as minhas credenciais são:
'jvitoralmeida2001@gmail.com'
'Joao123@'


## Uso de IA / Decisões auxiliadas por IA
- Setup inicial do projeto e organização de pastas e arquivos (trabalho manual)
- Esqueleto inicial de cada página baseada em uma imagem do figma (muito distante do objetivo, mas já se economiza um tempo criando uma base)
- Desenho do componente SVG de "borda reversa"
- Criação de mocks
- Configuração inicial dos gráficos do dashboard
- Setup inicial do mapa no dashboard
- Comportamento do Toast na criacao de novos tickets
- Funcoes e logica de calculo de Planos
