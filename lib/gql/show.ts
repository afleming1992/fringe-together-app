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
            availableShows
        }
    }
`

export const getShow = async (uri: string) : Promise<Show> => {
    const { data } = await apollo.query({
        query: getShowQuery,
        variables: {
            uri
        }
    })

    return data.show;
}