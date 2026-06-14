import React, { useState } from "react"
import { CCol, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react"
import { TiltButton } from "react-tilt-button"
import './LoginPage.css'

export const RegisterPage = ({ visible, onClose, onSwitchToLogin }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleRegister = () => {
        setErrorMsg('')
        setSuccessMsg('')

        // Validações básicas
        if (!name || !email || !password || !confirmPassword) {
            setErrorMsg('Preencha todos os campos.')
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg('As senhas não coincidem.')
            return
        }

        // Resgata os usuários já cadastrados no localStorage (ou cria um array vazio se não existir)
        const existingUsers = JSON.parse(localStorage.getItem('usersDB')) || []

        // Verifica se o email já está cadastrado
        const userExists = existingUsers.find(user => user.email === email)
        if (userExists) {
            setErrorMsg('Este email já está em uso.')
            return
        }

        // Cria o novo usuário e salva no localStorage
        const newUser = { name, email, password }
        existingUsers.push(newUser)
        localStorage.setItem('usersDB', JSON.stringify(existingUsers))

        setSuccessMsg('Conta criada com sucesso!')

        // Limpa o formulário e manda para o login após 1.5 segundos
        setTimeout(() => {
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setSuccessMsg('')
            onSwitchToLogin()
        }, 1500)
    }

    return (
        <CModal visible={visible} onClose={onClose} alignment="center" backdrop="static">
            <CModalHeader className="border-0 pb-0" />

            <CModalBody className="px-4 pb-4 px-sm-5 pb-sm-5 pt-0">
                <div className="text-center mb-4">
                    <h2 className="login-title">Criar Conta</h2>
                    <p className="text-muted small">Preencha os dados abaixo para se cadastrar</p>
                </div>

                <CForm noValidate>
                    {errorMsg && <div className="alert alert-danger py-2 mb-3 small">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success py-2 mb-3 small">{successMsg}</div>}

                    <CRow className="mb-3">
                        <CCol>
                            <CFormLabel htmlFor="nameInput">Nome Completo</CFormLabel>
                            <CFormInput
                                id="nameInput"
                                type="text"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol>
                            <CFormLabel htmlFor="registerEmailInput">Email</CFormLabel>
                            <CFormInput
                                id="registerEmailInput"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol>
                            <CFormLabel htmlFor="registerPasswordInput">Senha</CFormLabel>
                            <CFormInput
                                id="registerPasswordInput"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-4">
                        <CCol>
                            <CFormLabel htmlFor="confirmPasswordInput">Confirmar Senha</CFormLabel>
                            <CFormInput
                                id="confirmPasswordInput"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol className="d-flex justify-content-center">
                            <TiltButton
                                height={50}
                                elevation={5}
                                surfaceColor={'#198754'}
                                sideColor={'#146c43'}
                                onClick={handleRegister}
                            >
                                Cadastrar
                            </TiltButton>
                        </CCol>
                    </CRow>

                    <hr className="my-4 text-muted" />

                    <CRow className="text-center">
                        <CCol>
                            <span className="text-muted small me-2">Já possui uma conta?</span>
                            <button
                                type="button"
                                className="btn btn-link p-0 forgot-password-link align-baseline"
                                onClick={onSwitchToLogin}
                            >
                                Fazer login
                            </button>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}

export default RegisterPage