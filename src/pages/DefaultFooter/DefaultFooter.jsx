import { CCol, CFooter, CRow } from "@coreui/react"
import './DefaultFooter.css'

const DefaultFooter = () => {
    return (
        <CFooter className="py-4">
            <CRow className="w-100 d-flex text-center text-md-start">
                <CCol xs={12} md={3} className="d-flex flex-column align-items-center mb-3 mb-md-0">
                    <div className="d-flex flex-column text-start">
                        <h6 className="fw-bold text-uppercase">Suporte</h6>
                        <ul className="list-unstyled text-muted small">
                            <li>FAQ</li>
                            <li>Ajuda</li>
                            <li>Trocas e Devoluções</li>
                        </ul>
                    </div>
                </CCol>
                <CCol xs={12} md={3} className="d-flex flex-column align-items-center mb-3 mb-md-0">
                    <div className="d-flex flex-column text-start">
                        <h6 className="fw-bold text-uppercase">Contato</h6>
                        <ul className="list-unstyled text-muted small">
                            <li>contato@kumastore.com</li>
                            <li>(46) 99999-9999</li>
                            <li>Pato Branco - PR</li>
                        </ul>
                    </div>
                </CCol>
                <CCol xs={12} md={3} className="d-flex flex-column align-items-center mb-3 mb-md-0">
                    <div className="d-flex flex-column text-start">
                        <h6 className="fw-bold text-uppercase">Redes Sociais</h6>
                        <ul className="list-unstyled text-muted small">
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>TikTok</li>
                        </ul>
                    </div>
                </CCol>
                <CCol xs={12} md={3} className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column text-start">
                        <h6 className="fw-bold text-uppercase">Pagamento</h6>
                        <ul className="list-unstyled text-muted small">
                            <li>Pix</li>
                            <li>Cartão de Crédito (Até 12x)</li>
                            <li>Boleto Bancário</li>
                        </ul>
                    </div>
                </CCol>
            </CRow>
            <CRow className="w-100 mt-3 pt-3 border-top">
                <CCol className="text-center text-muted small">
                    &copy; 2026 KumaStore. Todos os direitos reservados.
                </CCol>
            </CRow>
        </CFooter>
    )
}

export default DefaultFooter