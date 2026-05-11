import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../components/form.css"
function UserForm(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        Imie: "",
        Nazwisko: "",
        Email: "",
        Haslo: ""
    });
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const newErrors = {};


        if(!form.Imie.trim()) newErrors.Imie= "Imie jest wymagane"

        if(!form.Nazwisko.trim()) newErrors.Nazwisko= "Nazwisko jest wymagane"

        if(!form.Email.trim()) newErrors.Email = "Email jest wymagany"
        else if(!emailRegex.test(form.Email)) newErrors.Email = "Email ma niepoprawny format"

        return newErrors
    }
    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };
    const handleCancel = () => {
        navigate("/users")
    }
    const handleForm = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try{
        const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
                body: JSON.stringify(form)
            });
        const data = await res.json();

        if(!res.ok){
            setErrors({api : data.message})
            return;
        }
        navigate("/users")
    } catch (err)
    {
        setErrors({api : err.message})
    }
    };

    return(
      <>
        <h1>Dodaj użytkownika</h1>
        <form onSubmit={handleForm}>
            <div>
                <label>Imie</label>
                <input type='text'
                        name = 'Imie'
                       value = {form.Imie}
                       onChange={handleChange}
                />
                <p className="error">{errors.Imie}</p>
            </div>

            <div>
                <label>Nazwisko</label>
                <input type='text'
                       name = 'Nazwisko'
                       value = {form.Nazwisko}
                       onChange={handleChange}
                />
                <p className="error">{errors.Nazwisko}</p>
            </div>

            <div>
                <label>E-mail</label>
                <input type='email'
                       name = 'Email'
                       value = {form.Email}
                       onChange={handleChange}
                />
                <p className="error">{errors.Email}</p>
            </div>

            <div>
                <label>Hasło</label>
                <input type='password'
                       name = 'Haslo'
                       value = {form.Haslo}
                       onChange={handleChange}
                />
            </div>

            <p className="error">{errors.api}</p>

            <div>
            <button type="submit">Stwórz</button>
            <button type="button" onClick={handleCancel}>Anuluj</button>

            </div>
        </form>
      </>
    );
}
export default UserForm;