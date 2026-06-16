import { CButton, CCol, CContainer, CFormInput, CRow } from "@coreui/react"
import { Link } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrashCan, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useCartPage } from "./useCartPage"

const CartPage = () => {
    const {
        cartItems,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        discountAmount,
        discountRate,
        couponInput,
        setCouponInput,
        handleApplyCoupon,
        total,
        formatCurrency,
        shippingCost
    } = useCartPage();

    return (
        <CContainer className="py-5">
            <CRow className="g-5">
                {/* Lista de Produtos */}
                <CCol xs={12} md={7} lg={8}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-bold m-0">Seu Carrinho</h4>
                        {cartItems.length > 0 && (
                            <CButton
                                className="btn btn-sm btn-outline-danger rounded-0"
                                onClick={clearCart}
                            >
                                <FontAwesomeIcon icon={faTrash} className="me-2" /> Esvaziar Carrinho
                            </CButton>
                        )}
                    </div>
                    {cartItems.length === 0 ? (
                        <div className="text-center py-5 border border-dark bg-white">
                            <h3 className="text-dark mb-3">Seu carrinho está vazio</h3>
                            <p className="text-muted">Nenhuma pelúcia adicionada ainda.</p>
                            <Link to="/" className="btn btn-dark rounded-0 mt-2">
                                Ver Pelúcias
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex align-items-center border border-dark p-3 mb-3 bg-white"
                            >
                                <div
                                    className="border border-dark d-flex justify-content-center align-items-center me-4 bg-light overflow-hidden"
                                    style={{ width: '80px', height: '80px' }}
                                >
                                    <img
                                        src={item.picture}
                                        alt={item.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <span className="text-dark fw-medium d-block">{item.name}</span>
                                    <small className="text-muted">{formatCurrency(item.price)} un.</small>
                                </div>
                                <div className="d-flex align-items-center border border-dark me-4 bg-light">
                                    <CButton
                                        className="btn btn-light border-0 rounded-0 px-3 bg-transparent d-flex align-items-center justify-content-center"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        style={{ height: '36px' }}
                                    >
                                        <FontAwesomeIcon icon={faMinus} style={{ fontSize: '12px' }} />
                                    </CButton>
                                    <div
                                        className="px-3 border-start border-end border-dark bg-white d-flex justify-content-center align-items-center"
                                        style={{ width: '40px', height: '36px' }}
                                    >
                                        {item.quantity}
                                    </div>
                                    <CButton
                                        className="btn btn-light border-0 rounded-0 px-3 bg-transparent d-flex align-items-center justify-content-center"
                                        onClick={() => updateQuantity(item.id, 1)}
                                        style={{ height: '36px' }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '12px' }} />
                                    </CButton>
                                </div>
                                <CButton
                                    className="btn btn-link text-dark p-2 d-flex align-items-center justify-content-center border-0"
                                    onClick={() => removeItem(item.id, item.name)}
                                    title={`Remover ${item.name}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: '20px' }} />
                                </CButton>
                            </div>
                        ))
                    )}
                </CCol>
                {/* Resumo da compra */}
                <CCol xs={12} md={5} lg={4}>
                    <div className="border border-dark p-4 bg-white mb-3 mt-md-5">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-dark">Subtotal:</span>
                            <span className="text-dark fw-medium">{formatCurrency(subtotal)}</span>
                        </div>
                        {discountRate > 0 && (
                            <div className="d-flex justify-content-between mb-3 text-success">
                                <span>Desconto (10%):</span>
                                <span className="fw-medium">- {formatCurrency(discountAmount)}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mb-4">
                            <span className="text-dark">Frete:</span>
                            <span className="text-dark fw-medium">
                                {cartItems.length > 0 ? formatCurrency(shippingCost) : formatCurrency(0)}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mb-4 fw-bold border-top border-dark pt-3">
                            <span className="text-dark">Total:</span>
                            <span className="text-dark">{formatCurrency(total)}</span>
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-dark" style={{ fontSize: '14px' }}>
                                Cupom de Desconto: <small className="text-muted">(Dica: UTFPR10)</small>
                            </label>
                            <div className="d-flex gap-2">
                                <CFormInput
                                    type="text"
                                    className="form-control border-dark rounded-0 shadow-none text-uppercase"
                                    placeholder="CUPOM10"
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value)}
                                    disabled={cartItems.length === 0}
                                />
                                <CButton
                                    className="btn btn-dark rounded-0 px-3"
                                    onClick={handleApplyCoupon}
                                    disabled={cartItems.length === 0}
                                >
                                    Aplicar
                                </CButton>
                            </div>
                        </div>
                        <CButton
                            className="btn w-100 border border-dark text-dark rounded-0 fw-medium"
                            style={{ backgroundColor: '#dce0e3' }}
                            disabled={cartItems.length === 0}
                            onClick={() => {
                                let usuarioLogado = localStorage.getItem('currentUser');
                                if (!usuarioLogado) {
                                    window.dispatchEvent(new Event('openLoginModal'));
                                } else {
                                    localStorage.setItem("cart", JSON.stringify([]));
                                    window.location.href = "/";
                                }
                            }}
                        >
                            FINALIZAR COMPRA
                        </CButton>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/" className="text-dark text-decoration-none" style={{ fontSize: '14px' }}>
                            Continuar Comprando
                        </Link>
                    </div>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default CartPage