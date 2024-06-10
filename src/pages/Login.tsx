import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const { loginUser }: any = useContext(AuthContext);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        console.log('check', username, password)

        await loginUser(username, password);
        // Handle login success or failure
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" name='username' placeholder='Enter Username' />
                <input type="password" name='password' placeholder='Enter Password' />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;
