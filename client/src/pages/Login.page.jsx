import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/user.context';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("woow")
        setUser(data);
        navigate('/');
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;