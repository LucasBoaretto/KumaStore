import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useCartPage = () => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            return JSON.parse(savedCart);
        } else {
            return [];
        }
    });
    const [couponInput, setCouponInput] = useState("");
    const [discountRate, setDiscountRate] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const shippingCost = 15.00;
    // Atualizar localstorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
        window.dispatchEvent(new Event('cartUpdated'));
    }, [cartItems]);
    // Calcular valores
    useEffect(() => {
        let soma = 0;
        cartItems.forEach(item => {
            soma = soma + (item.price * item.quantity);
        });
        setSubtotal(soma);
        let valorDesconto = soma * discountRate;
        setDiscountAmount(valorDesconto);
        if (cartItems.length > 0) {
            let valorFinal = (soma - valorDesconto) + shippingCost;
            setTotal(valorFinal);
        } else {
            setTotal(0);
        }
    }, [cartItems, discountRate]);
    // Alterar quantidade
    const updateQuantity = (id, x) => {
        const carrinhoAtualizado = cartItems.map(item => {
            if (item.id === id) {
                let novaQtd = item.quantity + x;
                if (novaQtd < 1) {
                    novaQtd = 1;
                }
                return { ...item, quantity: novaQtd };
            }
            return item;
        });

        setCartItems(carrinhoAtualizado);
    };
    // Remover item
    const removeItem = (id, productName) => {
        Swal.fire({
            title: "Remover produto?",
            text: `Você tem certeza que deseja remover "${productName}" do seu carrinho?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, remover!",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'rounded-0',
                cancelButton: 'rounded-0'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const itensFiltrados = cartItems.filter(item => item.id !== id);
                setCartItems(itensFiltrados);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produto removido com sucesso!',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        });
    };
    // Limpar carrinho
    const clearCart = () => {
        Swal.fire({
            title: "Esvaziar Carrinho?",
            text: "Todos os produtos serão removidos. Deseja continuar?",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sim, esvaziar!",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: 'rounded-0 border border-dark',
                confirmButton: 'rounded-0',
                cancelButton: 'rounded-0'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setCartItems([]);
                setDiscountRate(0);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Carrinho esvaziado!',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };
    // Cupom
    const handleApplyCoupon = () => {
        const textoCupom = couponInput.toUpperCase();
        if (textoCupom === "UTFPR10" || textoCupom === "CUPOM10") {
            setDiscountRate(0.10);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Cupom aplicado!',
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            setDiscountRate(0);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Cupom inválido',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };
    // Formatar moeda
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return {
        cartItems, updateQuantity, removeItem, clearCart, couponInput, setCouponInput,
        handleApplyCoupon, subtotal, discountAmount, total, formatCurrency, shippingCost
    };
};