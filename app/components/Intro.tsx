const Intro = () => {
    return (
        <div className="mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
                Your Ultimate Group Companion for the Edinburgh Fringe!
            </h1>
            <div className="flex flex-row">
                <div className="rounded bg-slate-800 p-3">
                    <h2 className="text-xl">Find Common Interests</h2>
                    <p>Lorem ismfkjasklfjlksajklfjl</p>
                </div>
                <div className="rounded bg-slate-800 p-3">
                    <h2 className="text-xl">Find Common Interests</h2>
                </div>
                <div className="rounded bg-slate-800 p-3">
                    <h2 className="text-xl">Find Common Interests</h2>
                </div>
            </div>
            <div className="flex justify-items-center">
                <button className="bg-pink-400 text-white p-2 rounded text-xl">Get Started</button>
            </div>
        </div>
    );
}

export default Intro;