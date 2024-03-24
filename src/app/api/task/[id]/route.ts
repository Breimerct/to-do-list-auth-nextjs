import { deleteTask, updateTask } from "@/services/task.service";

export async function DELETE(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const task = await deleteTask(id);

        const messageResponse = {
            message: `Task with id ${id} deleted`,
        };

        return Response.json(messageResponse, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object
                ? error["message"] ?? "-"
                : "Error desconocido";
        const status = error instanceof Error || error instanceof Object ? 400 : 500;

        return Response.json({ message }, { status });
    }
}

export async function PATCH(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const updateTaskObj = (await request.json()) as TaskDto;
        const task = await updateTask(id, updateTaskObj);

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
