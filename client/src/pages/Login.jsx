import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/form.css";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        Email: "",
        Haslo: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.Email.trim()) newErrors.Email = "Email jest wymagany";
        if (!form.Haslo.trim()) newErrors.Haslo = "Hasło jest wymagane";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        try {
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) {
                setErrors({ api: data.message });
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/users");
        } catch (err) {
            setErrors({ api: err.message });
        }
    };

    return (
        <div className="form-container">
            <h1>Logowanie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" name="Email" value={form.Email} onChange={handleChange} />
                    <p className="error">{errors.Email}</p>
                </div>

                <div>
                    <label>Hasło</label>
                    <input type="password" name="Haslo" value={form.Haslo} onChange={handleChange} />
                    <p className="error">{errors.Haslo}</p>
                </div>

                <p className="error">{errors.api}</p>

                <div>
                    <button type="submit">Zaloguj się</button>
                </div>
            </form>
        </div>
    );
}

export default Login;