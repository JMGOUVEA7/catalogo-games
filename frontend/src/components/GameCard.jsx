function GameCard({ jogo, aoExcluir }) {
  const coverClass = `game-card__cover game-card__cover--${(jogo.id % 6) + 1}`

  return (
    <article className="game-card">
      <div className={coverClass}>
        <span className="game-card__letter">
          {jogo.nome.charAt(0).toUpperCase()}
        </span>

        {jogo.favorito && (
          <span className="favorite-badge">★ Favorito</span>
        )}
      </div>

      <div className="game-card__body">
        <div className="game-card__title-row">
          <h3>{jogo.nome}</h3>
          <button
            className="delete-button"
            type="button"
            onClick={() => aoExcluir(jogo)}
            title={`Excluir ${jogo.nome}`}
            aria-label={`Excluir ${jogo.nome}`}
          >
            🗑
          </button>
        </div>

        <div className="game-card__tags">
          <span>{jogo.genero}</span>
          <span>{jogo.plataforma}</span>
        </div>

        <div className="game-card__footer">
          <span>Lançamento</span>
          <strong>{jogo.ano_lancamento}</strong>
        </div>
      </div>
    </article>
  )
}

export default GameCard
