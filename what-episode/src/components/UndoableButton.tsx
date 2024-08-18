import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"

interface ConfirmationButtonProps {
  callback: () => void
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  undoCallback?: () => void
  icon: IconDefinition
  timeout: number
  undoMessage: string
}

export function UndoableButton({
  callback,
  icon,
  timeout,
  undoMessage,
  onClick,
  undoCallback,
}: ConfirmationButtonProps) {
  const [clicked, setClicked] = useState(false)
  const [timer, setTimer] = useState<number | null>(null)
  const [currentMillis, setCurrentMillis] = useState(0)
  const [progressInterval, setProgressInterval] = useState<number | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (onClick) {
      onClick(event)
    }

    setClicked(true)
    setTimer(
      setTimeout(() => {
        callback()
        setClicked(false)
      }, timeout),
    )

    setProgressInterval(
      setInterval(() => {
        setCurrentMillis(currentMillis => currentMillis + 100)

        if (currentMillis >= timeout && progressInterval) {
          clearInterval(progressInterval)
        }
      }, 100),
    )
  }

  return (
    <>
      <button className="btn btn-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
      {clicked && (
        <div role="alert" className="alert alert-error alert-bottom">
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

              setCurrentMillis(0)

              if (timer) {
                clearTimeout(timer)
              }

              if (progressInterval) {
                clearInterval(progressInterval)
              }

              setClicked(false)

              if (undoCallback) {
                undoCallback()
              }
            }}
          >
            Undo
          </button>
        </div>
      )}
    </>
  )
}
