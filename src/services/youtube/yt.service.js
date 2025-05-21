export function makeYtQueryFromTrack(track) {
    const trackName = track.name
    const trackArtist = track.artists[0].name
    const query = `${trackName} by ${trackArtist}`
    return query
}