import style from "./index.module.css"
import Label from "../Label";
import DueDate from "../DueDate";

export default function Card() {
    return <div className={style.card}>
        <div className={style.title}>Title here</div>
        <div className={style["card-footer"]}>
            <div className={style["label-wrapper"]}><Label /></div>
            <div className={style["due-date"]}><DueDate /></div>
        </div>
    </div>
}
