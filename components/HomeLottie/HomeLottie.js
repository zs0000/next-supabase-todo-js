import s from './HomeLottie.module.css'
export default function HomeLottie() {
  return (
    <div className={s.container}>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets3.lottiefiles.com/packages/lf20_MW06pA.json"  background="transparent"  speed="1"  className={s.lottie} loop  autoplay></lottie-player>
    </div>
  )
}
