import React, { useState } from 'react';

const RegisterPage = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        age: "",
        gender: "",
        incomelevel: "",
        country: "",
        state: "",
        city: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"50%", gap:"2rem", margin:"auto"}}>
                <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="username" value={data.password} onChange={handleChange} placeholder="Username" />
                <input type="number" name="age" value={data.age} onChange={handleChange} placeholder="Age" />
                <input type="text" name="gender" value={data.gender} onChange={handleChange} placeholder="Gender" />
                <input type="text" name="incomelevel" value={data.incomelevel} onChange={handleChange} placeholder="Income Level" />
                <input type="text" name="country" value={data.country} onChange={handleChange} placeholder="Country" />
                <input type="text" name="state" value={data.state} onChange={handleChange} placeholder="State" />
                <input type="text" name="city" value={data.city} onChange={handleChange} placeholder="City" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;