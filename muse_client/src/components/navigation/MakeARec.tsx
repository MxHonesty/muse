import { Component } from 'react';
import { post_recommandation } from '../../service/APIService';
import { RecommandationForm } from '../RecommandationForm';
import { Button } from '@material-ui/core';


export interface MakeARecProps {
    /** Callback used when the user is finished with this submenu */
    onDone: () => void
}

export interface MakeARecState {
    /** The state of the Form */
    submitted: boolean
}

/** Component for the Recommandation Menu Subsection */
export class MakeARec extends Component<MakeARecProps, MakeARecState> {
    constructor(props: MakeARecProps) {
        super(props);

        this.state = {
            submitted: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.determineView = this.determineView.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    /** Called when form is submitted */
    onSubmit() {
        this.setState({
            submitted: true,
        });
    }

    /** Called when the user exists the submentu. */
    onFinish() {
        this.props.onDone();
    }

    determineView() {
        return !this.state.submitted ? <RecommandationForm call={(data) => {
            post_recommandation(data);
            this.onSubmit();  // Apart from just sending the data, we also
            // Notify the parent through a callback.
        }}/> : <div>
                <h3>Thank you for your Recommandation</h3>
                <Button variant='contained' color='primary' onClick={this.onFinish}> Back </Button>
            </div>
    }

    render() {
        return(
            <div>
                {this.determineView()}
            </div>
        );
    }
}
