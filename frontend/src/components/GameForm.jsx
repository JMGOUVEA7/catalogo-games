import { useState } from 'react'

function GameForm({ aoAdicionar, aoFechar, salvando, erroServidor }) {
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [ano, setAno] = useState('')
  const [favorito, setFavorito] = useState(false)
  const [erro, setErro] = useState('')

  function enviarFormulario(evento) {
    evento.preventDefault()
    setErro('')

    if (!nome.trim() || !genero.trim() || !plataforma.trim() || !ano) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    const anoNumero = Number(ano)
    const limiteAno = new Date().getFullYear() + 5

    if (anoNumero < 1950 || anoNumero > limiteAno) {
      setErro(`Informe um ano entre 1950 e ${limiteAno}.`)
      return
    }

    aoAdicionar({
      nome: nome.trim(),
      genero: genero.trim(),
      plataforma: plataforma.trim(),
      ano_lancamento: anoNumero,
      favorito,
    })
  }

  return (
    <div className="drawer-backdrop" onMouseDown={aoFechar}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="drawer__header">
          <div>
            <p className="kicker">NOVO REGISTRO</p>
            <h2>Adicionar jogo</h2>
            <p>Cadastre um novo item na biblioteca.</p>
          </div>

          <button type="button" className="drawer__close" onClick={aoFechar}>
            ×
          </button>
        </div>

        <form className="game-form" onSubmit={enviarFormulario}>
          {(erro || erroServidor) && (
            <div className="form-error">{erro || erroServidor}</div>
          )}

          <label className="field">
            <span>Nome *</span>
            <input
              type="text"
              placeholder="Ex.: Minecraft"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoFocus
            />
          </label>

          <label className="field">
            <span>Gênero *</span>
            <input
              type="text"
              placeholder="Ex.: Sandbox"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Plataforma *</span>
            <input
              type="text"
              placeholder="Ex.: PC"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Ano de lançamento *</span>
            <input
              type="number"
              placeholder="Ex.: 2011"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
          </label>

          <label className="favorite-switch">
            <input
              type="checkbox"
              checked={favorito}
              onChange={(e) => setFavorito(e.target.checked)}
            />
            <span className="favorite-switch__track">
              <span className="favorite-switch__thumb" />
            </span>
            <span>
              <strong>Marcar como favorito</strong>
              <small>O jogo ficará destacado na lista.</small>
            </span>
          </label>

          <div className="drawer__actions">
            <button className="button button--ghost" type="button" onClick={aoFechar}>
              Cancelar
            </button>

            <button className="button button--primary" type="submit" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}

export default GameForm
