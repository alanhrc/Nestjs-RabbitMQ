<h1 align="center">Nest.js / RabbitMQ</h1>

## 🛠️ Instalação

- 1: Clone este repositório;
- 2: Crie um arquivo `.env` a partir do arquivo `.env.example`.
- 3: Preencha todas as variáveis necessárias no `.env`. 
- 4: Instale as dependências, executando o comando: `npm install`;
- 5: Suba o rabbit, executando o comando: `docker compose up -d`;

## 🏃 Rodando o aplicativo

```bash
# Execute o comando:
npm run start:dev

# Abra o Swagger acessando a seguinte URL:
http://localhost:3000/docs

# Utilize o Swagger para retornar `Hello World!`;

# Utilize o Swagger para enviar uma mensagem para fila, 1 clique por mensagem;

# Utilize o Swagger para ativar o consumer da fila e print da mensagem no console log.
```
