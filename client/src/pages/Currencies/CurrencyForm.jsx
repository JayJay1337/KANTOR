import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../components/form.css"
function CurrencyForm(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        Nazwa: "",
        Symbol: "",
        Kurs: "",
    });
    const validateForm = () => {
        const newErrors = {}
        if(!form.Nazwa.trim()) newErrors.Nazwa = "Nazwa jest wymagana"
        if(!form.Symbol.trim()) newErrors.Symbol = "Symbol jest wymagany"
        if(!form.Kurs.trim()) newErrors.Kurs = "Kurs jest wymagany"
        if(isNaN(form.Kurs)) newErrors.Kurs = "Kurs musi być liczbą"

        return newErrors
    }
    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };
    const handleCancel = () => {
        navigate("/currencies")
    }
    const handleForm = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm()
        if(Object.keys(validationErrors).length >0){
            setErrors(validationErrors)
            return;
        }

        setErrors({})
        try{
            const res = await fetch("http://localhost:3000/api/currencies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            const data = await res.json()
            if(!res.ok){
                setErrors({api : data.message})
                return
            }
            navigate("/currencies")
        }catch(err){
            setErrors({api : err.message})
        }
    }

    return(
        <>
            <h1>Dodaj walute</h1>
            <form onSubmit={handleForm}>
                <div>
                    <label>Nazwa</label>
                    <input type='text'
                           name = 'Nazwa'
                           value = {form.Nazwa}
                           onChange={handleChange}
                    />
                    <p className="error">{errors.Nazwa}</p>

                </div>

                <div>
                    <label>Symbol</label>
                    <input type='text'
                           name = 'Symbol'
                           value = {form.Symbol}
                           onChange={handleChange}
                    />
                    <p className="error">{errors.Symbol}</p>

                </div>

                <div>
                    <label>Kurs</label>
                    <input type='number'
                           name = 'Kurs'
                           value = {form.Kurs}
                           onChange={handleChange}
                    />
                    <p className="error">{errors.Kurs}</p>

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
export default CurrencyForm;