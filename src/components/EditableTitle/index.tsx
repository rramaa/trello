import style from "./index.module.css";
import EditIcon from "../EditIcon/icons8-edit.svg";
import React from "react";

interface EditableTitleProps {
    title: string;
    onUpdateTitle: (title: string) => void
}

export default function EditableTitle({title, onUpdateTitle}: EditableTitleProps) {
    let [editable, updateEditable] = React.useState(false)
    let inputRef = React.useRef<HTMLInputElement>(null)
    let [updatedTitle, newTitle] = React.useState(title)
    function onTitleChange(e: any) {
        newTitle(e.target.value)
    }
    function onEditClick() {
        updateEditable(true)
        setTimeout(() => {
            inputRef.current?.focus()
        })
    }
    function onKeyDown(e: any) {
        if(e.key === "Enter") {
            onUpdateTitle(updatedTitle)
            updateEditable(false)
        } else if(e.key === "Escape") {
            updateEditable(false)
            newTitle(title)
        }
    }
    return (
        <div className={style.title}>
            {editable && <input ref={inputRef} className={style["title-input"]} value={updatedTitle} onKeyDown={onKeyDown} onChange={onTitleChange} />}
            {!editable && <div>{title}</div>}
            {!editable && <img className={style["edit-icon"]} onClick={onEditClick} src={EditIcon} alt={"Edit Icon"}/>}
        </div>
    )
}
