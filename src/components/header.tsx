import UserLogged from "./user-logged";

const Header = () => {
    return (
        <header className="w-full p-4 flex justify-between items-center shadow-md mb-4">
            <h1 className="text-2xl font-bold">To Do List</h1>

            <UserLogged />
        </header>
    );
};

export default Header;
