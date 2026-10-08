# PlayShelf — Catálogo de Jogos

Frontend React para o projeto de catálogo de jogos com backend Django REST.

## API esperada

- GET `http://127.0.0.1:8000/api/jogos/`
- GET `http://127.0.0.1:8000/api/jogos/?nome=...`
- POST `http://127.0.0.1:8000/api/jogos/`
- DELETE `http://127.0.0.1:8000/api/jogos/<id>/`

## Rodar

```bash
npm install
npm run dev
```

O Django deve estar rodando em `http://127.0.0.1:8000`.
