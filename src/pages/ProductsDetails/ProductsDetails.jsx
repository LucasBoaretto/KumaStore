import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { homePageData } from "../../data/homePageData";
import { CCol, CContainer, CFormInput, CFormLabel, CImage, CRow, CSpinner } from "@coreui/react";
import { TiltButton } from "react-tilt-button";
import MiniCardDetails from "./components/MiniCardDetails";
import axios from "axios";

const ProductsDetails = () => {
    const { cod } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({});
    const [loadingAddress, setLoadingAddress] = useState(false);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
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

    const fetchAddress = async (cep) => {
        setLoadingAddress(true);
        try {
            const response = await axios.get(`viacep.com.br/ws/${cep}/json/`);
            if (response) {
                setAddress(response.data.data);
            }
        } catch (error) {
            console.warn(`Erro ao buscar CEP ${error}`);
        } finally {
            setLoadingAddress(false);
            console.log(address)
        }
    }

    useEffect(() => {
        fetchProduct();
        fetchAddress();
    }, [cod]);

    if (loading) {
        return (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                <CSpinner />
                Carregando dados do produto...
            </div>
        )
    }

    const formattValue = (value) => {
        return value.replace('.', ',');
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
                    <div className="mt-3 px-4 d-flex flex-row">
                        {product.detailed_pictures.map((product, index) => (
                            <MiniCardDetails
                                key={index}
                                img={product.picture}
                                altText={"texto"}
                            />
                        ))}
                    </div>
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
                    <div className="d-flex justify-content-center">
                        <TiltButton
                            elevation={4}
                            tilt={0.1}
                            variant="steel"
                            width='50%'
                            height={50}
                            sideColor='#5F615F'
                            surfaceColor="#D2D6D3"
                            borderColor="#5F615F"
                        >Adicionar ao carrinho
                        </TiltButton>
                    </div>
                </CCol>
            </CRow>
            <CRow className="mb-4">
                {product.description}
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