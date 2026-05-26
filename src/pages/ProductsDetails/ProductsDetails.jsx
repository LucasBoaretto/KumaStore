import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { homePageData } from "../../data/homePageData";
import { CCol, CContainer, CFormInput, CFormLabel, CImage, CRow, CSpinner } from "@coreui/react";
import { TiltButton } from "react-tilt-button";

const ProductsDetails = () => {
    const { cod } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const foundProduct = homePageData.find(item => item.cod_product === Number(cod));
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                alert("Produto não encontrado");
            }
        } catch (error) {
            alert("Erro ao obter produto");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [cod]);

    if (loading) {
        return (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                <CSpinner />
                Carregando dados do produto...
            </div>
        )
    }

    return (
        <CContainer className="p-4">
            <CRow className="mb-4">
                <CCol>
                    <CImage
                        src={product.picture}
                        height={600}
                        width={400}
                        className="object-fit-contain"
                    />
                </CCol>
                <CCol>
                    <p className="mb-5 fs-1">{product.product_name}</p>
                    <p className="fs-5">R$ {product.price}</p>
                    <CFormLabel htmlFor="quantity">Quantidade</CFormLabel>
                    <CFormInput
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="mb-3"
                    />
                    <TiltButton
                        elevation={7}
                        tilt={0.8}
                        variant="carbon"
                    >Adicionar ao carrinho
                    </TiltButton>
                </CCol>
            </CRow>
            <CRow className="mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat delectus amet blanditiis unde repellendus, sint saepe ipsum iste. Dolor iure tempora ex quibusdam incidunt quisquam itaque obcaecati pariatur sint quos.
            </CRow>
            <CRow className="mb-4">
                <CCol md={4}>
                    <CFormLabel>Calcular Frete</CFormLabel>
                    <CFormInput type="text" placeholder="Informe o CEP" />
                </CCol>
                <CCol className="d-flex align-items-end">
                    <TiltButton
                        elevation={3}
                        tilt={0.8}
                        height={40}
                        width={140}
                        variant="steel"
                    >
                        Calcular
                    </TiltButton>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default ProductsDetails