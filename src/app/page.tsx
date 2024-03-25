import Header from "@/components/header";
import TaskList from "@/components/task-list";

export default async function Home() {
    return (
        <main className="min-h-screen min-w-max">
            <Header />
            <TaskList />
        </main>
    );
}
