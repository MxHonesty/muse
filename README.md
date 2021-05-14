# muse
***Small web app for sharing your favorite music.*** <br>
You can either create a recommendation for a song or you can view a random one. <br> <br>
<img src='https://cdn.discordapp.com/attachments/349217421082755075/842843914527965218/unknown.png' width=500> | <img src='https://cdn.discordapp.com/attachments/349217421082755075/842844227431956490/unknown.png' width=500>
----|----

## Intent
I created this small app with the intention of learning **Typescript** in a **React** context.

## Technologies

### Backend

The **backend** of the app has been build using **Django** and **Django Rest Framework**. **Spotipy** was used as a wrapper for the spotify API.
```python 
urlpatterns = [
    path('song/', views.ListTracks.as_view()),
    path('recs/', views.RecommandationApiView.as_view()),
    path('random/', views.RecommandationApiRandom.as_view()),
    path('track/', views.TrackAPI.as_view()), 
]
```
The `song/` and `track/` endpoints are used for interfacing with the spotify API. `song/` is used for finding tracks based on their name while `track/` is used for finding a track based on its id. 
The `rects/` endpoint is used for interacting with my Recommendations API. 
The `random/` endpoint is used for retrieving a random Recommendation.

#### The Recommendations API

Simple API for storing Recommendations

```python
class RecommandationApiView(APIView):
    
    def get(self, request, *args, **kwargs):
        """
        List all Recommandations updated in the past day.
        """
        saptamana_trecuta = timezone.now() - datetime.timedelta(days=1)

        recommands = Recommandation.objects.filter(updated__gte=saptamana_trecuta)
        serializer = RecommandationSerializer(recommands, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """ Created a Recommandation with the given data """
        data = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'trackId': request.data.get('trackId'),
            'updated': str(timezone.now())
        }
        serializer = RecommandationSerializer(data=data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```


### Frontend

The frontend has been built with Create React App, using React and Typescript.

`withTrackId` HOC used for injecting an ID propery into a `TrackDisplay` component. It also adds a `getId` property for passing a callback. 
This callback has that given id as an argument.

```TS
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
```

A `TrackDisplay` component is a component that recieves this as props

```TS
/** The props for the TrackDisplay. */
export interface TrackDisplayProps {
    /** Name of the song. */
    name: string;

    /** Name of the artist */
    artist: string;

    /** The url of the image. */
    image_url: string;
}
```

This a simple example of a stateless `TrackDisplay` component

```TS
export const TrackDisplay = ({name, artist, image_url}: TrackDisplayProps) => {
    return (
        <div>
            <img src={image_url} alt={name} />
            <span><h3>{name}</h3> by <h2>{artist}</h2></span>
        </div>
    )
}
```

Here is a more complete example of the HOC usage.



```TS
/** A Track Display that gets replaced by a spotify iframe when clicked. */
export class TrackDisplayWithPlayer extends Component<TrackDisplayProps & ExtraProps, TDWPState> {
    constructor(props: TrackDisplayProps & ExtraProps){
        super(props);
        this.state = {wasClicked: false};

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            wasClicked: true,
        });
    }

    componentDidUpdate(prevProps: TrackDisplayProps & ExtraProps) {
        if(prevProps.track_id !== this.props.track_id)
            this.setState({wasClicked: false});
    }

    render() {
        const TrackDisplayWithId = withTrackId<TrackDisplayProps & WithTrackIdProps>(TrackDisplayForList);
        const {track_id, ...other_props} = this.props;  // Spreading props
        return(
            <div>
                {!this.state.wasClicked ? <TrackDisplayWithId {...other_props} 
                track_id={''} getId={this.onClick}/> : <GenericPlayer id={track_id} type='track'/>}
            </div>
        );
    }

}
```


The design aspect of the app has been created using **material-ui**.

## Examples

Here are some images of the app.
![Main menu](https://cdn.discordapp.com/attachments/349217421082755075/842843698882543677/unknown.png)  | ![Recommendation Form](https://cdn.discordapp.com/attachments/349217421082755075/842843755375493140/unknown.png)
----|----
![Song selected](https://cdn.discordapp.com/attachments/349217421082755075/842844046123597864/unknown.png) | ![Recommendation made](https://cdn.discordapp.com/attachments/349217421082755075/842844090190397511/unknown.png) 
----|----
![Player](https://cdn.discordapp.com/attachments/349217421082755075/842844313364332554/unknown.png) | ![Older Recommendation](https://cdn.discordapp.com/attachments/349217421082755075/842844389079646258/unknown.png)
----|----
