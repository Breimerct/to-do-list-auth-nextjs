"use client";
import Link from "next/link";
import * as Yup from "yup";
import Input from "./input";
import { useFormik } from "formik";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { UserDto } from "@/dto/user.dto";

const RegisterForm = () => {
    const { register } = useAuthStore();
    const router = useRouter();

    const initialValues = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("El campo es requerido."),
        lastname: Yup.string().required("El campo es requerido."),
        email: Yup.string()
            .email("Dirección de Email invalida.")
            .required("El campo es requerido."),
        password: Yup.string()
            .min(8, "Minimo debe tener 8 caracteres o más.")
            .required("El campo es requerido."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
            .required("El campo es requerido."),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const { confirmPassword, ...restObj } = values;
            const success = await register(restObj as UserDto);

            if (success) {
                resetForm();
                router.push("/");
                return;
            }
        },
    });

    return (
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div>
                <Input
                    label="Nombre"
                    type="text"
                    placeholder="Nombre"
                    isInvalid={formik.touched.name && !!formik.errors.name}
                    messageError={formik.errors.name}
                    {...formik.getFieldProps("name")}
                />
            </div>

            <div>
                <Input
                    label="Apellido"
                    type="text"
                    placeholder="Apellido"
                    isInvalid={formik.touched.lastname && !!formik.errors.lastname}
                    messageError={formik.errors.lastname}
                    {...formik.getFieldProps("lastname")}
                />
            </div>

            <div>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    messageError={formik.errors.email}
                    {...formik.getFieldProps("email")}
                />
            </div>

            <div>
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    messageError={formik.errors.password}
                    {...formik.getFieldProps("password")}
                />
            </div>

            <div>
                <Input
                    label="Confirmar contraseña"
                    type="password"
                    placeholder="Confirmar contraseña"
                    isInvalid={
                        formik.touched.confirmPassword && !!formik.errors.confirmPassword
                    }
                    messageError={formik.errors.confirmPassword}
                    {...formik.getFieldProps("confirmPassword")}
                />
            </div>

            <button className="btn-primary-outline" type="submit">
                Register
            </button>

            <div className="flex justify-center items-center col-span-2 mt-2">
                ¿Ya tienes una cuenta?
                <Link href="./login" className="text-blue-500 font-medium underline pl-1">
                    Inicia sesión
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
