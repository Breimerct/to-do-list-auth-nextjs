import { createUser } from "@/services/user.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const user = await createUser(body);

        return Response.json(user, { status: 201 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
