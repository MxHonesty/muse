import { Component } from 'react';
import { Button, ButtonGroup, ButtonProps, Paper } from '@material-ui/core';
import { MakeARec } from './MakeARec';
import { GetARec } from './GetARec';


export interface MainMenuProps {}

/** The state of the Main Menu */
export interface MainMenuState {
    /** True if the current button clicked is the MAKE button. */
    make_button: boolean,

    /** True if the current button clicked is the GET button. */
    get_button: boolean,
}

/** Button used for wrapping the primary color around a boolean value. */
export const ToggleButton = (props: ButtonProps & {primary: boolean, text: string}) => {
    const {primary, text, ...other_props} = props;

    return(
        primary ? <Button {...other_props} color='primary'>{text}</Button> : <Button {...other_props}>{text}</Button>
    );
}

export class MainMenu extends Component<MainMenuProps, MainMenuState> {
    constructor(props: MainMenuProps) {
        super(props);
        this.state = {
            make_button: false,
            get_button: false,
        };

        this.onGetClick = this.onGetClick.bind(this);
        this.onMakeClick = this.onMakeClick.bind(this);
        this.reset = this.reset.bind(this);
        this.getView = this.getView.bind(this);
    }

    /** Get Button Click Handler */
    onGetClick() {
        this.setState({
            make_button: false,
            get_button: true,
        });
    }

    /** Make Button Click Handler */
    onMakeClick() {
        this.setState({
            make_button: true,
            get_button: false,
        });
    }

    /** Resets state to default value. */
    reset() {
        this.setState({
            make_button: false,
            get_button: false,
        });
    }

    getView() {
        const make = this.state.make_button;
        const get = this.state.get_button;
        if (make && !get) 
            return(<div style={{marginTop:'1.5em'}}><MakeARec onDone={() => {this.reset()}} /></div>);
        else if (!make && get)  // If get button Clicked
            return(<div style={{marginTop:'1.5em'}}><GetARec /></div>);
        else 
            return(<div></div>)
    }
    
    render() {
        return(
            <Paper elevation={3} style={{padding: '2em', display:'flex', flexDirection: "column", justifyContent: 'center'}}>
                <ButtonGroup style={{display: 'block'}}>
                    <ToggleButton primary={this.state.make_button} text={'Make a Recommendation'} onClick={this.onMakeClick}/>
                    <ToggleButton primary={this.state.get_button} text={'Get a Recommendation'} onClick={this.onGetClick}/>
                </ButtonGroup>
                {this.getView()}
            </Paper>
        )
    }
}
