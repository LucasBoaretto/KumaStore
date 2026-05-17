import React, { useState } from 'react'
import {
    CAvatar,
    CButton,
    CCol,
    CCollapse,
    CContainer,
    CDropdown,
    CDropdownDivider,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CForm,
    CFormInput,
    CImage,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavbarToggler,
    CNavItem,
    CNavLink,
    CRow,
} from '@coreui/react'
import { Link } from 'react-router'
import { TiltButton } from 'react-tilt-button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import logo from "../../../public/img/urso-teddy.png"

const DefaultHeader = () => {
    const [visible, setVisible] = useState(false)
    return (
        <CNavbar expand="lg" color='light' className='border-bottom py-3'>
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
                    <CFormInput type="search" className="me-2" placeholder="Buscar Ursinhos..." />
                </CCol>
                <CCol md={4} className='d-flex justify-content-end align-items-center'>
                    <div className='me-2'>
                        <FontAwesomeIcon icon={faCartShopping} size='xl' className='me-3' style={{ cursor: 'pointer' }} />
                        <FontAwesomeIcon icon={faUser} size='xl' className='me-3' style={{ cursor: 'pointer' }} />
                    </div>
                </CCol>
            </CRow>
        </CNavbar>
    )
}

export default DefaultHeader