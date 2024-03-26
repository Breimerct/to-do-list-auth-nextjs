import { TaskDto } from "@/dto/task.dto";
import { createTask, getTasks } from "@/services/task.service";

export async function GET() {
    try {
        const tasks = await getTasks();
        return Response.json(tasks, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object
                ? error["message"] ?? "-"
                : "Error desconocido";
        const status = error instanceof Error || error instanceof Object ? 400 : 500;

        return Response.json({ message }, { status });
    }
}

export async function POST(request: Request) {
    try {
        const newTask = (await request.json()) as TaskDto;
        const task = await createTask(newTask);
        return Response.json(task, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object
                ? error["message"] ?? "-"
                : "Error desconocido";
        const status = error instanceof Error || error instanceof Object ? 400 : 500;

        return Response.json({ message }, { status });
    }
}
