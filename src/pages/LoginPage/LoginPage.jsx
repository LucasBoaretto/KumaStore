import React, { useState } from "react"
import { CCol, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react"
import { Link } from "react-router"
import { TiltButton } from "react-tilt-button"
import './LoginPage.css'

export const LoginPage = ({ visible, onClose, onSwitchToRegister, onLoginSuccess }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleLogin = () => {
        setErrorMsg('')

        if (!email || !password) {
            setErrorMsg('Preencha email e senha.')
            return
        }

        // Resgata os usuários do localStorage
        const existingUsers = JSON.parse(localStorage.getItem('usersDB')) || []

        // Procura o usuário pelo email
        const user = existingUsers.find(u => u.email === email)

        if (!user) {
            setErrorMsg('Usuário não encontrado. Crie uma conta.')
            return
        }

        // Verifica a senha
        if (user.password !== password) {
            setErrorMsg('Senha incorreta.')
            return
        }

        // Login com sucesso! Salva o usuário atual na sessão/localstorage
        localStorage.setItem('currentUser', JSON.stringify(user))

        // Limpa os campos
        setEmail('')
        setPassword('')

        // Avisa o DefaultHeader que o login foi bem-sucedido passando os dados do usuário
        if (onLoginSuccess) {
            onLoginSuccess(user)
        } else {
            // Fallback caso a prop não tenha sido passada
            onClose()
        }
    }

    return (
        <CModal visible={visible} onClose={onClose} alignment="center" backdrop="static">
            <CModalHeader className="border-0 pb-0" />

            <CModalBody className="px-4 pb-4 px-sm-5 pb-sm-5 pt-0">
                <div className="text-center mb-4">
                    <h2 className="login-title">Bem-vindo</h2>
                    <p className="text-muted small">Faça login para continuar comprando</p>
                </div>

                <CForm noValidate>
                    {errorMsg && <div className="alert alert-danger py-2 mb-3 small">{errorMsg}</div>}

                    <CRow className="mb-3">
                        <CCol>
                            <CFormLabel htmlFor="emailInput">Email</CFormLabel>
                            <CFormInput
                                id="emailInput"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-4">
                        <CCol>
                            <CFormLabel htmlFor="passwordInput">Senha</CFormLabel>
                            <CFormInput
                                id="passwordInput"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol className="d-flex justify-content-center">
                            <TiltButton
                                height={50}
                                elevation={5}
                                surfaceColor={'#0d6efd'}
                                sideColor={'#0a58ca'}
                                onClick={handleLogin}
                            >
                                Entrar
                            </TiltButton>
                        </CCol>
                    </CRow>

                    <CRow className="text-center mb-3">
                        <CCol>
                            <Link to='/forgot-password' className="forgot-password-link">
                                Esqueceu a senha?
                            </Link>
                        </CCol>
                    </CRow>

                    <hr className="my-4 text-muted" />

                    <CRow>
                        <CCol className="d-flex justify-content-center">
                            <TiltButton
                                height={50}
                                elevation={3}
                                surfaceColor={'#f8f9fa'}
                                sideColor={'#e2e3e5'}
                                onClick={onSwitchToRegister}
                            >
                                <span className="create-account-text">Criar conta</span>
                            </TiltButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}

export default LoginPage