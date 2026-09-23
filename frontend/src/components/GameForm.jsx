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
    const anoAtual = new Date().getFullYear() + 5

    if (anoNumero < 1950 || anoNumero > anoAtual) {
      setErro(`Informe um ano entre 1950 e ${anoAtual}.`)
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
    <div className="modal-backdrop" onMouseDown={aoFechar}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-formulario"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <div>
            <span className="eyebrow">NOVO JOGO</span>
            <h2 id="titulo-formulario">Adicionar ao catálogo</h2>
            <p>Preencha os dados abaixo para cadastrar um jogo.</p>
          </div>

          <button
            className="icon-button"
            type="button"
            onClick={aoFechar}
            disabled={salvando}
            aria-label="Fechar formulário"
          >
            ×
          </button>
        </div>

        <form className="game-form" onSubmit={enviarFormulario}>
          {(erro || erroServidor) && (
            <div className="form-error">{erro || erroServidor}</div>
          )}

          <label className="field field--full">
            <span>Nome do jogo *</span>
            <input
              type="text"
              placeholder="Ex.: Minecraft"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoFocus
            />
          </label>

          <div className="form-grid">
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

            <label className="favorite-toggle">
              <input
                type="checkbox"
                checked={favorito}
                onChange={(e) => setFavorito(e.target.checked)}
              />
              <span className="favorite-toggle__box">★</span>
              <span>
                <strong>Favorito</strong>
                <small>Marcar como favorito</small>
              </span>
            </label>
          </div>

          <div className="modal__actions">
            <button
              className="secondary-button"
              type="button"
              onClick={aoFechar}
              disabled={salvando}
            >
              Cancelar
            </button>

            <button className="primary-button" type="submit" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar jogo'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default GameForm
