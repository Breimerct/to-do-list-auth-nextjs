import Header from "@/components/header";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";

export default async function Home() {
    return (
        <main className="min-h-screen min-w-max">
            <Header />

            <section className="container mx-auto p-4">
                <article className="flex gap-4 flex-col lg:flex-row">
                    <div className="flex-1">
                        <TaskForm />
                    </div>

                    <div className="flex-1">
                        <TaskList />
                    </div>
                </article>
            </section>
        </main>
    );
}
