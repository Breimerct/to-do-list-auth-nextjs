"use client";
import { EditIcon } from "@/components/icons";
import Input from "@/components/input";
import { useUserStore } from "@/store/user.store";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { UserDto } from "@/dto/user.dto";

const UserInfo = () => {
    const { user, updateProfile } = useUserStore();
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(true);
    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    const initialValues = {
        name: user?.name,
        lastname: user?.lastname,
    };

    const validateSchema = Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        lastname: Yup.string().required("El apellido es requerido"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: validateSchema,
        onSubmit: (values) => {
            if (user) {
                updateProfile({ ...user, ...values } as UserDto);
                setIsEdit(false);
            }
        },
    });

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <picture className="rounded-full w-24 h-24 flex items-center justify-center">
                <img
                    src={user?.avatar}
                    alt={user?.fullName}
                    className="rounded-full w-24 h-24"
                />
            </picture>

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
                            label="Nombre"
                            type="text"
                            isInvalid={formik.touched.name && !!formik.errors.name}
                            messageError={formik.errors.name}
                            {...formik.getFieldProps("name")}
                            readOnly={!isEdit}
                        />
                    </div>

                    <div>
                        <Input
                            label="Apellido"
                            type="text"
                            isInvalid={
                                formik.touched.lastname && !!formik.errors.lastname
                            }
                            messageError={formik.errors.lastname}
                            {...formik.getFieldProps("lastname")}
                            readOnly={!isEdit}
                        />
                    </div>

                    {isEdit && (
                        <div className="flex justify-end gap-4">
                            <button className="btn-primary" type="submit">
                                guardar
                            </button>

                            <button
                                className="btn-danger"
                                type="button"
                                onClick={cancelEdit}
                            >
                                cancelar
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserInfo;
