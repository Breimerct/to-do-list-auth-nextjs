"use client";
import { EditIcon } from "@/components/icons";
import Input from "@/components/input";
import { useUserStore } from "@/store/user.store";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const ChangePassword = () => {
    const [isEdit, setIsEdit] = useState(false);
    const { updateProfile } = useUserStore();

    const validateSchema = Yup.object().shape({
        currentPassword: Yup.string().required("Contraseña actual es requerida"),
        newPassword: Yup.string().required("Contraseña nueva es requerida"),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
            .required("Confirmar contraseña nueva es requerida"),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleEdit = () => {
        setIsEdit(true);
    };

    const cancelEdit = () => {
        formik.resetForm();
        setIsEdit(false);
    };

    return (
        <div className="w-full">
            <div className="flex justify-end">
                <button
                    className="btn-primary-icon"
                    onClick={handleEdit}
                    disabled={isEdit}
                >
                    <EditIcon size={24} />
                </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <div>
                    <Input
                        label="Contraseña actual"
                        placeholder="Ingrese contraseña actual"
                        readOnly={!isEdit}
                        isInvalid={
                            formik.touched.currentPassword &&
                            !!formik.errors.currentPassword
                        }
                        messageError={formik.errors.currentPassword}
                        {...formik.getFieldProps("currentPassword")}
                    />
                </div>

                <div>
                    <Input
                        label="Contraseña nueva"
                        placeholder="Ingrese contraseña nueva"
                        readOnly={!isEdit}
                        isInvalid={
                            formik.touched.newPassword && !!formik.errors.newPassword
                        }
                        messageError={formik.errors.newPassword}
                        {...formik.getFieldProps("newPassword")}
                    />
                </div>

                <div>
                    <Input
                        label="Confirmar contraseña nueva"
                        placeholder="Confime contraseña nueva"
                        readOnly={!isEdit}
                        isInvalid={
                            formik.touched.confirmNewPassword &&
                            !!formik.errors.confirmNewPassword
                        }
                        messageError={formik.errors.confirmNewPassword}
                        {...formik.getFieldProps("confirmNewPassword")}
                    />
                </div>

                {isEdit && (
                    <div className="flex justify-end gap-4">
                        <button className="btn-primary" type="submit">
                            guardar
                        </button>

                        <button className="btn-danger" type="button" onClick={cancelEdit}>
                            cancelar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ChangePassword;
