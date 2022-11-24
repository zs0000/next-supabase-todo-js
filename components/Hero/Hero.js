import Link from "next/link"
import s from "./Hero.module.css"

export default function Hero() {
  return (
    <div className={s.container}>
        <h1 className={s.title}>
        Welcome
        </h1>
        <div className={s.links}>
            <Link href="/register" className={s.register}>
                Sign up
            </Link>
            <Link href="/login" className={s.login}>
                Sign in
            </Link>
        </div>
    </div>
  )
}
