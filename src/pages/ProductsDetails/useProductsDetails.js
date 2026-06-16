import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export const useProductsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [cep, setCep] = useState("");
    const [cepError, setCepError] = useState(null)
    const [shippingInfo, setShippingInfo] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [quantity, setQuantity] = useState(1);
    // Buscar produto
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/produtos.json");
            const allProducts = response.data;
            const foundProduct = allProducts.find(
                item => item.cod_product === Number(id)
            );
            if (foundProduct) {
                setProduct(foundProduct);
                setSelectedImage(foundProduct.picture);
            } else {
                alert("Produto não encontrado");
            }
            await new Promise(resolve => setTimeout(resolve, 300)); // Pequeno delay visual
        }
        catch (error) {
            console.error("Erro ao buscar dados do produto:", error);
        }
        finally {
            setLoading(false);
        }
    };
    // Adicionar ao carrinho
    const addToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = currentCart.findIndex(
            item => item.id === product.cod_product
        );
        if (existingItemIndex > -1) {
            currentCart[existingItemIndex].quantity += quantity;
        } else {
            currentCart.push({
                id: product.cod_product,
                name: product.product_name,
                price: product.price,
                picture: product.picture,
                quantity: quantity
            });
        }
        localStorage.setItem("cart", JSON.stringify(currentCart));
        window.dispatchEvent(new Event('cartUpdated'));
        Swal.fire({
            title: 'Sucesso!',
            text: 'Produto adicionado ao carrinho.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    };
    // Calculo fake do frete
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
            const shippingValue = Math.floor(Math.random() * 25) + 10;
            const shippingDays = Math.floor(Math.random() * 7) + 2;
            setShippingInfo({
                city: response.data.localidade,
                state: response.data.uf,
                price: shippingValue,
                days: shippingDays
            });
        }
        catch (error) {
            console.error(error);
            setCepError("Erro ao calcular frete");
        }
        finally {
            setLoadingAddress(false);
        }
    };
    // Popular tela
    useEffect(() => {
        fetchProduct();
    }, [id]);

    const originalPrice = useMemo(() => {
        return (Number(product?.price) * 1.25).toFixed(2).replace(".", ",");
    }, [product.price]);

    const stock = useMemo(() => {
        return Math.floor(Math.random() * 30) + 10;
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return {
        product, loading, selectedImage, setSelectedImage, cep, setCep,
        cepError, shippingInfo, loadingAddress, calculateShipping,
        addToCart, originalPrice, stock, formatCurrency, quantity, setQuantity
    }
}