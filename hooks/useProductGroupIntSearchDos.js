import React, { useEffect, useRef, useState } from "react";
import Product from "~/components/elements/products/Product";
import ProductPhotoSearch from "~/components/elements/products/ProductPhotoSearch";
import ProductResults from "~/components/elements/products/ProductResults";
import ProductSearchView from "../components/elements/products/ProductSearchView";
import ProductSearchViewInteractiveSearch from "../components/elements/products/ProductSearchViewInteractiveSearch";
import ProductListPhotoImageSearchDos from "../components/elements/products/ProductListPhotoImageSearchDos";
import ProductResultsDos from "~/components/elements/products/ProductResultsDos";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import ProductGridWithDetail from "~/components/elements/products/ProductGridWithDetail";
import ProductListPhotoImageView from "~/components/elements/products/ProductListPhotoImageView";
import ProductListPosts from "~/components/elements/products/ProductListPosts";
import SkeletonProductHorizontal from "~/components/elements/skeletons/SkeletonProductHorizontal";
import { Swiper, SwiperSlide } from "swiper/react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled as muiStyled } from '@mui/material/styles';
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";
import SwiperCarousel from "~/components/elements/carousel/SwiperCarousel";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Element, scroller } from "react-scroll";
import { useRouter } from "next/router"
import { getPageSelectPublication } from "../store/pageselectpublication/action";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// install Swiper modules
SwiperCore.use([Navigation]);

export default function useProductGroupIntSearchDos() {
    const themee = createTheme({
        breakpoints: {
            values: {
                xs: 0,     // 0 - 399px
                sm: 500,   // 400 - 767px
                md: 900   // 768 - 1023px
                // 1440px en adelante
            },
        },
    })
    const numpagpublication = useSelector(
        (state) => state.pageselectpublication.pageselectpublication
    );
    const dispatch = useDispatch();
    const [page, setPage] = useState(numpagpublication);
    const lologra = useRef(null); // 
    const theme = useTheme();
    const router = useRouter();
    const [referrer, setReferrer] = useState(null);  //
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const numpagina = useSelector(
        (state) => state.pageselect.pageselect
    );
    //Verifica el referrer en la consola

    //Recuperar la página guardada solo cuando venimos de la vista de detalle
    useEffect(() => {
        const url = sessionStorage.getItem('urlProduct');
        const cameFromProductPage = localStorage.getItem('cameFromProductPage');
        const urlCali = sessionStorage.getItem('urlCalificacion');
        const urlEstadisticas = sessionStorage.getItem('urlEstadisticas');
        const cameFromCaliPage = localStorage.getItem('cameFromCalificacionPage');
        const cameFromEstadisticasPage = localStorage.getItem('cameFromEstadisticasPage');

        if ((cameFromProductPage == "true" && url && url.includes('/product/')) ||
            (cameFromCaliPage == "true" && urlCali && urlCali.includes('/MisVentas/calificacionProducto')) ||
            (cameFromEstadisticasPage == "true" && urlEstadisticas && urlEstadisticas.includes('/publication/viewstats'))
        ) {

            // Si la URL contiene '/product/', significa que venimos de la vista de detalle
            const paginaGuardada = sessionStorage.getItem('paginaActualPu');
            if (paginaGuardada) {
                setPage(Number(paginaGuardada)); // Recuperamos la página guardada

            }

            localStorage.removeItem('cameFromProductPage');
            localStorage.removeItem('cameFromCalificacionPage');
            localStorage.removeItem('cameFromEstadisticasPage');
        } else {
            sessionStorage.removeItem('paginaActualPu'); // Limpiamos la página guardada si no venimos de la vista de detalle
            setPage(1); // Reiniciamos la página a 1 si no venimos de la vista de detalle
            //dispatch(getPageSelectPublication(1));
        }
    }, []);

    // Guardar la página cuando estamos en la vista de lista y cambiamos la página
    useEffect(() => {
        // Solo guardar la página si estamos en la vista de lista y el usuario cambió de página
        // Guardamos la página solo si venimos de /publication (vista de lista)
        sessionStorage.setItem('paginaActualPu', page);
        // Hacer scroll suave hacia el contenedor
        if (lologra.current) {
            lologra.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [page]);

    return {
        withCarousel: (source, loading, setting) => {
            let carousel;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Product product={item} />
                        </SwiperSlide>
                    ));

                    carousel = (
                        <SwiperCarousel setting={setting ? setting : undefined}>
                            {items}
                        </SwiperCarousel>
                    );
                } else {
                    carousel = <p>No hay resultados para tu busqueda.</p>;
                }
            } else {
                const skeletons = generateTempArray(2).map((item) => (
                    <div className=" col-6" key={item}></div>
                ));
                carousel = <div className="row">{skeletons}</div>;
            }
            return carousel;
        },
        withGrid: (source, loading, columns = 5) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    console.log("Cantidad de columnas:", columns); // <-- Aquí el log
                    const items = source?.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductSearchViewInteractiveSearch product={item} />
                        </div>
                    ));
                    const dataColumns = columns === 6 ? 4 : columns; // <-- Aquí el ajuste
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items"
                            data-columns={dataColumns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>Producto no encontrado.</p>;
                }
            } else {
                const items = generateTempArray(columns * 2).map((item) => (
                    <div key={item} className="ps-layout__item">
                        <SkeletonProduct />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--grid ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withGridDos: (source, loading, columns = 5) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="pl-15 ps-layout__item" key={item.id}>
                            <ProductResultsDos product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items"
                            data-columns={columns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>Producto no encontrado.</p>;
                }
            } else {
                const items = generateTempArray(columns * 2).map((item) => (
                    <div key={item} className="ps-layout__item">
                        <SkeletonProduct />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--grid ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withGridDetail: (source, loading, columns = 5) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductGridWithDetail product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items with-skeleton"
                            data-columns={columns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>Producto no encontrado.</p>;
                }
            } else {
                const items = generateTempArray(columns * 2).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProduct />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--grid ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withList: (source, loading, columns = 4) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source?.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductListPhotoImageSearchDos product={item} />
                        </div>
                    ));
                    view = (
                        <div className="ps-layout--list ps-shop-items">
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados de la busqueda.</p>;
                }
            } else {
                const items = generateTempArray(columns).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProductHorizontal />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--list ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withListView: (source, loading, columns = 4) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductListPhotoImageView product={item} />

                        </div>
                    ));
                    view = (
                        <div className="ps-layout--list ps-shop-items">
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados de la busqueda.</p>;
                }
            } else {
                const items = generateTempArray(columns).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProductHorizontal />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--list ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withListPosts: (source, loading, columns = 4) => {

            const itemsPerPage = isMdDown ? 6 : 10;


            // Lógica de paginación
            const handleChange = (event, value) => {
                setPage(value);

            };

            const totalPages = Math.ceil(source.length / itemsPerPage);
            const startIndex = (page - 1) * itemsPerPage;
            const paginatedMovimientos = source.slice(startIndex, startIndex + itemsPerPage);
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    if (numpagina == 1) {
                        const items = paginatedMovimientos.map((item, index) => (
                            index <= 9 ?
                                <ThemeProvider theme={themee} key={item.id}>
                                    <Grid item xs={12} sm={6} md={12} className="no-transition">
                                        <ProductListPosts product={item} />
                                    </Grid>
                                </ThemeProvider>
                                :
                                null
                        ));
                        view = (
                            <div ref={lologra} >
                                <Grid container className="tamañosFer2">
                                    {items}
                                    <div className="flex justify-center w-full">
                                        <Stack spacing={2} alignItems="center" mt={2}>
                                            <StyledPagination
                                                count={totalPages}
                                                page={page}
                                                onChange={handleChange}
                                                variant="outlined"
                                                shape="rounded"
                                            />
                                        </Stack>
                                    </div>
                                </Grid>
                            </div>
                        );
                    } else
                        if (numpagina == 2) {
                            const items = source.map((item, index) => (
                                index > 9 && index <= 19 ?
                                    <Grid item>
                                        <ProductListPosts product={item} />
                                    </Grid>
                                    :
                                    null
                            ));
                            view = (
                                <Grid container >
                                    {items}
                                </Grid>
                            );
                        }
                        else
                            if (numpagina == 3) {
                                const items = source.map((item, index) => (
                                    index > 19 && index <= 29 ?
                                        <Grid item key={item.id}>
                                            <ProductListPosts product={item} />
                                        </Grid>
                                        :
                                        null
                                ));
                                view = (
                                    <Grid container>
                                        {items}
                                    </Grid>
                                );
                            }
                            else
                                if (numpagina == 4) {
                                    const items = source.map((item, index) => (
                                        index > 29 && index <= 39 ?
                                            <Grid item xs={12} sm={6} key={item.id}>
                                                <ProductListPosts product={item} />
                                            </Grid>
                                            :
                                            null
                                    ));
                                    view = (
                                        <Grid container>
                                            {items}
                                        </Grid>
                                    );
                                }

                } else {
                    view = <p>No hay resultados de la busqueda.</p>;
                }
            } else {
                const items = generateTempArray(columns).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProductHorizontal />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--list ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
    };
}

const StyledPagination = muiStyled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        border: "none",
        backgroundColor: 'transparent', // Sin fondo por defecto
        color: '#2D2E83', // Color azul para los números no seleccionados
        borderRadius: '0', // Sin borde redondeado para los números no seleccionados
        width: '32px',
        height: '32px',
        minWidth: '32px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        '&.Mui-selected': {
            backgroundColor: '#2D2E83', // Fondo azul para el número seleccionado
            color: 'white', // Texto blanco en el número seleccionado
            borderRadius: '50%', // Bordes redondeados en la página seleccionada
            fontWeight: 'bold', // Hacerlo más destacado
        },
        [theme.breakpoints.down('sm')]: {
            width: '26px',
            height: '26px',
            minWidth: '26px',
            fontSize: '1rem',
        },
    },
    '& .MuiPaginationItem-ellipsis': {
        backgroundColor: 'transparent', // Sin fondo en elipsis
        color: '#2D2E83', // Color azul para elipsis
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            width: '26px',
            height: '26px',
            fontSize: '0.75rem',
        },
    },
    // Estilos para los botones "previous" y "next"
    '& .MuiPaginationItem-previousNext': {
        backgroundColor: 'transparent',
        color: '#2D2E83', // azul
        borderRadius: '0', // sin círculos
        fontSize: '1.7rem', // tamaño más grande
        minWidth: 'auto',
        width: 'auto',
        height: 'auto',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.4rem',
        },
    },
}));
