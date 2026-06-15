import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { homePageData } from "../../data/homePageData";
import {
    CCol,
    CContainer,
    CFormInput,
    CFormLabel,
    CImage,
    CRow,
    CSpinner
} from "@coreui/react";
import { TiltButton } from "react-tilt-button";
import MiniCardDetails from "./components/MiniCardDetails";
import axios from "axios";
import "./ProductsDetails.css";

const ProductsDetails = () => {
    const { cod } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [cep, setCep] = useState("");
    const [cepError, setCepError] = useState(null)
    const [shippingInfo, setShippingInfo] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const foundProduct = homePageData.find(
                item => item.cod_product === Number(cod)
            );
            if (foundProduct) {
                setProduct(foundProduct);
                setSelectedImage(foundProduct.picture);
            } else {
                alert("Produto não encontrado");
            }
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const calculateShipping = async () => {
        if (!cep || cep.length < 8) {
            setCepError("Informe um CEP válido");
            return;
        }
        setLoadingAddress(true);
        setCepError(null);
        try {
            const response = await axios.get(
                `https://viacep.com.br/ws/${cep}/json/`
            );
            if (response.data.erro) {
                setCepError("CEP não encontrado");
                return;
            }
            const shippingValue =
                Math.floor(Math.random() * 25) + 10;

            const shippingDays =
                Math.floor(Math.random() * 7) + 2;
            setShippingInfo({
                city: response.data.localidade,
                state: response.data.uf,
                price: shippingValue,
                days: shippingDays
            });
        }
        catch (error) {
            console.error(error);
            setCepError(error);
        }
        finally {
            setLoadingAddress(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [cod]);

    const originalPrice = useMemo(() => {
        return (Number(product?.price || 0) * 1.25).toFixed(2);
    }, [product.price]);

    const reviews = useMemo(() => {
        return Math.floor(Math.random() * 300) + 50;
    }, []);

    const stock = useMemo(() => {
        return Math.floor(Math.random() * 30) + 10;
    }, []);

    const formatCurrency = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) return "R$ 0,00";
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(numericValue);
    }

    if (loading) {
        return (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                <CSpinner />
                <span className="mt-2">
                    Carregando dados do produto...
                </span>
            </div>
        );
    }

    return (
        <CContainer className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
            <CRow className="g-5">
                <CCol lg={5}>
                    <div className="bg-white rounded shadow-sm p-3">
                        <div className="product-image-wrapper">
                            <CImage
                                src={selectedImage}
                                className="product-image w-100"
                                style={{
                                    height: "600px",
                                    objectFit: "contain"
                                }}
                            />
                        </div>

                        <div className="mt-3 d-flex flex-wrap justify-content-center">
                            {product.detailed_pictures?.map(
                                (image, index) => (
                                    <MiniCardDetails
                                        key={index}
                                        img={image.picture}
                                        altText={product.product_name}
                                        onSelect={setSelectedImage}
                                        selected={
                                            selectedImage === image.picture
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>
                </CCol>

                <CCol lg={7}>
                    <h1 className="mb-2 fw-bold">
                        {product.product_name}
                    </h1>

                    <div className="d-flex align-items-center gap-2 mb-3">
                        <span className="stars">
                            ★★★★★
                        </span>

                        <span className="text-muted">
                            ({reviews} avaliações)
                        </span>
                    </div>

                    <p className="old-price">
                        {formatCurrency(originalPrice)}
                    </p>

                    <div className="d-flex align-items-center gap-3 mb-2">
                        <h2 className="current-price">
                            {formatCurrency(product.price)}
                        </h2>

                        <span className="badge bg-success">
                            20% OFF
                        </span>
                    </div>

                    <p className="installments">
                        ou 12x de R$
                        {(Number(product.price) / 12).toFixed(2)}
                    </p>

                    <div className="mb-4">
                        <CFormLabel>
                            Quantidade
                        </CFormLabel>

                        <div className="quantity-selector">
                            <button
                                type="button"
                                className="quantity-btn"
                                onClick={() =>
                                    setQuantity(prev =>
                                        Math.max(1, prev - 1)
                                    )
                                }
                            >
                                -
                            </button>

                            <span className="quantity-value">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                className="quantity-btn"
                                onClick={() =>
                                    setQuantity(prev => prev + 1)
                                }
                                disabled={quantity >= stock}
                            >
                                +
                            </button>
                        </div>
                        <p>
                            {stock} unidades disponíveis
                        </p>
                    </div>

                    <TiltButton
                        elevation={4}
                        tilt={0.1}
                        variant="steel"
                        width="320px"
                        height={55}
                        sideColor="#5F615F"
                        surfaceColor="#D2D6D3"
                        borderColor="#5F615F"
                    >
                        Adicionar ao carrinho
                    </TiltButton>

                    <div className="purchase-benefits">
                        <p>🚚 Frete rápido para todo Brasil</p>
                        <p>🔒 Compra segura</p>
                        <p>💳 Até 12x sem juros</p>
                    </div>

                    <div className="mt-4">
                        <h4>Calcular Frete</h4>

                        <div className="d-flex gap-2 align-items-end">
                            <div style={{ width: "250px" }}>
                                <CFormInput
                                    placeholder="Informe o CEP"
                                    value={cep}
                                    onChange={(e) =>
                                        setCep(e.target.value)
                                    }
                                />
                            </div>

                            <TiltButton
                                elevation={3}
                                tilt={0.8}
                                height={40}
                                width={140}
                                variant="steel"
                                onClick={calculateShipping}
                            >
                                Calcular
                            </TiltButton>
                        </div>

                        {loadingAddress && (
                            <div className="mt-3">
                                <CSpinner size="sm" />
                            </div>
                        )}

                        {shippingInfo && (
                            <div className="shipping-card mt-3">
                                <p>
                                    📍 {shippingInfo.city} - {shippingInfo.state}
                                </p>

                                <p>
                                    🚚 Frete:
                                    <strong>
                                        {" "}R$ {shippingInfo.price}
                                    </strong>
                                </p>

                                <p>
                                    ⏱️ Prazo:
                                    <strong>
                                        {" "}
                                        {shippingInfo.days} dias úteis
                                    </strong>
                                </p>
                            </div>
                        )}

                        {cepError && (
                            <p className="text-danger">{cepError}</p>
                        )}
                    </div>
                </CCol>
            </CRow>

            <div className="bg-white rounded shadow-sm p-4 mt-5">
                <h3 className="mb-3">
                    Descrição do Produto
                </h3>

                <p className="mb-0">
                    {product.description}
                </p>
            </div>
        </CContainer>
    );
};

export default ProductsDetails;