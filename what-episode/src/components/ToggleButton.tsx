import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

interface ToggleButtonProps {
  toggled: boolean
  setToggled?: (toggled: boolean) => void
}

export function ToggleButton({ toggled, setToggled }: ToggleButtonProps) {
  const toggleButton = () => {
    if (setToggled) {
      setToggled(!toggled)
    }
  }

  return (
    <button className="btn btn-icon" onClick={toggleButton}>
      {toggled ? (
        <FontAwesomeIcon icon={faChevronDown} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} />
      )}
    </button>
  )
}
