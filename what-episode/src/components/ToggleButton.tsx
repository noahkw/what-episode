import React, {Dispatch, MouseEventHandler, ReactNode, SetStateAction} from "react";

interface ToggleButtonProps {
    initialState: boolean;
    setToggled: (toggled: boolean) => void;
}

interface ToggleButtonState {
    toggled: boolean;
}

export class ToggleButton extends React.Component<ToggleButtonProps, ToggleButtonState> {
    constructor(props: ToggleButtonProps) {
        super(props);
        this.state = {toggled: props.initialState};

        this.onClick = this.onClick.bind(this);
    }

    render(): ReactNode {
        console.log(this.state.toggled)
        return (
            <button className="toggle-button" onClick={this.onClick}> {this.state.toggled ? 'v' : '>'} </button>
        )
    }

    private onClick(): void {
        this.props.setToggled(!this.state.toggled)
        this.setState({
            toggled: !this.state.toggled,
        })
    }
}