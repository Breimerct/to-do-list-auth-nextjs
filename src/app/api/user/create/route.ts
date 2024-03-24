import { createUser } from "@/services/user.service";

export async function POST(request: Request) {
    try {
        const data = (await request.json()) as UserDto;
        const user = await createUser(data);

        return Response.json(user, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object
                ? error["message"] ?? "-"
                : "Error desconocido";
        const status = error instanceof Error || error instanceof Object ? 400 : 500;

        return Response.json({ message }, { status });
    }
}
