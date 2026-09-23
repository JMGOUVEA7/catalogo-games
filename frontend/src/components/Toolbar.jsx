function Toolbar({ pesquisa, setPesquisa, ordenacao, setOrdenacao }) {
  return (
    <section className="toolbar">
      <label className="search-field">
        <span className="search-field__icon">⌕</span>
        <input
          type="search"
          placeholder="Pesquisar pelo nome do jogo..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />

        {pesquisa && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setPesquisa('')}
            aria-label="Limpar pesquisa"
          >
            ×
          </button>
        )}
      </label>

      <label className="sort-field">
        <span>Ordenar</span>
        <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
          <option value="nome">Nome A–Z</option>
          <option value="ano-recente">Mais recentes</option>
          <option value="ano-antigo">Mais antigos</option>
          <option value="favoritos">Favoritos primeiro</option>
        </select>
      </label>
    </section>
  )
}

export default Toolbar
