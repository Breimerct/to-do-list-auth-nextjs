import Input from "./input";
import TextArea from "./text-area";

const TaskForm = () => {
    return (
        <form className="flex flex-col gap-2">
            <div>
                <Input label="Titulo" type="text" placeholder="Ingrese un titulo" />
            </div>

            <div>
                <TextArea label="Descripción" placeholder="Ingrese una descripción" />
            </div>

            <button className="btn-primary" type="submit">
                Guardar
            </button>
        </form>
    );
};

export default TaskForm;
