import React, { useState } from 'react';

function Signup() {
    const [formData, setFormData] = useState({
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
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://yourdomain.com/path/to/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        });

        const result = await response.json();
        console.log(result.message);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="namalengkap" onChange={handleChange} />
                {/* Other fields */}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
