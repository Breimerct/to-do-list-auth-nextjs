"use client";
import { useFormik } from "formik";
import Input from "./input";
import TextArea from "./text-area";
import * as Yup from "yup";
import { useTaskStore } from "@/store/task.store";
import { UserDto } from "@/dto/user.dto";
import { useUserStore } from "@/store/user.store";
import { useEffect, useState } from "react";

const TaskForm = () => {
    const { createTask, updateTask, taskSelected, setTaskSelected } = useTaskStore();
    const { user } = useUserStore();
    const [isEdit, setIsEdit] = useState(false);

    const initialValues = {
        title: "",
        description: "",
        completed: false,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("El campo es requerido."),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const newTask = {
                ...values,
                userId: (user as UserDto)._id,
            };

            if (isEdit && taskSelected?._id) {
                updateTask(taskSelected._id, { ...taskSelected, ...newTask });
            } else {
                createTask(newTask);
            }

            resetForm();
        },
    });

    useEffect(() => {
        if (taskSelected) {
            formik.setValues({
                title: taskSelected.title,
                description: taskSelected.description,
                completed: taskSelected.completed,
            });
            setIsEdit(true);
        } else {
            formik.setValues(initialValues);
            setIsEdit(false);
        }
    }, [taskSelected]);

    const cancelEdit = () => {
        formik.setValues(initialValues);
        setTaskSelected(null);
        setIsEdit(false);
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
            <div>
                <Input
                    label="Titulo"
                    type="text"
                    placeholder="Ingrese un titulo"
                    isInvalid={formik.touched.title && !!formik.errors.title}
                    messageError={formik.errors.title}
                    {...formik.getFieldProps("title")}
                />
            </div>

            <div>
                <TextArea
                    label="Descripción"
                    placeholder="Ingrese una descripción"
                    {...formik.getFieldProps("description")}
                />
            </div>

            <div>
                {isEdit && (
                    <>
                        <input
                            type="checkbox"
                            id="completed"
                            name="completed"
                            checked={formik.values.completed}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="completed" className="ml-2">
                            Completado
                        </label>
                    </>
                )}
            </div>

            <div className="flex gap-2">
                <button className="btn-primary w-full" type="submit">
                    Guardar
                </button>

                {isEdit && (
                    <button
                        className="btn-danger w-full"
                        type="button"
                        onClick={cancelEdit}
                    >
                        cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
