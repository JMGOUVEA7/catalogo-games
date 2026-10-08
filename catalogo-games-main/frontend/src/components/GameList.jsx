import GameCard from './GameCard'

function GameList({ jogos, aoExcluir, pesquisando }) {
  if (jogos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__mark">0</div>
        <h3>
          {pesquisando
            ? 'Nenhum jogo encontrado.'
            : 'Nenhum item cadastrado.'}
        </h3>
        <p>
          {pesquisando
            ? 'Tente outro nome na pesquisa.'
            : 'Adicione um jogo para iniciar o catálogo.'}
        </p>
      </div>
    )
  }

  return (
    <div className="game-list">
      {jogos.map((jogo) => (
        <GameCard key={jogo.id} jogo={jogo} aoExcluir={aoExcluir} />
      ))}
    </div>
  )
}

export default GameList
