import { useState } from "react"

export const useLoginModal = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleLogin = () => {
        setErrorMsg('')
        if (!email || !password) {
            setErrorMsg('Preencha email e senha.')
            return
        }
        const existingUsers = JSON.parse(localStorage.getItem('usersDB')) || []
        const user = existingUsers.find(u => u.email === email)
        if (!user) {
            setErrorMsg('Usuário não encontrado. Crie uma conta.')
            return
        }
        if (user.password !== password) {
            setErrorMsg('Senha incorreta.')
            return
        }
        localStorage.setItem('currentUser', JSON.stringify(user))
        setEmail('')
        setPassword('')
        if (onLoginSuccess) {
            onLoginSuccess(user)
        } else {
            onClose()
        }
    }

    return {
        email, setEmail, password, setPassword, errorMsg, setErrorMsg, handleLogin
    }
}