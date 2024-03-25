interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <main className="min-h-screen w-full flex justify-center items-center">
            {children}
        </main>
    );
};

export default AuthLayout;
