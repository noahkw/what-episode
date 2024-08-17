interface ToggleButtonProps {
    toggled: boolean
    setToggled: (toggled: boolean) => void
}

export function ToggleButton({toggled, setToggled}: ToggleButtonProps) {
    const toggleButton = () => {
        setToggled(!toggled)
    }

    return (
        <button className="toggle-button" onClick={toggleButton}> {toggled ? 'v' : '>'} </button>
    )
}
