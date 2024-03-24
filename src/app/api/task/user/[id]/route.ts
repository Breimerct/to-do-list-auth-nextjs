import { getTasksByUserId } from "@/services/task.service";

export async function GET(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const tasks = await getTasksByUserId(id);

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
