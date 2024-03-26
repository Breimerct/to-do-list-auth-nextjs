import Header from "@/components/header";
import UserInfo from "./components/user-info";
import EditEmail from "./components/edit-email";

const ProfilePage = () => {
    return (
        <div>
            <Header />

            <main className="container mx-auto p-4">
                <section className="flex flex-col md:flex-row gap-4">
                    <article className="flex-1 p-4 shadow-md flex flex-col gap-4">
                        <UserInfo />
                        <EditEmail />
                    </article>

                    <article className="flex-1 p-4 shadow-md">
                        <picture className="rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center">
                            <div className="animate-pulse bg-gray-400 rounded-full w-20 h-20"></div>
                        </picture>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;
