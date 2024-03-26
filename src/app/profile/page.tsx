import Header from "@/components/header";
import UserInfo from "./components/user-info";
import EditEmail from "./components/edit-email";
import ChangePassword from "./components/change-password";

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
                        <ChangePassword />
                    </article>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;
