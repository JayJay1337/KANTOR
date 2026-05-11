import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/form.css";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        Imie: "",
        Nazwisko: "",
        Email: "",
        Haslo: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.Imie.trim()) newErrors.Imie = "Imię jest wymagane";
        if (!form.Nazwisko.trim()) newErrors.Nazwisko = "Nazwisko jest wymagane";
        if (!form.Email.trim()) newErrors.Email = "Email jest wymagany";
        else if (!emailRegex.test(form.Email)) newErrors.Email = "Niepoprawny format emaila";
        if (!form.Haslo.trim()) newErrors.Haslo = "Hasło jest wymagane";
        else if (form.Haslo.length < 6) newErrors.Haslo = "Hasło musi mieć minimum 6 znaków";

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
            const res = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) {
                setErrors({ api: data.message });
                return;
            }

            navigate("/");
        } catch (err) {
            setErrors({ api: err.message });
        }
    };

    return (
        <div className="form-container">
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imię</label>
                    <input type="text" name="Imie" value={form.Imie} onChange={handleChange} />
                    <p className="error">{errors.Imie}</p>
                </div>
                <div>
                    <label>Nazwisko</label>
                    <input type="text" name="Nazwisko" value={form.Nazwisko} onChange={handleChange} />
                    <p className="error">{errors.Nazwisko}</p>
                </div>
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
                    <button type="submit">Zarejestruj się</button>
                </div>
            </form>
        </div>
    );
}

export default Register;