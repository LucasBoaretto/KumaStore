import React, { useState, useEffect } from 'react'
import { CCol, CFormInput, CImage, CNavbar, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import RegisterModal from '../../components/LoginModal/RegisterModal'
import LoginModal from '../../components/LoginModal/LoginModal'
import { useDefaultHeader } from './useDefaultHeader'

const DefaultHeader = () => {
    const logo = '/img/homepage/urso-teddy.png'

    const { isLoginModalOpen, setIsLoginModalOpen, isRegisterModalOpen, setIsRegisterModalOpen,
        currentUser, cartCount, openLoginModal, openRegisterModal, handleLoginSuccess,
        handleLogout
    } = useDefaultHeader();

    return (
        <CNavbar
            expand="lg"
            className="custom-navbar py-3"
        >
            <CRow className='w-100 ms-2'>
                <CCol md={4} className='d-flex flex-row gap-3 align-items-center'>
                    <Link to='/'>
                        <CImage src={logo} alt='logo' width={32} height={32} />
                    </Link>
                    {/* Como não vou implementar vai ficar desabilitado */}
                    <Link
                        to='/categories'
                        className='text-decoration-none text-muted pe-none'
                        onClick={(e) => e.preventDefault()}
                        style={{ cursor: 'not-allowed' }}
                    >Categorias</Link>
                    <Link
                        to='/news'
                        className='text-decoration-none text-muted pe-none'
                        onClick={(e) => e.preventDefault()}
                        style={{ cursor: 'not-allowed' }}
                    >
                        Novidades
                    </Link>
                    <Link
                        to='/promotions'
                        className='text-decoration-none text-muted pe-none'
                        onClick={(e) => e.preventDefault()}
                        style={{ cursor: 'not-allowed' }}
                    >
                        Promoções
                    </Link>
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="search"
                        className="search-input"
                        placeholder="Buscar Ursinhos..."
                    />
                </CCol>
                <CCol md={4} className='d-flex justify-content-end align-items-center'>
                    <div className='me-2 d-flex align-items-center gap-3'>
                        {/* Carrinho */}
                        <Link to='/cart' className="position-relative text-decoration-none" style={{ display: 'inline-block', padding: '5px' }} title='Carrinho de compras'>
                            <FontAwesomeIcon icon={faCartShopping} size='xl' style={{ cursor: 'pointer' }} color='#722a00d4' />
                            {cartCount > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: '0.65rem' }}
                                >
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>
                        {/* Usuario */}
                        {currentUser ? (
                            <CDropdown alignment="end" title={currentUser.name}>
                                <CDropdownToggle
                                    color="transparent"
                                    className="p-0 border-0"
                                    caret={false}
                                    style={{ boxShadow: 'none' }}
                                >
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            backgroundColor: '#c74900',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem disabled readOnly className='text-decoration-none'>Meu Perfil</CDropdownItem>
                                    <CDropdownItem disabled readOnly className='text-decoration-none'>Meus Pedidos</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer' }} className="text-danger d-flex align-items-center gap-2">
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        Sair
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        ) : (
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ width: '32px', height: '32px' }} title='Login'
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    size='xl'
                                    style={{ cursor: 'pointer' }}
                                    color='#722a00d4'
                                    onClick={openLoginModal}
                                />
                            </div>
                        )}
                    </div>
                </CCol>
            </CRow>
            <LoginModal
                visible={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSwitchToRegister={openRegisterModal}
                onLoginSuccess={handleLoginSuccess}
            />
            <RegisterModal
                visible={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSwitchToLogin={openLoginModal}
            />
        </CNavbar>
    )
}

export default DefaultHeader