import { CCol, CContainer, CRow } from "@coreui/react"
import DefaultCard from "../../components/DefaultCard/DefaultCard"
import { homePageData } from "../../data/homePageData"
import DefaultBanner from "../../components/DefaultBanner/DefaultBanner"
import { TiltButton } from "react-tilt-button"
import { useState } from "react"
import { Link } from "react-router"
import ProductsDetails from "../ProductsDetails/ProductsDetails"
import { bannerData } from "../../data/bannerData"

const HomePage = () => {
    return (
        <div>
            <CContainer className="my-4 d-flex flex-column align-items-center">
                <DefaultBanner items={bannerData} />
                <CRow className="my-4">
                    <TiltButton
                        elevation={4}
                        tilt={0.5}
                        variant="gold"
                        height={50}
                    >Ver Promoções
                    </TiltButton>
                </CRow>
            </CContainer>
            <CContainer className="my-5">
                <CRow>
                    {homePageData.map((product, index) => (
                        <CCol md={6} lg={3} xs={12} className="mb-4" key={index}>
                            <Link to={`/products/${product.cod_product}`} onClick={() => setSelectedProduct(product.cod_product)}>
                                <DefaultCard
                                    title={product.product_name}
                                    price={product.price}
                                    img={product.picture}
                                />
                            </Link>
                        </CCol>
                    ))}
                </CRow>
            </CContainer>
        </div>
    )
}

export default HomePage