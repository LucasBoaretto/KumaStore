import { CCard, CCardBody, CCardImage, CCardText, CCardTitle } from "@coreui/react"
import './DefaultCard.css'

const DefaultCard = ({ img, title, price }) => {
    return (
        <CCard style={{ width: '18rem' }} className="default-card">
            <CCardImage orientation="top" src={img} style={{
                height: '200px',
                objectFit: 'cover'
            }} />
            <CCardBody className="text-center">
                <CCardTitle>{title}</CCardTitle>
                <CCardText>R$ {price}</CCardText>
            </CCardBody>
        </CCard>
    )
}

export default DefaultCard