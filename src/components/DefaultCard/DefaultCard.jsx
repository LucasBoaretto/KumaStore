import {
    CCard,
    CCardBody,
    CCardImage,
    CCardText,
    CCardTitle
} from "@coreui/react"

import "./DefaultCard.css"

const DefaultCard = ({ img, title, price }) => {
    return (
        <CCard className="default-card h-100">
            <div className="card-image-wrapper">
                <CCardImage
                    orientation="top"
                    src={img}
                    className="card-image"
                />

                <span className="product-badge">
                    🔥 Destaque
                </span>
            </div>

            <CCardBody className="text-center">
                <CCardTitle className="card-title">
                    {title}
                </CCardTitle>

                <CCardText className="card-price">
                    R$ {price}
                </CCardText>
            </CCardBody>
        </CCard>
    )
}

export default DefaultCard