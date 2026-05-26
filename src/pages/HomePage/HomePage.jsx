import { CCol, CContainer, CRow } from "@coreui/react"
import DefaultCard from "../../components/DefaultCard/DefaultCard"
import { homePageData } from "../../data/homePageData"
import DefaultBanner from "../../components/DefaultBanner/DefaultBanner"
import { TiltButton } from "react-tilt-button"
import { useState } from "react"
import { Link } from "react-router"
import ProductsDetails from "../ProductsDetails/ProductsDetails"

const HomePage = () => {
    return (
        <div>
            <CContainer className="my-4 d-flex flex-column align-items-center">
                <DefaultBanner items={homePageData} />
                <CRow className="my-4">
                    <TiltButton
                        elevation={8}
                        tilt={0.5}
                        variant="gold"
                    >Ver Promoções
                    </TiltButton>
                </CRow>
            </CContainer>
            <CContainer className="my-5">
                <CRow className="justify-content-center g-5">
                    {homePageData.map((product, index) => (
                        <CCol md={3} lg={3} xs={12} className="mb-4" key={index}>
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