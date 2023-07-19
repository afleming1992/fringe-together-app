import apollo from '@/lib/apollo/client';
import { gql } from '@apollo/client';
import { Show } from './types';

export const getShowQuery = gql`
    query getShow($uri: String!) {
        show(uri:$uri){
            id,
            uri,
            title,
            location,
            duration,
            description,
            availableShows,
            showRun,
            imageUri
        }
    }
`

export const getShow = async (uri: string) : Promise<Show> => {
    // Strip Query Parameters out so it's a valid URI
    const strippedUri = uri.split('?')[0];

    const { data } = await apollo.query({
        query: getShowQuery,
        variables: {
            uri: strippedUri
        }
    })

    return data.show;
}