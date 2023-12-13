Este README descreve uma aplicação React que possui várias páginas e utiliza o React Router para gerenciar as rotas de navegação. A aplicação inclui páginas de login, registro, página inicial, criação de produtos e promoção.

Componente httpService

O componente httpService contém funções para realizar chamadas de API HTTP. Ele é usado para interagir com um servidor backend para realizar operações como login, registro, criação de produtos, obtenção de produtos, obtenção de informações de funcionários, criação de promoções e remoção de produtos. Abaixo estão algumas das principais funções:

login(data): Realiza uma solicitação de login enviando os dados fornecidos para o servidor.

createUser(data): Cria um novo usuário enviando os dados fornecidos para o servidor.

createProduct(data): Cria um novo produto enviando os dados fornecidos para o servidor.

getProducts(): Obtém a lista de produtos do servidor.

getEmployee(value): Obtém informações de um funcionário com base no valor fornecido.

createPromotion(data): Cria uma promoção para um produto com base nos dados fornecidos.

removeProduct(data): Remove um produto com base nos dados fornecidos.

Componente App

O componente App é o componente principal da aplicação React. Ele é responsável por configurar as rotas da aplicação usando o React Router e renderizar os componentes apropriados quando as rotas são acessadas. Aqui estão os principais pontos:

Utiliza o RouterProvider do React Router para fornecer um roteador à aplicação.

Define várias rotas para diferentes páginas da aplicação, como login, registro, página inicial, criação de produtos e promoção.

Redireciona automaticamente para a página de login quando a aplicação é carregada.

Páginas da Aplicação

A aplicação possui várias páginas que correspondem às diferentes rotas definidas no componente App. Aqui está uma breve descrição de cada página:

Login (Login.js): Página de login que permite que os usuários façam login na aplicação. Os dados de login são enviados para o servidor usando o httpService.

Registro (Signup.js): Página de registro que permite que os usuários criem novas contas. Os dados de registro são enviados para o servidor usando o httpService.

Página Inicial (Home.js): Página principal da aplicação que exibe uma lista de produtos. Os produtos são obtidos do servidor usando o httpService.

Criação de Produtos (CreateProduct.js): Página que permite aos usuários criar novos produtos e enviá-los para o servidor usando o httpService.

Promoção (Promotion.js): Página que permite aos usuários criar promoções para produtos existentes usando o httpService.

Estilos

A aplicação utiliza estilos personalizados, bem como estilos do Material-UI para estilização. Os estilos são importados de arquivos CSS externos e aplicados aos elementos da aplicação.

Dependências

A aplicação depende das seguintes bibliotecas e pacotes:

react e react-dom para criar e renderizar componentes React.

react-router-dom para gerenciar as rotas de navegação.

@mui/material para componentes e estilos do Material-UI.

react-toastify para exibir notificações de toasts.

fetch para realizar chamadas de API HTTP.

Certifique-se de instalar todas as dependências necessárias antes de executar a aplicação.

Espero que este README ajude a entender a estrutura e o funcionamento desta aplicação React. Se você tiver alguma dúvida ou precisar de mais informações sobre qualquer parte da aplicação, sinta-se à vontade para perguntar!
