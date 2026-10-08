function Header({ pesquisa, setPesquisa, onNovoJogo }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="brand" href="/" aria-label="GameHub - início">
          <span className="brand__icon">🎮</span>
          <span>Game<span>Hub</span></span>
        </a>

        <div className="search">
          <span className="search__icon">⌕</span>
          <input
            type="search"
            placeholder="Pesquisar jogo pelo nome..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            aria-label="Pesquisar jogos"
          />
          {pesquisa && (
            <button
              className="search__clear"
              type="button"
              onClick={() => setPesquisa('')}
              aria-label="Limpar pesquisa"
            >
              ×
            </button>
          )}
        </div>

        <button className="primary-button" type="button" onClick={onNovoJogo}>
          <span>＋</span>
          Novo jogo
        </button>
      </div>
    </header>
  )
}

export default Header
