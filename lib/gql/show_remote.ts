import { getClient as getShowClient } from '@/lib/show_api';
import { gql } from '@apollo/client';
import { Show } from './types';

const TIMES_VARY_TEXT = `Times vary. Click 'Dates, times and prices' to view the calendar`;

export interface ShowRemote {
    availability: AvailabilityRemote,
    date: string,
    description: string,
    duration: string,
    id: string,
    location: string,
    time: string,
    title: string,
    uri: string,
    imgUri?: string
}

interface AvailabilityRemote {
    id: string,
    availableDates: string[]
}

const getShowQuery = gql`
    query show($uri: URL!) {
        show(uri:$uri) {
            id
            uri
            title
            location
            date
            duration
            time,
            description,
            availability {
                id,
                availableDates
            },
            imgUri
        }
    }
`

export const getShow = async (uri: string) : Promise<Show> => {
    const client = getShowClient();

    const { data, error } = await client.query({
        query: getShowQuery,
        variables: {
            uri: uri
        }
    });

    if(error) {
        throw new Error(error.message);
    }

    return toShow(data.show);
}

const toShow = (remote: ShowRemote) : Show => {
    return {
        id: remote.id,
        uri: remote.uri,
        title: remote.title,
        location: remote.location,
        duration: remote.duration,
        description: remote.description,
        showRun: remote.date,
        imageUri: remote.imgUri,
        availableShows: getAvailableShows(remote.availability, remote.time)
    }
}

const getAvailableShows = (availability: AvailabilityRemote, time: string) : string[] => {
    const availableShows: string[] = [];

    const timeSplit = time.split(":");

    for(const dateString of availability.availableDates) {
        const date = new Date(dateString);
        //date.setUTCHours(parseInt(timeSplit[0]), parseInt(timeSplit[1]));
        availableShows.push(date.toISOString());
    }

    return availableShows
}