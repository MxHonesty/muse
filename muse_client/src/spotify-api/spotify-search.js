import { SpotifyWebApi } from 'spotify-web-api-node';

const authorizationCode = ''

const spotifyApi = new SpotifyWebApi({
    clientId: '4453d7ed53d748069267703e16a41e5c',
    clientSecret: 'PLACEHOLDER',
    redirectUri: '/',
});

spotifyApi.authorizationCodeGrant(authorizationCode)
.then((data) => {
    console.log('Retrieved acces token', data.body['access_token']);

    spotifyApi.setAccessToken(data.body['access_token']);
})
.then((data) => {
    console.log('Got ' + data.body.tracks.total + ' results!');
    
    var firstPage = data.body.tracks.items;
    console.log('The tracks in the first page: ');

    firstPage.forEach((track, index) => {
        console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
    });
}).catch((err) => {
    console.log('Something went wrong: ', err.message);
});