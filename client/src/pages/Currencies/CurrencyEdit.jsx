import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../../components/form.css"
function CurrencyEdit(){
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const [errors, setErrors] = useState({})
    const { id } = useParams()
    const [currency, setCurrency] = useState({
        Nazwa : "",
        Symbol : "",
        Kurs : "",
        ID: ""

    });
    useEffect(() => {
        fetch(`http://localhost:3000/api/currencies/${id}`)
            .then(res => res.json())
            .then(data => setCurrency({
                Nazwa: data.Nazwa,
                Symbol: data.Symbol,
                Kurs: data.Kurs,
                ID : data.ID
            }));
    }, [id]);
    const validateForm = () => {
        const newErrors = {}
        if(!currency.Nazwa.trim()) newErrors.Nazwa = "Nazwa jest wymagana"
        if(!currency.Symbol.trim()) newErrors.Symbol = "Symbol jest wymagany"
        if(!currency.Kurs) newErrors.Kurs = "Kurs jest wymagany"
        if(isNaN(currency.Kurs)) newErrors.Kurs = "Kurs musi być liczbą"

        return newErrors
    }
    const handleForm = async(e) => {
        e.preventDefault()

        const validationErrors = validateForm()
        if(Object.keys(validationErrors).length >0){
            setErrors(validationErrors)
            return;
        }

        setErrors({})

        try {
            const res = await fetch(`http://localhost:3000/api/currencies/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(currency)
            })
            const data = await res.json()
            if(!res.ok){
                setErrors({api : data.message})
                return
            }

            navigate('/currencies')
        }catch(err){
            setErrors({api : err.message})
        }
    }
    const handleCancel = ()=>{
        navigate('/currencies')
    }
    const handleChange = (e) => {
        setCurrency({
            ...currency, [e.target.name]: e.target.value
        });
    };
    return(
        <>
            <h1>Edytuj walute</h1>
            <form onSubmit={handleForm}>
                <div>
                    <label>Nazwa</label>
                    <input type='text'
                           name = 'Nazwa'
                           value = {currency.Nazwa}
                           onChange={handleChange}
                    />
                    <p className="error">{errors.Nazwa}</p>
                </div>

                <div>
                    <label>Symbol</label>
                    <input type='text'
                           name = 'Symbol'
                           value = {currency.Symbol}
                           onChange={handleChange}
                    />
                    <p className="error">{errors.Symbol}</p>
                </div>

                <div>
                    <label>Kurs</label>
                    <input type='number'
                           name = 'Kurs'
                           value = {currency.Kurs}
                           onChange={handleChange}
                    />
                    <p className="error">{errors.Kurs}</p>
                </div>
                <p className="error">{errors.api}</p>

                <div>
                    <button type="submit">Zatwierdź</button>
                    <button type="button" onClick={handleCancel}>Anuluj</button>
                </div>
            </form>
        </>
    );
}
export default CurrencyEdit;