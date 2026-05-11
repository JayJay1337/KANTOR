const User = require("../model/userModel")
const bcrypt = require("bcrypt");

async function editUser(data) {
    const existingUser = await User.getUser(data.ID);
    if (!existingUser) {
        throw new Error("Użytkownik nie istnieje");
    }

    if (!data.Imie.trim()) throw new Error("Imię jest wymagane");
    if (!data.Nazwisko.trim()) throw new Error("Nazwisko jest wymagane");
    if (!data.Email.trim()) throw new Error("Email jest wymagany");
    const emailLower = data.Email.toLowerCase();
    const users = await User.getAllUsers()
    /*console.log("WSZYSCY UŻYTKOWNICY:", users );
    console.log("data.ID to: "+data.ID)*/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.Email)) {
        throw new Error("Niepoprawny format emaila")
    }

    if (users.some(u => u.Email.toLowerCase() === emailLower && u.ID !== Number(data.ID))) {
        throw new Error("Użytkownik o podanym mailu istnieje " + data.ID + users);
    }

    if (data.Haslo && data.Haslo.length > 0 && data.Haslo.length < 6) {
        throw new Error("Hasło musi mieć minimum 6 znaków");
    }
    if (data.Imie.length > 50) throw new Error("Imię jest za długie");
    if (data.Nazwisko.length > 50) throw new Error("Nazwisko jest za długie");
    try {
        let hashedPassword;

        if (data.Haslo && data.Haslo.length > 0) {
            hashedPassword = await bcrypt.hash(data.Haslo, 10);
        } else {
            hashedPassword = existingUser.Haslo;
        }
        await User.updateUser(
            data.Imie,
            data.Nazwisko,
            data.Email,
            hashedPassword,
            data.ID)
    } catch (err) {
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Uzytkownik.Email") {
            throw new Error("Użytkownik o podanym adresie email już istnieje");
        }
        throw new Error(err.message);
    }
}

async function addUser(data) {
    if (!data.Imie.trim()) throw new Error("Imię jest wymagane");
    if (!data.Nazwisko.trim()) throw new Error("Nazwisko jest wymagane");
    if (!data.Email.trim()) throw new Error("Email jest wymagany");
    const emailLower = data.Email.toLowerCase();
    const users = await User.getAllUsers()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.Email)) {
        throw new Error("Niepoprawny format emaila")
    } else if (users.some(u => u.Email.toLowerCase() === emailLower)) {
        throw new Error("Użytkownik o podanym mailu istnieje")
    }

    if (data.Imie.length > 50) throw new Error("Imię jest za długie");
    if (data.Nazwisko.length > 50) throw new Error("Nazwisko jest za długie");

    if (data.Haslo && data.Haslo.length > 0) {
        if (data.Haslo.length < 6) throw new Error("Hasło musi mieć minimum 6 znaków");
    }
    const hashedPassword = await bcrypt.hash(data.Haslo, 10);

    try {
        await User.createUser(
            data.Imie,
            data.Nazwisko,
            data.Email,
            hashedPassword
        );
    } catch (err) {
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Uzytkownik.Email") {
            throw new Error("Użytkownik o podanym adresie email już istnieje");
        }
        throw new Error(err.message);
    }
}

async function removeUser(id) {
    if (!id) {
        throw new Error("Brak ID użytkownika");
    }

    const result = await User.deleteUser(id);

    if (result.changes === 0) {
        throw new Error("Użytkownik o podanym ID nie istnieje");
    }
}

async function displayMultipleUsers() {
    return await User.getAllUsers();
}

async function displaySingleUser(id) {
    if (!id) {
        throw new Error("Brak id użytkownika")
    }
    const user = await User.getUser(id)
    if (!user) {
        throw new Error("Użytkownik nie istnieje")
    }
    return user;
}

async function loginUser(email, password){
    const user = await User.loginUser(email);
    if (!user) throw new Error("Niepoprawny email lub hasło");

    const matchingPass = await bcrypt.compare(password, user.Haslo)
    if(!matchingPass) throw new Error("Niepoprawny email lub hasło")

    return user
}

async function getUsersPagination(page=1, pageSize=5) {
    const {users, total} = await User.getUsersPagination(page, pageSize);
    return {
        users,
        total,
    };
}
module.exports = {addUser, removeUser, displayMultipleUsers, displaySingleUser, editUser, loginUser, getUsersPagination}