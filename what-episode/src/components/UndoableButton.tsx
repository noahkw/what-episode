import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import toast, { Toast } from "react-hot-toast"

interface ConfirmationButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  undoCallback?: () => void
  icon: IconDefinition
  timeout: number
  undoMessage: string
  callback: () => void
  forceUpdate: () => void
}

const RERENDER_INTERVAL = 1000

export function UndoableButton({
  icon,
  timeout,
  undoMessage,
  onClick,
  undoCallback,
  callback,
  forceUpdate,
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

    let currentMillis = 0

    const intervalId = setInterval(() => {
      currentMillis += RERENDER_INTERVAL
      forceUpdate()
    }, RERENDER_INTERVAL)

    toast.custom(
      (t: Toast) => {
        return (
          <div className={t.visible ? "" : "toast-leave"}>
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
                  event.stopPropagation()
                  toast.dismiss(t.id)

                  if (timeoutId) {
                    clearTimeout(timeoutId)
                  }

                  if (intervalId) {
                    clearInterval(intervalId)
                  }

                  if (undoCallback) {
                    undoCallback()
                  }
                }}
              >
                Undo
              </button>
            </div>
          </div>
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
