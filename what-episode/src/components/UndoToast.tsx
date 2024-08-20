import React from "react"
import { Toast } from "react-hot-toast"

interface UndoToastProps {
  currentMillis: number
  timeout: number
  onUndoClicked: (event: React.MouseEvent<HTMLButtonElement>) => void
  toast: Toast
  undoMessage: string
}

export function UndoToast({
  toast,
  undoMessage,
  onUndoClicked,
  timeout,
  currentMillis,
}: UndoToastProps) {
  return (
    <div className={toast.visible ? "" : "toast-leave"}>
      <div className="alert alert-error">
        <span>{undoMessage}</span>
        <progress
          className="progress w-56"
          value={currentMillis}
          max={timeout}
        ></progress>
        <button className="btn btn-md" onClick={onUndoClicked}>
          Undo
        </button>
      </div>
    </div>
  )
}
