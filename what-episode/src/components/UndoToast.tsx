import React, { useEffect, useState } from "react"
import { Toast } from "react-hot-toast"

interface UndoToastProps {
  rerenderInterval: number
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
  rerenderInterval,
}: UndoToastProps) {
  const [currentMillis, setCurrentMillis] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentMillis(currentMillis + rerenderInterval)
    }, rerenderInterval)

    return () => {
      clearTimeout(timeout)
    }
  }, [currentMillis])

  return (
    <div className={toast.visible ? "" : "toast-leave"}>
      <div className="alert alert-error">
        <span>{undoMessage}</span>
        <progress
          className="progress w-56"
          value={currentMillis}
          max={timeout}
        ></progress>
        <button
          className="btn btn-md"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            onUndoClicked(event)
          }}
        >
          Undo
        </button>
      </div>
    </div>
  )
}
