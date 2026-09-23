# GameHub — Frontend React

Frontend do projeto **Catálogo de Games**, preparado para consumir a API Django existente.

## API esperada

O frontend usa:

- `GET http://127.0.0.1:8000/api/jogos/`
- `GET http://127.0.0.1:8000/api/jogos/?nome=...`
- `POST http://127.0.0.1:8000/api/jogos/`
- `DELETE http://127.0.0.1:8000/api/jogos/<id>/`

Objeto esperado:

```json
{
  "id": 1,
  "nome": "Minecraft",
  "genero": "Sandbox",
  "plataforma": "PC",
  "ano_lancamento": 2011,
  "favorito": true
}
```

## Rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

O Django deve estar rodando em `http://127.0.0.1:8000`.

## Recursos implementados

- GET e listagem
- POST e cadastro
- DELETE com confirmação
- Pesquisa usando a API Django
- `useState`, `useEffect`, `fetch` e `map`
- Componentização
- Renderização condicional
- Loading
- Tratamento de erro
- Validação
- Total de registros
- Ordenação
- Mensagem quando não há registros
- Interface responsiva
