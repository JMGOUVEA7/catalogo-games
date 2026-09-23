import { useEffect, useMemo, useState } from 'react'
import './App.css'

import Header from './components/Header'
import StatsBar from './components/StatsBar'
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
  const [modalAberto, setModalAberto] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erroFormulario, setErroFormulario] = useState('')

  useEffect(() => {
    const atraso = setTimeout(() => {
      buscarJogos(pesquisa)
    }, 300)

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

      if (!resposta.ok) {
        throw new Error('Falha ao buscar jogos')
      }

      const dados = await resposta.json()
      setJogos(dados)

      if (!termo.trim()) {
        setTotalJogos(dados.length)
      }
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoJogo),
      })

      if (!resposta.ok) {
        throw new Error('Falha ao cadastrar jogo')
      }

      const jogoCriado = await resposta.json()

      setTotalJogos((total) => total + 1)

      if (
        pesquisa.trim() === '' ||
        jogoCriado.nome.toLowerCase().includes(pesquisa.trim().toLowerCase())
      ) {
        setJogos((jogosAtuais) => [...jogosAtuais, jogoCriado])
      }

      setModalAberto(false)
    } catch {
      setErroFormulario('Não foi possível cadastrar o jogo. Tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  async function excluirJogo(jogo) {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir "${jogo.nome}"?`
    )

    if (!confirmar) {
      return
    }

    try {
      const resposta = await fetch(`${API_URL}${jogo.id}/`, {
        method: 'DELETE',
      })

      if (!resposta.ok) {
        throw new Error('Falha ao excluir')
      }

      setJogos((jogosAtuais) =>
        jogosAtuais.filter((item) => item.id !== jogo.id)
      )
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
    <div className="app">
      <Header
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        onNovoJogo={() => {
          setErroFormulario('')
          setModalAberto(true)
        }}
      />

      <main className="container">
        <section className="hero">
          <div className="hero__content">
            <span className="eyebrow">MINHA BIBLIOTECA</span>
            <h1>
              Seus jogos em um <span>só lugar.</span>
            </h1>
            <p>
              Cadastre, pesquise, organize e acompanhe seu catálogo de games.
            </p>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="controller">🎮</div>
          </div>
        </section>

        <StatsBar
          total={totalJogos}
          exibidos={jogos.length}
          favoritos={favoritosExibidos}
        />

        <section className="catalog-section">
          <div className="section-header">
            <div>
              <span className="eyebrow">CATÁLOGO</span>
              <h2>Todos os jogos</h2>
            </div>

            <label className="sort-control">
              <span>Ordenar por</span>
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="nome">Nome A–Z</option>
                <option value="ano-recente">Mais recentes</option>
                <option value="ano-antigo">Mais antigos</option>
                <option value="favoritos">Favoritos primeiro</option>
              </select>
            </label>
          </div>

          {erro && (
            <div className="feedback feedback--error">
              <strong>Erro ao carregar.</strong>
              <span>{erro}</span>
              <button type="button" onClick={() => buscarJogos(pesquisa)}>
                Tentar novamente
              </button>
            </div>
          )}

          {!erro && carregando && (
            <div className="feedback">
              <div className="spinner" />
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

      {modalAberto && (
        <GameForm
          aoAdicionar={adicionarJogo}
          aoFechar={() => {
            if (!salvando) {
              setModalAberto(false)
            }
          }}
          salvando={salvando}
          erroServidor={erroFormulario}
        />
      )}
    </div>
  )
}

export default App
