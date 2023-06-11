"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import Card from "../Card";

const Dashboard = () => {
    const [ loading, setLoading ] = useState<boolean>(true);

    const { profile } = useAuth();

    useEffect(() => {
        if(profile) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [profile])

    return (
        <div className="container mx-auto">
            { loading &&
                <Card>
                   <h3 className="font-bold text-3xl">Loading <span className="text-pink-400">Dashboard</span></h3> 
                </Card>
            }
            { !loading && 
                <>
                    {
                        profile &&
                        <h3 className="font-bold text-3xl">Welcome back <span className="text-pink-400">{ profile.firstName }</span></h3>
                    }
                    <div className="mt-2">
                        <Card>
                            <h3 className="font-bold text-2xl">My Groups</h3>
                        </Card>
                    </div>
                    <div className="mt-2">
                        <Card>
                            <h3 className="font-bold text-2xl">My Confirmed Shows</h3>
                        </Card>
                    </div>
                </>
            }
        </div>
    );
}

export default Dashboard;
