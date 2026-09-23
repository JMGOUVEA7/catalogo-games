import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import GameForm from './components/GameForm'
import GameList from './components/GameList'

const API_URL = 'http://127.0.0.1:8000/api/jogos/'

function App() {
  const [jogos, setJogos] = useState([])
  const [pesquisa, setPesquisa] = useState('')
  const [ordenacao, setOrdenacao] = useState('nome')
  const [totalJogos, setTotalJogos] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [formularioAberto, setFormularioAberto] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erroFormulario, setErroFormulario] = useState('')

  useEffect(() => {
    const atraso = setTimeout(() => buscarJogos(pesquisa), 300)
    return () => clearTimeout(atraso)
  }, [pesquisa])

  async function buscarJogos(termo = '') {
    setCarregando(true)
    setErro('')

    const url = termo.trim()
      ? `${API_URL}?nome=${encodeURIComponent(termo.trim())}`
      : API_URL

    try {
      const resposta = await fetch(url)
      if (!resposta.ok) throw new Error()
      const dados = await resposta.json()
      setJogos(dados)
      if (!termo.trim()) setTotalJogos(dados.length)
    } catch {
      setErro('Não foi possível carregar os jogos. Verifique se o Django está rodando.')
    } finally {
      setCarregando(false)
    }
  }

  async function adicionarJogo(novoJogo) {
    setSalvando(true)
    setErroFormulario('')

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoJogo),
      })

      if (!resposta.ok) throw new Error()
      const jogoCriado = await resposta.json()

      setTotalJogos((total) => total + 1)

      if (
        pesquisa.trim() === '' ||
        jogoCriado.nome.toLowerCase().includes(pesquisa.trim().toLowerCase())
      ) {
        setJogos((atuais) => [...atuais, jogoCriado])
      }

      setFormularioAberto(false)
    } catch {
      setErroFormulario('Não foi possível cadastrar o jogo.')
    } finally {
      setSalvando(false)
    }
  }

  async function excluirJogo(jogo) {
    const confirmar = window.confirm(`Excluir "${jogo.nome}"?`)
    if (!confirmar) return

    try {
      const resposta = await fetch(`${API_URL}${jogo.id}/`, {
        method: 'DELETE',
      })

      if (!resposta.ok) throw new Error()

      setJogos((atuais) => atuais.filter((item) => item.id !== jogo.id))
      setTotalJogos((total) => Math.max(0, total - 1))
    } catch {
      alert('Não foi possível excluir o jogo.')
    }
  }

  const jogosOrdenados = useMemo(() => {
    const lista = [...jogos]

    if (ordenacao === 'nome') {
      return lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    }

    if (ordenacao === 'ano-recente') {
      return lista.sort((a, b) => b.ano_lancamento - a.ano_lancamento)
    }

    if (ordenacao === 'ano-antigo') {
      return lista.sort((a, b) => a.ano_lancamento - b.ano_lancamento)
    }

    if (ordenacao === 'favoritos') {
      return lista.sort((a, b) => Number(b.favorito) - Number(a.favorito))
    }

    return lista
  }, [jogos, ordenacao])

  const favoritosExibidos = jogos.filter((jogo) => jogo.favorito).length

  return (
    <div className="app-shell">
      <Sidebar
        total={totalJogos}
        exibidos={jogos.length}
        favoritos={favoritosExibidos}
        onNovoJogo={() => {
          setErroFormulario('')
          setFormularioAberto(true)
        }}
      />

      <main className="workspace">
        <header className="page-heading">
          <p className="kicker">CATÁLOGO PESSOAL</p>
          <h1>Biblioteca de jogos</h1>
          <p className="page-description">
            Consulte, pesquise e organize os jogos cadastrados.
          </p>
        </header>

        <Toolbar
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          ordenacao={ordenacao}
          setOrdenacao={setOrdenacao}
        />

        <section className="content-panel">
          <div className="content-panel__header">
            <div>
              <h2>Jogos cadastrados</h2>
              <span>
                {pesquisa.trim()
                  ? `${jogos.length} resultado(s) para "${pesquisa}"`
                  : `${totalJogos} registro(s)`}
              </span>
            </div>

            <button
              className="mobile-add"
              type="button"
              onClick={() => setFormularioAberto(true)}
            >
              + Adicionar
            </button>
          </div>

          {erro && (
            <div className="status-box status-box--error">
              <strong>Falha ao carregar.</strong>
              <span>{erro}</span>
              <button type="button" onClick={() => buscarJogos(pesquisa)}>
                Tentar novamente
              </button>
            </div>
          )}

          {!erro && carregando && (
            <div className="status-box">
              <div className="loader" />
              <span>Carregando...</span>
            </div>
          )}

          {!erro && !carregando && (
            <GameList
              jogos={jogosOrdenados}
              aoExcluir={excluirJogo}
              pesquisando={pesquisa.trim() !== ''}
            />
          )}
        </section>
      </main>

      {formularioAberto && (
        <GameForm
          aoAdicionar={adicionarJogo}
          aoFechar={() => {
            if (!salvando) setFormularioAberto(false)
          }}
          salvando={salvando}
          erroServidor={erroFormulario}
        />
      )}
    </div>
  )
}

export default App
