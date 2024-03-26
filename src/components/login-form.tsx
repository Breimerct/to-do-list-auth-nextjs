"use client";

import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import * as Yup from "yup";
import Input from "./input";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const { login } = useAuthStore();
    const router = useRouter();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Dirección de Email invalida.")
            .required("El campo es requerido."),
        password: Yup.string()
            .min(8, "Minimo debe tener 8 caracteres o más.")
            .required("El campo es requerido."),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const success = await login(values.email, values.password);

            if (success) {
                resetForm();
                router.push("/");
                return;
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
            <div>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Ingrese su email"
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    messageError={formik.errors.email}
                    {...formik.getFieldProps("email")}
                />
            </div>

            <div>
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    messageError={formik.errors.password}
                    {...formik.getFieldProps("password")}
                />
            </div>

            <button className="btn-primary-outline" type="submit">
                Iniciar sesión
            </button>

            <div className="flex justify-center items-center">
                ¿No tienes una cuenta?
                <Link
                    href="./register"
                    className="text-blue-500 font-medium underline pl-1"
                >
                    Registrate
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
