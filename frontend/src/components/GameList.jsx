import GameCard from './GameCard'

function GameList({ jogos, aoExcluir, pesquisando }) {
  if (jogos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">🎮</div>
        <h3>{pesquisando ? 'Nenhum jogo encontrado.' : 'Nenhum item cadastrado.'}</h3>
        <p>
          {pesquisando
            ? 'Tente pesquisar por outro nome.'
            : 'Use o botão “Novo jogo” para iniciar seu catálogo.'}
        </p>
      </div>
    )
  }

  return (
    <div className="game-grid">
      {jogos.map((jogo) => (
        <GameCard
          key={jogo.id}
          jogo={jogo}
          aoExcluir={aoExcluir}
        />
      ))}
    </div>
  )
}

export default GameList
