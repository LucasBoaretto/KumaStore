import { CCol, CContainer, CRow } from "@coreui/react"
import DefaultCard from "../../components/DefaultCard/DefaultCard"
import { homePageData } from "../../data/homePageData"
import DefaultBanner from "../../components/DefaultBanner/DefaultBanner"
import { TiltButton } from "react-tilt-button"
import { useEffect } from "react"
import { Link } from "react-router"
import { bannerData } from "../../data/bannerData"
import Swal from "sweetalert2"
import "./HomePage.css"

const HomePage = () => {
    useEffect(() => {
        const hasSeenAlert = sessionStorage.getItem("hasSeenDevAlert")

        if (!hasSeenAlert) {
            Swal.fire(
                "Atenção",
                "Esse site ainda está em desenvolvimento e as imagens são meramente ilustrativas.",
                "info"
            )

            sessionStorage.setItem("hasSeenDevAlert", "true")
        }
    }, [])

    const scrollToHighlights = () => {
        document
            .getElementById("promotions")
            ?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="home-page">
            <CContainer className="py-4">
                <DefaultBanner items={bannerData} />
            </CContainer>

            <CContainer id="promotions" className="pb-5">
                <div className="section-header">
                    <h1 className="hero-title text-dark">
                        A maior coleção de pelúcias para todas as idades
                    </h1>
                    <p className="section-subtitle">
                        Os favoritos dos nossos clientes
                    </p>
                </div>

                <CRow className="g-4">
                    {homePageData.map((product) => (
                        <CCol
                            key={product.cod_product}
                            xs={12}
                            md={6}
                            lg={3}
                        >
                            <Link
                                to={`/products/${product.cod_product}`}
                                className="product-link"
                            >
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