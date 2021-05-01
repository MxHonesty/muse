/** This module implements a Higher Order Component
 * for storing the TrackId along with a Component that can be
 * accessed within a callback by clicking the component.
 */
import React from 'react';

/** Extra props that will be added to the HoC. */
export interface WithTrackIdProps {
    track_id: string,
    getId: (id: string) => void,
}

/** Hoc Function for adding TrackId and callback for
 * onClick in regards to the TrackId stored.
 * 
 *  **Return:** 
 *      A component that requires a track_id string and a 
 *      getId callback with a string parameter. This callback is used to
 *      operate on the stored track_id value.
 * 
 * **Boilerplate**:
 *      `This is also intented as a boilerplate for future HOC.`
 *      In this case, we use a type that extends WithTrackId
 *      With this, we ensure that the new props that we need
 *      in order to extend the functionality are present.
 *      The rest of the props that are passed are the props needed for 
 *      the base component.
 *      **The argument** of this function is a stateless component.
 *      With the props in T that are not in WithTrackIdProps.
 */
export function withTrackId<T extends WithTrackIdProps>(Component: React.ComponentType<Omit<T, keyof WithTrackIdProps>>) {
    return class extends React.Component<T> {

        constructor(props: T & WithTrackIdProps) {
            super(props);

            this.handleClick = this.handleClick.bind(this);
        }

        // Calls the callback.
        handleClick() {
            this.props.getId(this.props.track_id);
        }

        render() {
            // Separate the component props from the new Hoc props.
            const {track_id, getId, ...props} = this.props;

            return ( 
                <div onClick={this.handleClick}>
                    <Component {...props as T} />
                </div>
            );
        }
    }
}
