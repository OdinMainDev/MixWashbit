const HeroAnimation = () => {
  return (
    <div className="wash-scene" aria-hidden="true">
      <div className="wash-scene__stack">
        <img className="wash-sprite wash-bg" src="/wash-bg.svg" alt="" />
        <img className="wash-sprite wash-body" src="/wash-body.png" alt="" />
        <img className="wash-sprite wash-head" src="/wash-head.png" alt="" />
        <img className="wash-sprite wash-arm wash-arm-left" src="/wash-arm-left.png" alt="" />
        <img className="wash-sprite wash-arm wash-arm-right" src="/wash-arm-right.png" alt="" />
        <div className="wash-coin wash-coin-dirty">
          <img src="/wash-btc-dirty.png" alt="" />
        </div>
        <div className="wash-coin wash-coin-clean">
          <img src="/wash-btc-clean.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default HeroAnimation
