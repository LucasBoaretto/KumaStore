import { CCol, CContainer, CRow } from "@coreui/react"
import DefaultCard from "../../components/DefaultCard/DefaultCard"
import { homePageData } from "../../data/homePageData"
import DefaultBanner from "../../components/DefaultBanner/DefaultBanner"
import { TiltButton } from "react-tilt-button"

const HomePage = () => {
    return (
        <div>
            <CContainer className="my-4">
                <DefaultBanner items={homePageData} />
                <CRow className="justify-content-center my-4">
                    <TiltButton
                        elevation={8}
                        tilt={0.3}
                        variant="gold"
                    >Ver Promoções</TiltButton>
                </CRow>
            </CContainer>
            <CContainer className="my-5">
                <CRow className="justify-content-center g-5">
                    {homePageData.map((product, index) => (
                        <CCol md={3} lg={3} xs={12} className="mb-4">
                            <DefaultCard
                                key={index}
                                title={product.product_name}
                                price={product.price}
                                img={product.picture}
                            />
                        </CCol>
                    ))}
                </CRow>
            </CContainer>
        </div>
    )
}

export default HomePage