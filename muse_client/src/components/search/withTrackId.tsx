import React from 'react';

export interface WithTrackIdProps {
    track_id: string,
    getId: (id: string) => void,
}

export function withTrackId<T extends WithTrackIdProps>(Component: React.ComponentType<Omit<T, keyof WithTrackIdProps>>) {
    return class extends React.Component<T> {

        constructor(props: T & WithTrackIdProps) {
            super(props);

            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.props.getId(this.props.track_id);
        }

        render() {
            const {track_id, getId, ...props} = this.props;

            return ( 
                <div onClick={this.handleClick}>
                    <Component {...props as T} />
                </div>
            );
        }
    }
}
