
![Logo](https://i.pinimg.com/originals/21/11/61/21116158daaeb1459b4ec0758505e1ad.gif)


# Gestão de Compras 

## Estrutura do README

1. **Resumo do Projeto**
1. **Tecnologias Utilizadas / Variáveis de Ambiente**
2. **Instalação**
3. **Documentação da API**
4. **Demonstração**

   * Vídeo gravado no YouTube
5. **Screenshots**

> Para testar os endpoints, abra os arquivos `.http` localizados em cada pasta de **service** no backend e utilizando VS Code execute-os com a extensão Rest Client.

## Resumo do Projeto

Gestão de Compras é uma plataforma completa para administração de pedidos de medicamentos, especialmente desenvolvida para drogarias.

## Tecnologias Utilizadas

- **Nestjs**
- **Nextjs**
- **PostgreSQL**
- **Docker** 
- **Stripe**


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env no backend.

`UID` `GID` `PORT` `STRIPE_SECRET_KEY` `STRIPE_PUBLISHABLE_KEY` 

`DB_DATABASE` `DB_USERNAME` `DB_PASSWORD`

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env no frontend.

`NEXT_PUBLIC_API_URL` `NEXT_PUBLIC_ENV` `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Instalação

Siga os passos abaixo para configurar o projeto Gestão de Compras :

1. **Clone o repositório**
```bash
https://github.com/Rhaniel99/Teste_Tecnico.git
```
2. **Configure o arquivo .env na pasta backend**
*Copie o arquivo .env.example para .env e ajuste as credenciais conforme necessário:*

3. **Inicie os containers no backend**
```bash
docker compose -f docker-compose-dev.yml up --build -d
```

4. **Configure o arquivo .env.local na pasta frontend**
*Copie o arquivo .env.local.example para .env.local e ajuste as credenciais conforme necessário:*

5. **Inicie os containers no frontend**
```bash
docker compose -f docker-compose-dev.yml up --build -d
```



## Documentação da API

1. ####  Criar Cliente.

- ###### Cria um novo registro de cliente no banco de dados.

```http
POST /customers
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Obrigatório. Nome do Cliente. |


#### Resposta

- Sucesso (201 Created):
  - Retorna os dados do cliente criado.

```json
{
  "id": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
  "name": "Drogaria Francisco"
}
```

- Erro (400 Bad Request):
  - Retorna um erro caso ocorra falha na criação.

```json
{
  "message": "Erro ao criar cliente",
  "error": "Detalhes do erro"
}
```

2. ####  Recuperar Todos os Clientes.

- ###### Retorna uma lista de todos os clientes cadastrados.

```http
GET /customers
```

#### Resposta

- Sucesso (200 Ok):
  - Retorna uma lista de clientes.

```json
[
  {
    "id": "52cfea2d-88fb-4e10-86a8-1b0070ac1ead",
    "name": "Drogaria Santo Leao"
  },
  {
    "id": "bb7bc8a8-98a0-447a-ab8f-c23b14642f54",
    "name": "Drogaria Sofia"
  }
]
```
- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na recuperação.

```json
{
  "message": "Erro ao recuperar clientes!",
  "error": "Detalhes do erro"
}
```

3. #### Recuperar Cliente por ID

- ###### Retorna os dados de um cliente específico pelo ID.


```http
GET /customers/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | Obrigatório. ID do cliente. |


#### Resposta

- Sucesso (200 Ok):
  - Retorna os dados do cliente encontrado.

```json
{
  "id": "52cfea2d-88fb-4e10-86a8-1b0070ac1ead",
  "name": "Drogaria Santo Leao"
}
```

- Erro (404 Not Found):
  - Retorna um erro caso o ID não seja encontrado.

```json
{
  "message": "CLiente não encontrado"
}
```

- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na recuperação.

```json
{
  "message": "Erro ao recuperar cliente",
  "error": "Detalhes do erro"
}
```

4. #### Atualizar Estudante

- ###### Atualiza as informações de um estudante pelo ID.


```http
PATCH /customers/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do cliente |

#### Resposta

- Sucesso (200 Ok):
  - Retorna os dados atualizados do cliente.

```json
{
  "id": "52cfea2d-88fb-4e10-86a8-1b0070ac1ead",
  "name": "Drogaria Santo Bento"
}
```

- Erro (404 Not Found):
  - Retorna um erro caso o ID não seja encontrado.

```json
{
  "message": "Cliente não encontrado"
}
```

- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na atualização.

```json
{
  "message": "Erro ao atualizar o cliente",
  "error": "Detalhes do erro"
}
```

5. #### Deletar Cliente

- ###### Remove um cliente pelo ID.

```http
DELETE /customers/:id
```


#### Resposta

- Sucesso (204 No Content):
  - A operação foi realizada com sucesso, sem conteúdo de resposta

- Erro (404 Not Found):
  - Retorna um erro caso o ID não seja encontrado.

```json
{
  "message": "Cliente não encontrado"
}
```

- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na exclusão.

```json
{
  "message": "Erro ao deletar cliente",
  "error": "Detalhes do erro"
}

```

6. ####  Criar Pedidos.

- ###### Cria um novo registro de pedido no banco de dados.

```http
POST /orders
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `clientId` | `string` | Obrigatório. ID do Cliente. |
| `items` | `string` | Obrigatório. Nome do Item. |
| `total` | `number` | Obrigatório. O total de Items. |


#### Resposta

- Sucesso (201 Created):
  - Retorna os dados do pedido criado.

```json
{
  "id": "d613525c-575c-436c-8352-1491a76a1b20",
  "clientId": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
  "items": "Torsilax",
  "total": 15,
  "status": "pendente"
}
```

- Erro (400 Bad Request):
  - Retorna um erro caso ocorra falha na criação.

```json
{
  "message": "Erro ao criar pedido",
  "error": "Detalhes do erro"
}
```

7. ####  Recuperar Todos os Pedidos.

- ###### Retorna uma lista de todos os pedidos cadastrados.

```http
GET /orders
```

#### Resposta

- Sucesso (200 ok):
  - Retorna uma lista de pedido.

```json
[
  {
    "id": "d613525c-575c-436c-8352-1491a76a1b20",
    "client": "Drogaria Santo Bento",
    "clientId": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
    "items": "Torsilax",
    "total": "15",
    "status": "pendente"
  },
  {
    "id": "4032d8f1-0672-497b-aa6d-d5ef75a96513",
    "client": "Drogaria Santo Bento",
    "clientId": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
    "items": "Dorflex",
    "total": "30",
    "status": "pendente"
  }
]

```
- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na recuperação.

```json
{
  "message": "Erro ao recuperar pedidos!",
  "error": "Detalhes do erro"
}
```

8. #### Recuperar Pedido por ID

- ###### Retorna os dados de um pedido específico pelo ID.


```http
GET /orders/:id
```

#### Resposta

- Sucesso (200 Ok):
  - Retorna os dados do pedido encontrado.

```json
{
  "id": "d613525c-575c-436c-8352-1491a76a1b20",
  "client": {
    "id": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
    "name": "Drogaria Santo Bento"
  },
  "clientId": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
  "items": "Torsilax",
  "total": "15",
  "status": "pendente"
}
```

- Erro (404 Not Found):
  - Retorna um erro caso o ID não seja encontrado.

```json
{
  "message": "Pedido não encontrado"
}
```

- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na recuperação.

```json
{
  "message": "Erro ao recuperar pedido",
  "error": "Detalhes do erro"
}
```

9. #### Atualizar Pedido

- ###### Atualiza as informações de um pedido pelo ID.


```http
PATCH /orders/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `status` | `number` | Opcional. Status do pedido. |
| `items` | `string` | Opcional. Nome do pedido. |
| `total` | `string` | Opcional. Total do pedido. |

#### Resposta

- Sucesso (200 Ok):
  - Retorna os dados atualizados do pedido.

```json
{
  "id": "d613525c-575c-436c-8352-1491a76a1b20",
  "client": {
    "id": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
    "name": "Drogaria Santo Bento"
  },
  "clientId": "98e4efb1-1323-44b6-9116-d5cbc55007d8",
  "items": "Torsilax",
  "total": "15",
  "status": "cancelado"
}
```

- Erro (404 Not Found):
  - Retorna um erro caso o ID não seja encontrado.

```json
{
  "message": "Pedido não encontrado"
}
```

- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na atualização.

```json
{
  "message": "Erro ao atualizar o pedido",
  "error": "Detalhes do erro"
}
```

10. #### Deletar Pedido

- ###### Remove um cliente pelo ID.

```http
DELETE /orders/:id
```

#### Resposta

- Sucesso (204  No Content):
  - A operação foi realizada com sucesso, sem conteúdo de resposta

- Erro (404 Not Found):
  - Retorna um erro caso o ID não seja encontrado.

```json
{
  "message": "Pedido não encontrado"
}
```

- Erro (500 Internal Server Error):
  - Retorna um erro caso ocorra falha na exclusão.

```json
{
  "message": "Erro ao deletar pedido",
  "error": "Detalhes do erro"
}

```

11. #### Criar PaymentIntent (Stripe)

- ###### Cria um novo PaymentIntent no Stripe e retorna o clientSecret para finalizar o pagamento no front‑end

```http
POST /stripe
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `amount` | `number` | Obrigatório. Valor do pagamento em reais (ex.: 100 para R$ 100,00). Internamente é multiplicado por 100 para centavos. |
| `currency` | `string` | Opcional. Código ISO da moeda. |
| `metadata` | `object` | Opcional. Dados adicionais que serão anexados ao PaymentIntent (por ex.: { "orderId": "..." }). |


#### Resposta

- Sucesso (201 Created):
  - Retorna o clientSecret do PaymentIntent.

```json
{
  "clientSecret": "pi_3Mz..._secret_ABCxyz"
}
```
- Erro de Validação (400 Bad Request):
  - Um ou mais campos não passaram na validação do DTO.

```json
{
  "statusCode": 400,
  "message": [
    "amount must be a number not less than 0",
    "currency should not be empty"
  ],
  "error": "Bad Request"
}
```

- Erro (500 Internal Server Error):
  - Alguma falha ocorreu ao chamar a API do Stripe (ex.: chave errada, problema de rede).

```json
{
  "statusCode": 500,
  "message": "Erro ao criar PaymentIntent: This API call cannot be made with a publishable API key. Please use a secret API key.",
  "error": "Internal Server Error"
}

```
## Demonstração

> **📺 Demonstração da utilização do Sistema**  
> ▶️ [Assistir aqui](https://youtu.be/cj_ZGGYZWOA)
## Screenshots

### Home

![App Screenshot](https://i.pinimg.com/736x/0f/9a/7c/0f9a7c3120b910440c72063f9bfb0d5e.jpg)

### Dashboard

![App Screenshot](https://i.pinimg.com/736x/65/dc/44/65dc44421d1c3c460c7d68e684f522ca.jpg)

### Modal Criação

![App Screenshot](https://i.pinimg.com/736x/f7/76/67/f7766710b4e0c2370e8725d93d88d07b.jpg)

### Modal de Pagamento Utilizando Stripe

![App Screenshot](https://i.pinimg.com/736x/b3/36/32/b336320c929737d34bc367f8318c93b7.jpg)
