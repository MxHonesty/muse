import React from 'react';

interface WithTrackIdProps {
    track_id: string,
    getId: (id: string) => void,
}

export function withTrackId<P, T extends WithTrackIdProps>(Component: React.ComponentType<T>) {
    return class extends React.Component<T & WithTrackIdProps> {

        constructor(props: T & P) {
            super(props);

            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.props.getId(this.props.track_id);
        }

        render() {
            return ( 
                <div onClick={this.handleClick}>
                    <Component {...this.props as T} />
                </div>
            );
        }
    }
}