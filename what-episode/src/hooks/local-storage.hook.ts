import {useState} from "react";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const storedValue = localStorage.getItem(key)
    console.log('currentValue', storedValue)
    const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : defaultValue)

    const updateValue = (value: T): void => {
        setValue(value)
        localStorage.setItem(key, JSON.stringify(value))
    }

    return [value, updateValue]
}

export function useArrayIdStorage<T>(value: T[], setValue: (value: T[]) => void, elementId: number, getId: (el: T) => number, defaultValue: T): [T, (element: T) => void] {
    const element = value.find(el => getId(el) === elementId) ?? defaultValue

    const updateElement = (element: T) => {
        console.log('current state ' + JSON.stringify(value))
        console.log('searching for id ' + elementId)

        if (value.find(el => getId(el) === elementId)) {
            console.log('found series ' + elementId)
            setValue(value.map(el => {
                return getId(el) === elementId ? element : el
            }))
        } else {
            console.log('adding new')
            setValue([...value, element])
        }
    }

    return [element, updateElement]
}
