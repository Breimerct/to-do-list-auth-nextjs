import RegisterForm from "@/components/register-form";

const Register = () => {
    return (
        <div className="p-4 shadow-md w-full max-w-[30rem]">
            <h2 className="text-center font-bold text-3xl mb-4">Registro</h2>
            <RegisterForm />
        </div>
    );
};

export default Register;
