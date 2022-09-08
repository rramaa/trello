import style from "./index.module.css"

export default function Label() {
    return <div className={style["label-wrapper"]}>{Array(4).fill(null).map(() => <div className={style.label} />)}</div>
}
