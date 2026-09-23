function StatsBar({ total, exibidos, favoritos }) {
  return (
    <section className="stats">
      <article className="stat-card">
        <div className="stat-card__icon">🎮</div>
        <div>
          <strong>{total}</strong>
          <span>Cadastrados</span>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-card__icon">👁</div>
        <div>
          <strong>{exibidos}</strong>
          <span>Exibidos</span>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-card__icon">★</div>
        <div>
          <strong>{favoritos}</strong>
          <span>Favoritos exibidos</span>
        </div>
      </article>
    </section>
  )
}

export default StatsBar
