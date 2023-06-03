const NavBar = () => {
    return  (
        <nav className="mx-auto p-6 flex items-center justify-between">
            <div className='flex items-center justify-between'>
                <div>
                    <a className="font-bold text-2xl" href="">FringeTogether</a>
                </div>
            </div>

            <div className="flex lg:hidden">

            </div>
            
            <div>
                <div className="flex">
                    <button className="bg-pink-400 text-white p-2 rounded mr-3">Login</button>
                    <button className="bg-white text-black p-2 rounded">Signup</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;