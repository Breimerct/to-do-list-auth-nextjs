import { changePassword } from "@/services/auth.service";
import { updateUser } from "@/services/user.service";

export async function PATCH(request: Request, response: { params: { userId: string } }) {
    try {
        const { userId: id } = response.params;
        const body = await request.json();

        const user = await updateUser(id, body);

        return Response.json(user, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function PUT(request: Request, response: { params: { userId: string } }) {
    try {
        const { userId } = response.params;
        const { oldPassword, newPassword } = await request.json();

        const user = await changePassword(oldPassword, newPassword, userId);

        const responseDto = {
            message: "Contraseña actualizada correctamente",
            user,
        };

        return Response.json(responseDto, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
