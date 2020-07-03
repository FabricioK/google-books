### Utilizando

- Google books: (https://developers.google.com/books/)
- Material UI (https://material-ui.com/)
- ReactJS
- Dotnet Core 3.1
- Banco de dados : SQLite
- Conceitos da autenticação reaproveitados de [mickeysden](https://medium.com/mickeysden/react-and-google-oauth-with-net-core-backend-4faaba25ead0)

## Como utilizar

1. Faça um clone deste repositório.
2. Criar uma aplicação no [console da google](https://console.developers.google.com/), em credenciais adicionar uma chave e d API e uma credencial de OAuth 2.0.
Nas configurações da credencial de OAuth 2.0 , adicionar a url de redirecionamento autorizada para https://suarota:porta/v1/auth/google, exemplo :https://localhost:5000/v1/auth/google

 - Na Biblioteca ativar a Book api para este projeto
 - Na tela de consentimento OAuth , adicionar o Scope da Book Api.

3. Na pasta client, criar um arquivo .env contento as seguintes credenciais => 

REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_AUTH_CALLBACK_URL=http://localhost:5000/api/auth/google
REACT_APP_GOOGLE_CLIENT_ID=estaurlnaoevalida.apps.googleusercontent.com

 - Atualizar os pacotes com yarn ou npm
 - Iniciar o front com o comando yarn/npm start

4. Na pasta server, adicionar client_secrets.json do google e criar um arquivo appsettings.json  com a sequinte estrutura:

"AppSettings": {
    "JwtSecret": "ChaveSecretaComTamanhoSuficiente",
    "GoogleClientId": "GoogleClientIdValidoDasCredenciais.apps.googleusercontent.com",
    "GoogleClientSecret": "GoogleClientSecretValidoDasCredenciais",
    "JwtEmailEncryption": "ChaveSecretaComTamanhoSuficienteParaEmail",
    "GoogleApiKey": "GoogleApiKeyDeAplicacao"
  },
- Iniciar o backend com dotnet run

## Utilizando docker e docker-compose
No momento esta aplicação não esta 100% funcional com o docker apesar de estar totalmente configurada para isto. 
Isto ocorre porque a biblioteca utilizada na consulta de livros utiliza um recurso indisponível no kestrel e portanto não consegue gerar as credenciais do usuário.