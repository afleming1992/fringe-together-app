import apollo from '@/lib/apollo/client';
import { Group } from '@prisma/client';

async function getGroups() {
    const { data: { groups } } = await apollo.query({
        query: getGroups
    })
    
    return groups;
}

const Groups = async () => {
    

    return (
        <>
            {
                groups.map((group : Group) => {
                    <h1>{group.name}</h1>
                })
            }
        </>
    )
}

export default Groups;