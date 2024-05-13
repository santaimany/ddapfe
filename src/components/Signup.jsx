import React, { useState } from 'react';

function Signup() {
    const [inputs, setInputs] = useState({
        namalengkap: '',
        no_hp: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        alamat: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3306/ddapkelompok4/user/register.php', { // Adjust the URL to your PHP script
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(inputs)
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input name="namalengkap" value={inputs.namalengkap} onChange={handleChange} placeholder="Full Name" />
                <input name="no_hp" value={inputs.no_hp} onChange={handleChange} placeholder="Phone Number" />
                <input name="provinsi" value={inputs.provinsi} onChange={handleChange} placeholder="Province" />
                <input name="kabupaten" value={inputs.kabupaten} onChange={handleChange} placeholder="City" />
                <input name="kecamatan" value={inputs.kecamatan} onChange={handleChange} placeholder="District" />
                <input name="kelurahan" value={inputs.kelurahan} onChange={handleChange} placeholder="Subdistrict" />
                <input name="alamat" value={inputs.alamat} onChange={handleChange} placeholder="Address" />
                <input type="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={inputs.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Signup;
