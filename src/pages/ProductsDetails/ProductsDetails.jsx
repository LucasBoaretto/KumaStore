import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CButton, CCol, CContainer, CFormInput, CFormLabel, CImage, CRow, CSpinner } from "@coreui/react";
import { TiltButton } from "react-tilt-button";
import MiniCardDetails from "./components/MiniCardDetails";
import axios from "axios";
import "./ProductsDetails.css";
import Swal from "sweetalert2";
import { useProductsDetails } from "./useProductsDetails";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductsDetails = () => {
    const { product, loading, selectedImage, setSelectedImage, cep, setCep,
        cepError, shippingInfo, loadingAddress, calculateShipping,
        addToCart, originalPrice, stock, formatCurrency, quantity, setQuantity } = useProductsDetails();

    if (loading) {
        return (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5">
                <CSpinner />
                <span className="mt-2 text-muted">
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
                                style={{ height: "600px", objectFit: "contain" }}
                            />
                        </div>

                        <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
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

                    <p className="text-decoration-line-through text-muted mb-1">
                        R$ {originalPrice}
                    </p>

                    <div className="d-flex align-items-center gap-3 mb-2">
                        <h2 className="current-price text-success fw-bold m-0">
                            {formatCurrency(product.price)}
                        </h2>
                        <span className="badge bg-success">
                            20% OFF
                        </span>
                    </div>

                    <p className="text-muted small mb-4">
                        ou 12x de {(Number(product.price) / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros
                    </p>

                    <div className="mb-4">
                        <CFormLabel className="fw-bold">Quantidade</CFormLabel>
                        <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center border border-dark me-4 bg-light">
                                <CButton
                                    className="btn btn-light border-0 rounded-0 px-3 bg-transparent d-flex align-items-center justify-content-center"
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    style={{ height: '36px' }}
                                >
                                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '12px' }} />
                                </CButton>
                                <div
                                    className="px-3 border-start border-end border-dark bg-white d-flex justify-content-center align-items-center"
                                    style={{ width: '40px', height: '36px' }}
                                >
                                    {quantity}
                                </div>
                                <CButton
                                    className="btn btn-light border-0 rounded-0 px-3 bg-transparent d-flex align-items-center justify-content-center"
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    disabled={quantity >= stock}
                                    style={{ height: '36px' }}
                                >
                                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '12px' }} />
                                </CButton>
                            </div>
                            <span className="text-muted small">{stock} disponíveis</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <TiltButton
                            elevation={4}
                            tilt={0.1}
                            variant="steel"
                            width="auto"
                            width='50%'
                            height={55}
                            sideColor="#5F615F"
                            surfaceColor="#D2D6D3"
                            borderColor="#5F615F"
                            onClick={addToCart}
                        >
                            Adicionar ao Carrinho
                        </TiltButton>
                    </div>

                    <div>
                        <h5 className="fw-bold mb-3">Calcular Frete</h5>
                        <div className="d-flex gap-2 align-items-start">
                            <div style={{ maxWidth: "200px" }}>
                                <CFormInput
                                    placeholder="00000-000"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    maxLength={9}
                                />
                            </div>
                            <button
                                className="btn btn-dark rounded px-4 py-2"
                                onClick={calculateShipping}
                            >
                                Calcular
                            </button>
                        </div>

                        {loadingAddress && (
                            <div className="mt-3">
                                <CSpinner size="sm" />
                            </div>
                        )}
                        {shippingInfo && (
                            <div className="mt-3 p-3 border border-dark rounded bg-white">
                                <p className="mb-1 fw-bold">{shippingInfo.city} - {shippingInfo.state}</p>
                                <p className="mb-1 text-muted">Transportadora Padrão</p>
                                <div className="d-flex justify-content-between mt-2">
                                    <span className="text-success fw-bold">R$ {shippingInfo.price},00</span>
                                    <span>Chega em <strong>{shippingInfo.days} dias</strong></span>
                                </div>
                            </div>
                        )}
                        {cepError && (
                            <p className="text-danger mt-2 small">{cepError}</p>
                        )}
                    </div>
                </CCol>
            </CRow>

            <div className="bg-white rounded shadow-sm p-4 mt-5">
                <h3 className="mb-3 fw-bold border-bottom pb-2">
                    Descrição do Produto
                </h3>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                    {product.description}
                </p>
            </div>
        </CContainer>
    );
};

export default ProductsDetails;