import { useState } from "react"

export const useRegisterModal = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleRegister = () => {
        setErrorMsg('')
        setSuccessMsg('')
        if (!name || !email || !password || !confirmPassword) {
            setErrorMsg('Preencha todos os campos.')
            return
        }
        if (password !== confirmPassword) {
            setErrorMsg('As senhas não coincidem.')
            return
        }
        const existingUsers = JSON.parse(localStorage.getItem('usersDB')) || []
        const userExists = existingUsers.find(user => user.email === email)
        if (userExists) {
            setErrorMsg('Este email já está em uso.')
            return
        }
        const newUser = { name, email, password }
        existingUsers.push(newUser)
        localStorage.setItem('usersDB', JSON.stringify(existingUsers))
        setSuccessMsg('Conta criada com sucesso!')
        setTimeout(() => {
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setSuccessMsg('')
            onSwitchToLogin()
        }, 500)
    }

    return {
        name, setName, email, setEmail, password, setPassword,
        confirmPassword, setConfirmPassword, errorMsg, setErrorMsg,
        successMsg, setSuccessMsg, handleRegister
    }
}