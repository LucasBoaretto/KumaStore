import { CCol, CContainer, CRow, CSpinner } from "@coreui/react"
import DefaultCard from "../../components/DefaultCard/DefaultCard"
import DefaultBanner from "../../components/DefaultBanner/DefaultBanner"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { bannerData } from "../../data/bannerData"
import axios from "axios"
import Swal from "sweetalert2"
import "./HomePage.css"

const HomePage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState(null)

    const categoriesMenu = [
        { id: 'ursos', name: 'Ursinhos', subcategories: ['Grandes', 'Pequenos', 'Com Som'] },
        { id: 'animais', name: 'Animais da Floresta', subcategories: ['Capivaras', 'Raposas', 'Esquilos'] },
        { id: 'pets', name: 'Pets Fofos', subcategories: ['Gatinhos', 'Cachorrinhos'] }
    ]

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await axios.get("/produtos.json")
                setProducts(response.data)
            } catch (error) {
                console.error("Erro ao carregar o arquivo produtos.json:", error)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    return (
        <div className="home-container">
            <CContainer className="py-4">
                <DefaultBanner items={bannerData} />
            </CContainer>
            {/* Categorias */}
            <CContainer className="mb-5">
                <div className="box-categorias p-3">
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                        {categoriesMenu.map((categorie) => (
                            <button
                                key={categorie.id}
                                className={`btn-categoria ${activeCategory === categorie.id ? 'ativo' : ''}`}
                                onClick={() => setActiveCategory(activeCategory === categorie.id ? null : categorie.id)}
                            >
                                {categorie.name}
                            </button>
                        ))}
                    </div>

                    {/* Submenu condicional direto (Sem animação) */}
                    {activeCategory && (
                        <div className="area-subcategorias mt-3 p-3">
                            <div className="d-flex justify-content-center gap-2 flex-wrap">
                                {categoriesMenu
                                    .find(c => c.id === activeCategory)
                                    ?.subcategories.map((sub, i) => (
                                        <button
                                            key={i}
                                            className="btn-sub"
                                        >
                                            {sub}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </div>
            </CContainer>
            {/* Produtos */}
            <CContainer id="promotions" className="pb-5">
                <div className="cabecalho-produtos">
                    <h1 className="titulo-destaque text-dark">
                        A maior coleção de pelúcias para todas as idades
                    </h1>
                    <p className="subtitulo-produtos">
                        Os favoritos dos nossos clientes
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <CSpinner />
                        <p className="mt-2 text-muted">Carregando catálogo de pelúcias...</p>
                    </div>
                ) : (
                    <CRow className="g-4">
                        {products.map((product) => (
                            <CCol key={product.cod_product} xs={12} md={6} lg={3}>
                                <Link
                                    to={`/produto/${product.cod_product}`}
                                    className="link-produto text-decoration-none"
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
                )}
            </CContainer>
        </div>
    )
}

export default HomePage