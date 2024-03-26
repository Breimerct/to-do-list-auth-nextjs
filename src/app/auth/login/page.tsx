import LoginForm from "@/components/login-form";

const Login = () => {
    return (
        <div className="p-4 shadow-2xl w-full max-w-[30rem]">
            <h2 className="text-center font-bold text-3xl mb-4">Inicio de sesión</h2>
            <LoginForm />
        </div>
    );
};

export default Login;
