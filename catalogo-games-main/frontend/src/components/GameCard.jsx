function GameCard({ jogo, aoExcluir }) {
  return (
    <article className="game-row">
      <div className="game-row__initial">
        {jogo.nome.charAt(0).toUpperCase()}
      </div>

      <div className="game-row__main">
        <div className="game-row__title">
          <h3>{jogo.nome}</h3>
          {jogo.favorito && <span className="favorite">★ Favorito</span>}
        </div>

        <div className="game-row__meta">
          <span>{jogo.genero}</span>
          <span>{jogo.plataforma}</span>
          <span>{jogo.ano_lancamento}</span>
        </div>
      </div>

      <div className="game-row__year">
        <small>Lançamento</small>
        <strong>{jogo.ano_lancamento}</strong>
      </div>

      <button
        type="button"
        className="remove-button"
        onClick={() => aoExcluir(jogo)}
      >
        Excluir
      </button>
    </article>
  )
}

export default GameCard
