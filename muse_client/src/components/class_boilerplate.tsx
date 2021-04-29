/**
 * Example module created as a stateful class example
 * for using typescript with react.
 */

import { Component } from 'react';

/**
 * State type of the class.
 */
interface TestState {

}

/**
 * Prop type of the class.
 */
interface TestProps {

}

/**
 * This class exists as a boilerplate for future stateful typescript classes.
 */
export class TestClass extends Component<TestProps, TestState> {
    // Declaram state
    constructor(props: TestProps) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        return(
            <div>
                <h3> This is an example </h3>
            </div>
        );
    } 

}
