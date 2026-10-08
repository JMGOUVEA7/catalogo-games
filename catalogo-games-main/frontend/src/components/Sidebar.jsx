function Sidebar({ total, exibidos, favoritos, onNovoJogo }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand__mark">PS</div>
        <div>
          <strong>PlayShelf</strong>
          <span>Catálogo de jogos</span>
        </div>
      </div>

      <button className="add-button" type="button" onClick={onNovoJogo}>
        ＋ Adicionar jogo
      </button>

      <div className="sidebar__section">
        <p className="sidebar__label">RESUMO</p>

        <div className="metric">
          <span>Cadastrados</span>
          <strong>{total}</strong>
        </div>

        <div className="metric">
          <span>Exibidos</span>
          <strong>{exibidos}</strong>
        </div>

        <div className="metric">
          <span>Favoritos</span>
          <strong>{favoritos}</strong>
        </div>
      </div>

      <div className="sidebar__footer">
        <span className="connection-dot" />
        API Django
      </div>
    </aside>
  )
}

export default Sidebar
