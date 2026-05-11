import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/form.css"
function WalletForm() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [errors, setErrors] = useState({})
    const [wallet, setWallet] = useState({
        Uzytkownik_ID: "",
        Waluta_ID: "",
        Saldo: "",
        Data_Otwarcia: ""
    });

    const [users, setUsers] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            });

        fetch("http://localhost:3000/api/currencies")
            .then(res => res.json())
            .then(data => {
                setCurrencies(data);
            });
    }, []);
    const validateForm = () => {
        const newErrors = {}
        if(!wallet.Uzytkownik_ID) newErrors.Uzytkownik_ID = "Id użytkownika jest wymagane"
        if(!wallet.Waluta_ID) newErrors.Waluta_ID = "Id waluty jest wymagane"
        if(!wallet.Saldo) newErrors.Saldo = "Saldo  jest wymagane"
        else if(isNaN(wallet.Saldo)) newErrors.Saldo = "Saldo musi być liczbą"
        if(!wallet.Data_Otwarcia) newErrors.Data_Otwarcia = "Data otwarca jest wymagana"
    return newErrors;
    }
    const handleChange = (e) => {
        setWallet({
            ...wallet,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = () => {
        navigate("/wallets");
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm()
        if(Object.keys(validationErrors).length >0){
            setErrors(validationErrors)
            return;
        }
        setErrors({})

        try {
            const res = await fetch("http://localhost:3000/api/wallets/", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(wallet)
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors({api : data.message})
                return;
            }

            navigate("/wallets");

        } catch (err) {
            setErrors({api : err.message})
        }
    };

    return (
        <div>
        <h1>Dodaj portfel</h1>
        <form onSubmit={handleForm}>
            <div>
                <label>Użytkownik</label>
                <select name="Uzytkownik_ID" value={wallet.Uzytkownik_ID} onChange={handleChange}>
                    <option value="">Wybierz użytkownika</option>
                    {users.map(user => (
                        <option key={user.ID} value={user.ID}>
                            {user.Imie} {user.Nazwisko}
                        </option>
                    ))}
                </select>
                <p className="error">{errors.Uzytkownik_ID}</p>
            </div>

            <div>
                <label>Waluta</label>
                <select name="Waluta_ID" value={wallet.Waluta_ID} onChange={handleChange}>
                    <option value="">Wybierz walutę</option>
                    {currencies.map(currency => (
                        <option key={currency.ID} value={currency.ID}>
                            {currency.Nazwa}
                        </option>
                    ))}
                </select>
                <p className="error">{errors.Waluta_ID}</p>
            </div>

            <div>
                <label>Saldo</label>
                <input
                    type="number"
                    name="Saldo"
                    value={wallet.Saldo}
                    onChange={handleChange}
                />
                <p className="error">{errors.Saldo}</p>

            </div>

            <div>
                <label>Data Otwarcia</label>
                <input
                    type="date"
                    name="Data_Otwarcia"
                    value={wallet.Data_Otwarcia}
                    onChange={handleChange}
                />
                <p className="error">{errors.Data_Otwarcia}</p>
            </div>
                <p className="error">{errors.api}</p>
            <div>
                <button type="submit">Stwórz</button>
                <button type="button" onClick={handleCancel}>Anuluj</button>
            </div>
        </form>
        </div>
    );
}

export default WalletForm;
