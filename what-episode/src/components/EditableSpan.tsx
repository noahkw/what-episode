import { useState, KeyboardEvent, ChangeEvent } from "react"

interface EditableSpanProps<T> {
  initialValue: T
  onValueChange?: (value: T) => void
  parseValue: (value: string) => T
}

export function EditableSpan<T extends { toString: () => string }>({
  initialValue,
  onValueChange,
  parseValue,
}: EditableSpanProps<T>) {
  const [value, setValue] = useState<string>(initialValue.toString())
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleClick = (): void => {
    setIsEditing(true)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      setIsEditing(false)
      if (onValueChange) {
        onValueChange(parseValue(event.currentTarget.value))
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  return isEditing ? (
    <input
      className="outline-none bg-0 px-1 w-8 border-0 border-b-1"
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        setIsEditing(false)
      }}
      autoFocus
    />
  ) : (
    <span onClick={handleClick}>{initialValue.toString()}</span>
  )
}
