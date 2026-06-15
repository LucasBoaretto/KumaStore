import React, { useState, useEffect } from 'react'
import {
    CCol,
    CFormInput,
    CImage,
    CNavbar,
    CRow,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider
} from '@coreui/react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../LoginPage/RegisterPage'

const DefaultHeader = () => {
    const logo = '/img/homepage/urso-teddy.png'

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    // Novo estado para o usuário logado
    const [currentUser, setCurrentUser] = useState(null);

    // Lê o storage assim que o componente monta (para manter logado no F5)
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    // Funções de transição de Modais
    const openLogin = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const openRegister = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    // Função que o LoginPage vai chamar quando der tudo certo
    const handleLoginSuccess = (user) => {
        setCurrentUser(user);
        setIsLoginModalOpen(false); // Fecha o modal automaticamente
    };

    // Função de Logout
    const handleLogout = () => {
        localStorage.removeItem('currentUser'); // Limpa o storage
        setCurrentUser(null); // Limpa o estado
    };

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
                    <Link to='/categories' className='text-decoration-none text-dark'>Categorias</Link>
                    <Link to='/news' className='text-decoration-none text-dark'>Novidades</Link>
                    <Link to='/promotions' className='text-decoration-none text-dark'>Promoções</Link>
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
                        <Link to='/cart'>
                            <FontAwesomeIcon icon={faCartShopping} size='xl' style={{ cursor: 'pointer' }} color='#5a6e00' />
                        </Link>

                        {/* RENDERIZAÇÃO CONDICIONAL: Logado vs Deslogado */}
                        {currentUser ? (
                            <CDropdown alignment="end">
                                <CDropdownToggle
                                    color="transparent"
                                    // A classe p-0 é o segredo aqui: ela remove o padding fantasma do botão
                                    className="p-0 border-0"
                                    caret={false}
                                    style={{ boxShadow: 'none' }}
                                >
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '32px', // Reduzi levemente de 36px para 32px para harmonizar com o ícone do carrinho
                                            height: '32px',
                                            backgroundColor: '#5a6e00',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem as={Link} to="/profile">Meu Perfil</CDropdownItem>
                                    <CDropdownItem as={Link} to="/orders">Meus Pedidos</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer' }} className="text-danger d-flex align-items-center gap-2">
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        Sair
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        ) : (
                            // Envolvemos o ícone de deslogado em uma div do mesmo tamanho exato da bolinha (32x32)
                            // Isso garante que a área ocupada seja idêntica, impedindo o layout de "pular"
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ width: '32px', height: '32px' }}
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    size='xl'
                                    style={{ cursor: 'pointer' }}
                                    color='#4b4b4bcc'
                                    onClick={openLogin}
                                />
                            </div>
                        )}
                    </div>
                </CCol>
            </CRow>

            <LoginPage
                visible={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSwitchToRegister={openRegister}
                onLoginSuccess={handleLoginSuccess} // Passando a nova função!
            />

            <RegisterPage
                visible={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSwitchToLogin={openLogin}
            />
        </CNavbar>
    )
}

export default DefaultHeader