import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import toast, { Toast } from "react-hot-toast"
import { UndoToast } from "./UndoToast.tsx"

interface ConfirmationButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  undoCallback?: () => void
  icon: IconDefinition
  timeout: number
  undoMessage: string
  callback: () => void
}

const RERENDER_INTERVAL = 1000

export function UndoableButton({
  icon,
  timeout,
  undoMessage,
  onClick,
  undoCallback,
  callback,
}: ConfirmationButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (onClick) {
      onClick(event)
    }

    const toastId = crypto.randomUUID()

    const timeoutId = setTimeout(() => {
      toast.dismiss(toastId)
      callback()
    }, timeout)

    toast.custom(
      (t: Toast) => {
        return (
          <UndoToast
            rerenderInterval={RERENDER_INTERVAL}
            timeout={timeout}
            onUndoClicked={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation()
              toast.dismiss(t.id)

              if (timeoutId) {
                clearTimeout(timeoutId)
              }

              if (undoCallback) {
                undoCallback()
              }
            }}
            toast={t}
            undoMessage={undoMessage}
          ></UndoToast>
        )
      },
      { duration: timeout, id: toastId },
    )
  }

  return (
    <>
      <button className="btn btn-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </>
  )
}
