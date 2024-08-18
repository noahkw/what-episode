import { useState } from "react"

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const storedValue = localStorage.getItem(key)
  const [value, setValue] = useState(
    storedValue ? JSON.parse(storedValue) : defaultValue,
  )

  const updateValue = (value: T): void => {
    setValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [value, updateValue]
}
