import { CCol, CFooter, CFormLabel, CLink, CRow } from "@coreui/react"
import './DefaultFooter.css'

const DefaultFooter = () => {
    return (
        <CFooter className="py-3">
            <CRow className="w-100 d-flex">
                <CCol className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column">
                        <CFormLabel className="fw-bold">Suporte</CFormLabel>
                        <ul className="list-unstyled">
                            <li>FAQ</li>
                            <li>Ajuda</li>
                        </ul>
                    </div>
                </CCol>
                <CCol className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column">
                        <CFormLabel className="fw-bold">Contato</CFormLabel>
                        <ul className="list-unstyled">
                            <li>Email</li>
                            <li>Telefone</li>
                        </ul>
                    </div>
                </CCol>
                <CCol className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column">
                        <CFormLabel className="fw-bold">Redes</CFormLabel>
                        <ul className="list-unstyled">
                            <li>Facebook</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
                </CCol>
            </CRow>
        </CFooter>
    )
}

export default DefaultFooter