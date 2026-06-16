import { useEffect, useState } from "react";

export const useDefaultHeader = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        const updateCartBadge = () => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(totalItems);
        };
        const handleCartLoginRequest = () => {
            openLoginModal();
        };
        updateCartBadge();
        window.addEventListener('storage', updateCartBadge);
        window.addEventListener('cartUpdated', updateCartBadge);
        window.addEventListener('openLoginModal', handleCartLoginRequest);

        return () => {
            window.removeEventListener('storage', updateCartBadge);
            window.removeEventListener('cartUpdated', updateCartBadge);
            window.removeEventListener('openLoginModal', handleCartLoginRequest);
        };
    }, []);
    const openLoginModal = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
    };
    const openRegisterModal = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };
    const handleLoginSuccess = (user) => {
        setCurrentUser(user);
        setIsLoginModalOpen(false);
    };
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return {
        isLoginModalOpen, setIsLoginModalOpen, isRegisterModalOpen, setIsRegisterModalOpen,
        currentUser, cartCount, openLoginModal, openRegisterModal, handleLoginSuccess,
        handleLogout
    }
}