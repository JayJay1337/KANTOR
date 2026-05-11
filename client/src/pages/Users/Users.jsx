import React, { useEffect, useState } from 'react';
import '../../components/style.css';
import Actions from "../../components/Actions.jsx";
import { useNavigate } from "react-router-dom";

function Users() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const pageSize = 5;

    const fetchUsers = () => {
        fetch(`http://localhost:3000/api/users/pagination?page=${page}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setTotal(data.total);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const deleteUser = async (id) => {
        await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        fetchUsers();
    };

    const handleEditUser = (id) => {
        navigate(`/users/${id}/edit`);
    }
    const handleDetailsUser = (id) => {
        navigate(`/users/${id}`);
    }
    const handleAddUser = () => {
        navigate("/users/create");
    }

    const totalPages = Math.ceil(total / pageSize);
    const pagesArray = Array.from ({length: totalPages}, (_,i) => (i+1) );

    return (
        <>
            <h1>UŻYTKOWNICY</h1>

            <button onClick={handleAddUser}>Dodaj</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.ID}>
                        <td>{user.ID}</td>
                        <td>{user.Imie}</td>
                        <td>{user.Nazwisko}</td>
                        <td>{user.Email}</td>
                        <td>
                            <Actions
                                onDelete={() => deleteUser(user.ID)}
                                onEdit={() => handleEditUser(user.ID)}
                                onDetails={() => handleDetailsUser(user.ID)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                {pagesArray.map(p =>(
                    <button key={p} onClick={() => setPage(p)}>{p}</button>
                ))}
            </div>
        </>
    );
}

export default Users;
