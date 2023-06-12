"use client";

import { useAuth } from "../AuthProvider";
import Card from "../Card";
import Groups from "./Groups";

const Dashboard = () => {
    const { profile } = useAuth();

    return (
        <div className="container mx-auto">
            <>
                {
                    profile &&
                    <div className="p-3">
                        <h3 className="font-bold text-3xl">Welcome back <span className="text-pink-400">{ profile.firstName }</span></h3>
                    </div>
                }
                <div className="mt-2 w-full p-3">
                    <Card>
                        <h3 className="font-bold text-2xl">My Next Shows</h3>
                        
                    </Card>
                </div>
                <div className="mt-2 w-full p-3">
                    <Card>
                        <h3 className="font-bold text-2xl">My Groups</h3>
                        <Groups />
                    </Card>
                </div>
            </>
        </div>
    );
}

export default Dashboard;
