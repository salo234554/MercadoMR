import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ContainerPrd from "../../components/layouts/ContainerPrd";
import ModalMensajesWishList from "../../pages/mensajes/ModalMensajesWishList";
import InfoViewPrdSingle from "~/components/shared/widgets/InfoViewPrdSingle";
import SingleProductView from "~/components/elements/detail/SingleProductView";
import WidgetShopRelatedProducts from "~/components/shared/widgets/WidgetShopRelatedProducts";
import WidgetShopPromotion from "~/components/shared/widgets/WidgetShopPromotion";
import CustomerBought from "~/components/partials/products/CustomerBought";
import useGetProducts from "~/hooks/useGetProducts";
import FooterDefault from "../../components/shared/footers/FooterDefault";
import { Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { useSelector, useDispatch } from "react-redux";

const localTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 1037, // Cambiamos md para que empiece desde 1100px
            lg: 1200,
            xl: 1536,
        },
    },
});
const ProductDetailPage = () => {
    const dispatch = useDispatch();
    const Router = useRouter();
    const { id } = Router.query;
    const { loading, product, getProductById, getPublicatById } =
        useGetProducts();
    //console.log("DATOS PRODUCTO : ", product);
    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [irInicio, setIrInicio] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    useEffect(() => {
        sessionStorage.setItem("urlProduct", Router.pathname);
        localStorage.setItem("cameFromProductPage", "true");
        localStorage.setItem("cameFromProductPage2", "true");
        dispatch(getViewVehPrd(1));
    }, []);

    useEffect(() => {
        if (id) {
            if (id > 0) getProductById(id);
            else getPublicatById(id);
        }

        let okwishlist = JSON.parse(localStorage.getItem("itemswishlistadd"));
        if (okwishlist == "Ok") {
            localStorage.setItem("itemswishlistadd", JSON.stringify(null));
            setShowModalMensajes(true);
            setTituloMensajes("Lista de deseos");
            let texto = "Producto agregado a lista de deseo";
            setTextoMensajes(texto);
        }
    }, [id]);

    useEffect(() => {
        if (product) setNombreProducto(product.name);
        setIrInicio(true);
    }, [product]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <SingleProductView product={product} />;
    }

    const breadcrumb = [
        {
            id: 1,
            text: "Inicio",
            url: "/",
        },
        {
            id: 2,
            text: "Resultados Busqueda",
            url: "/search",
        },
        {
            id: 3,
            text: nombreProducto,
        },
    ];

    const handleClickScroll = () => {
        const element = document.getElementById("section-1");
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIrInicio(false);
    };

    useEffect(() => {
        if (irInicio) {
            handleClickScroll();
        }
    }, [irInicio]);

    return (
        <ContainerPrd title="Product">
            <div className="ps-page ps-page--product" id="section-1">
                <ModalMensajesWishList
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <div className="container">
                    <div className="ps-page__header ml-51">
                        {
                            //<BreadCrumb breacrumb={breadcrumb} />
                        }
                    </div>
                    <ThemeProvider theme={localTheme}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={9} md={9.7}>
                                {productView}
                            </Grid>
                            <Grid item xs={12} sm={3} md={2.3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <InfoViewPrdSingle />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <WidgetShopRelatedProducts />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </div>
            </div>
            {/*
<div className="margenfooterproductview">
                <FooterDefault />
            </div>
    */}
        </ContainerPrd>
    );
};

export default ProductDetailPage;
