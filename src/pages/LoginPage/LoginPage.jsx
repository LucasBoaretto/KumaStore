import { CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow } from "@coreui/react"
import { Link } from "react-router"
import { TiltButton } from "react-tilt-button"
import './LoginPage.css'

export const LoginPage = () => {
    return (
        <div className="container">
            <CCard className="card">
                <CCardHeader className="text-center card-header">Login</CCardHeader>
                <CCardBody className="w-100">
                    <CForm noValidate className="d-flex flex-column justify-content-center align-items-center">
                        <CRow className="mb-2 w-75">
                            <CCol className="col">
                                <CFormLabel>Email</CFormLabel>
                                <CFormInput
                                    type="email"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-2 w-75">
                            <CCol className="col">
                                <CFormLabel>Senha</CFormLabel>
                                <CFormInput
                                    type="password"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="my-1">
                            <CCol className="col">
                                <TiltButton
                                    height={50}
                                    elevation={5}
                                    surfaceColor={'#0d6efd'}
                                    sideColor={'#0a58ca'}
                                >
                                    Entrar
                                </TiltButton>
                            </CCol>
                        </CRow>
                        <CRow className="text-center small">
                            <CCol className="col">
                                <Link to='/forgot-password'>Esqueceu a senha?</Link>
                            </CCol>
                        </CRow>
                        <hr className="w-100" />
                        <CRow>
                            <CCol className="col">
                                <TiltButton
                                    height={50}
                                    elevation={5}
                                    surfaceColor={'#c2c2c2'}
                                    sideColor={'#979797'}
                                >
                                    Criar conta
                                </TiltButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default LoginPage