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

                <div className="hero-action">
                    <h1 className="hero-title">
                        A maior coleção de pelúcias para todas as idades
                    </h1>

                    <p className="hero-subtitle">
                        Produtos selecionados com qualidade e entrega rápida.
                    </p>

                    <TiltButton
                        elevation={4}
                        tilt={0.5}
                        variant="gold"
                        height={50}
                        onClick={scrollToHighlights}
                    >
                        Ver Destaques
                    </TiltButton>
                </div>
            </CContainer>

            <CContainer className="my-5">
                <CRow className="g-4">
                    <CCol md={3}>
                        <div className="benefit-card">
                            <div className="benefit-icon">🚚</div>
                            <h5>Frete Rápido</h5>
                            <p>Entrega para todo Brasil</p>
                        </div>
                    </CCol>

                    <CCol md={3}>
                        <div className="benefit-card">
                            <div className="benefit-icon">🔒</div>
                            <h5>Compra Segura</h5>
                            <p>Pagamentos protegidos</p>
                        </div>
                    </CCol>

                    <CCol md={3}>
                        <div className="benefit-card">
                            <div className="benefit-icon">💳</div>
                            <h5>Parcelamento</h5>
                            <p>Até 12x sem juros</p>
                        </div>
                    </CCol>

                    <CCol md={3}>
                        <div className="benefit-card">
                            <div className="benefit-icon">⭐</div>
                            <h5>Qualidade</h5>
                            <p>Produtos selecionados</p>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>

            <CContainer id="promotions" className="pb-5">
                <div className="section-header">
                    <span className="section-badge">
                        Destaques
                    </span>

                    <h2 className="section-title">
                        Produtos em Destaque
                    </h2>

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