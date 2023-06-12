"use client";

import { Group, getGroups } from '@/lib/gql/group';
import { useEffect, useState } from 'react';

const Groups = () => {
    const [ groups, setGroups ] = useState<Group[] | null>();

    useEffect(() => {
        const getData = async () => {
            const groups = await getGroups();
            setGroups(groups);
        }
        getData();
    }, [])

    return (
        <>
            {
                groups &&
                <>
                    {
                        groups.map((group : Group) => (
                            <h1 key={group.id}>{group.name}</h1>
                        ))
                    }
                </>
                
            }
            
        </>
    )
}

export default Groups;