"use client";

import { EditIcon } from "@/components/icons";
import Input from "@/components/input";
import { UserDto } from "@/dto/user.dto";
import { useUserStore } from "@/store/user.store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const EditEmail = () => {
    const [isEdit, setIsEdit] = useState(false);
    const { user, updateProfile } = useUserStore();

    const validateSchema = Yup.object({
        email: Yup.string().email("Email invalido").required("El email es requerido"),
    });

    const initialValues = {
        email: user?.email,
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            if (user) {
                const success = await updateProfile({ ...user, ...values } as UserDto);

                if (success) {
                    setIsEdit(false);
                }
            }
        },
    });

    useEffect(() => {
        formik.setValues({
            email: user?.email,
        });
    }, [user]);

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
                        label="Email"
                        type="email"
                        placeholder="Ingrese un email"
                        isInvalid={!!formik.errors.email && formik.touched.email}
                        messageError={formik.errors.email}
                        {...formik.getFieldProps("email")}
                        readOnly={!isEdit}
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

export default EditEmail;
