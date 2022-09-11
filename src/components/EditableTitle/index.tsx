import style from "./index.module.css";
import EditIcon from "../EditIcon/icons8-edit.svg";
import React, {useEffect} from "react";

interface EditableTitleProps {
    title: string;
    onUpdateTitle: (title: string) => void;
    defaultEditing?: boolean
    onCancel?: () => void
}

export default function EditableTitle({title, onUpdateTitle, defaultEditing = false, onCancel }: EditableTitleProps) {
    let [editable, updateEditable] = React.useState(defaultEditing)
    let inputRef = React.useRef<HTMLInputElement>(null)
    let [updatedTitle, newTitle] = React.useState(title)
    function onTitleChange(e: any) {
        newTitle(e.target.value)
    }
    useEffect(() => {
        if(defaultEditing) {
            inputRef.current?.focus()
        }
    }, [])
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
            onCancel && onCancel()
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
