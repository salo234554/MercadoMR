import React, { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Container from "~/components/layouts/Container";
import DetailDefault from "~/components/elements/detail/DetailDefault";
import useGetProducts from "~/hooks/useGetProducts";
import MyPosts from "./myposts";
import SortByPosts from "../../components/partials/shop/modules/SortByPosts";
import { Box, Grid, Button } from "@mui/material";
import LateralMenu from "../../pages/LateralMenu";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getCloseMenu } from "../../store/closemenu/action";
import { getMenuPublication } from "../../store/menupublication/action";
import { getDuplicarPrd } from "../../store/duplicarprd/action";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

const index = () => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const irA = useRef(null);
    const { id } = Router.query;
    const { loading, product, getPublicatById } = useGetProducts();
    //console.log("DATOS PRODUCTO : ", product);

    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("contImgMisCompras");
    const [sombraOpenTres, setSombraOpenTres] = useState("productComprado");
    const [sombraOpenCuatro, setSombraOpenCuatro] = useState(
        "precioProductMisCompras"
    );
    const [fondoInput, setFondoInput] = useState(
        "input-group inputbuscarposts"
    );
    const [controlImg, setControlImg] = useState("");
    const [sizeMenu, setSizeMenu] = useState("menulatpublicacion");
    const [disabledImg, setDisabledImg] = useState("menulatpublicacion");

    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [datosBuscar, setDatosBuscar] = useState(null);
    const [numeroPublicaciones, setNumeroPublicaciones] = useState(0);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [orderPrice, setOrderPrice] = useState(0);
    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const activausermenuprimary = useSelector(
        (state) => state.usermenu.usermenuprimary
    );
    const closemenu = useSelector((state) => state.closemenu.closemenu);
    const menupublication = useSelector(
        (state) => state.menupublication.menupublication
    );
    const numpagina = useSelector((state) => state.pageselect.pageselect);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Mis publicaciones");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    }, [datosusuarios]);
    
    useEffect(() => {
        setTimeout(() => {
            irA.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    }, []);

    useEffect(() => {
        let numpag = (numeroPublicaciones / 10 + 0.5).toFixed(0);
        let arraypg = [];
        for (var i = 1; i <= numpag; i++) {
            arraypg.push(i);
        }
        dispatch(getNumberPages(arraypg));
        dispatch(getPageSelect(1));
    }, [numeroPublicaciones]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <DetailDefault product={product} />;
    }

    const breadcrumb = [
        {
            id: 1,
            text: "Inicio",
            url: "/",
        },
        {
            id: 2,
            text: "Tienda",
            url: "/shop",
        },
        {
            id: 3,
            text: nombreProducto,
        },
    ];

    const tituloOnChange = (e) => {
        var strLength = e.length;
        setDatosBuscar(e);
    };

    function handleSubmit(e) {
        //console.log("ON CLICK : ", datosBuscar);
    }

    const newPost = () => {
        dispatch(getDuplicarPrd(0));
        localStorage.setItem("accion", JSON.stringify("Crear Producto"));
        Router.push("/CreateProduct/createproduct");
    };

    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("contImgMisCompras");
        setSombraOpenTres("productComprado");
        setSombraOpenCuatro("precioProductMisCompras");
        setDisabledImg("");
        setControlImg("");
        setFondoInput("input-group inputbuscarposts");
    }, [activausermenu, activausermenuprimary]);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("contImgMisCompras");
            setSombraOpenTres("productComprado");
            setSombraOpenCuatro("precioProductMisCompras");
            setFondoInput("input-group inputbuscarposts");
            setDisabledImg("");
            setControlImg("");
            dispatch(getCloseMenu(false));
            dispatch(getMenuPublication(1));
        }
    }, [closemenu]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        //if (filteredCompras.length == 0)

        //else setSombraOpen("disablemyaccountcuatro");
        // setSombraOpenDos("SubcontainerMisDatosDisabled");
        setSombraOpenDos("contImgMisComprasDisabled");
        setSombraOpenTres("productCompradoDisabled");
        setSombraOpenCuatro("precioProductMisComprasDisabled");
        setControlImg("disabledimg");
        dispatch(getUserMenuPrimary(false));
    };

    useEffect(() => {
        if (closeOpen) {
            setDisabledImg("menulatpublicacion0");
            dispatch(getMenuPublication(1));
        } else {
            setDisabledImg(sizeMenu);
            dispatch(getMenuPublication(0));
        }
    }, [closeOpen]);

    useEffect(() => {
        if (closeOpen) {
            if (numeroPublicaciones >= 0 && numeroPublicaciones <= 10) {
                setSombraOpen("disablemyaccountcuatro4 !h-[700px]");
            } else {
                setSombraOpen("disablemyaccountcuatro4 !h-auto");
            }
        }
    }, [closeOpen, numeroPublicaciones]);

    useEffect(() => {
        if (menupublication == 1) {
            setFondoInput("input-group inputbuscarpostsdisable");
        } else {
            setFondoInput("input-group inputbuscarposts");
        }
    }, [menupublication]);

    return (
        <Container title="Product">
            <div
                className="ps-page ps-page--product overflow-x-hidden"
                ref={irA}>
                <div className="container !px-0">
                    <ModalControlAcceso
                        shown={showModalControlAcceso}
                        close={setShowModalControlAcceso}
                        titulo={tituloControlAcceso}
                        mensaje={textoControlAcceso}
                        tipo="1"
                    />
                    <Grid
                        container
                        sx={{
                            margin: "18px 0",
                            width: "100%",
                            justifyContent: {
                                xs: "space-between",
                                sm: "flex-start",
                            },
                        }}
                        spacing={1}>
                        <Grid item md="auto" lg="auto" className="menuNoneFer">
                            <Button
                                variant="outline-light"
                                onClick={() => closeOpenMenu()}
                                style={{
                                    backgroundColor: "transparent",
                                    position: "static",
                                    display: "block",
                                }}>
                                <div className={disabledImg}>
                                    <MenuIcon className="menuproperty" />
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                            <div className="titulopublicaciones">
                                Mis Publicaciones
                            </div>
                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: {
                                    xs: "flex-start",
                                    sm: "flex-end",
                                },
                            }}
                            item
                            xs={12}
                            sm={5}
                            md={5}
                            lg={4}
                            className="!pl-[22px] pr-[15px]"
                            onClick={() => newPost()}>
                            <div className="newposts">
                                <a>
                                    Nueva publicación
                                    <i
                                        className="iconoadd fa fa-plus-circle"
                                        aria-hidden="true"></i>
                                </a>
                            </div>
                        </Grid>
                        <Grid container spacing={1} className="w-full">
                            <Grid item xs={12} md={12} lg={12}>
                                <div className="mtmenos10">
                                    {closeOpen ? (
                                        <LateralMenu
                                            style={{ marginTop: "-41px" }}
                                        />
                                    ) : null}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <div className={sombraOpen}>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                margin: "20px 0 40px 0",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                            className="tamañosFer">
                            <Grid item xs={12} sm={5} md={3}>
                                <div className="mtmenos20">
                                    <SortByPosts
                                        orderPrice={orderPrice}
                                        setOrderPrice={setOrderPrice}
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                sm={7}
                                md={5}
                                className="pr-[15px]">
                                <div>
                                    <input
                                        className={fondoInput}
                                        onChange={(e) =>
                                            tituloOnChange(e.target.value)
                                        }
                                        value={datosBuscar}
                                        type="text"
                                    />
                                    <div className="iconobuscarpost">
                                        <a
                                            href="#"
                                            onClick={(e) => handleSubmit(e)}>
                                            <i
                                                className="fa fa-search"
                                                aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={7}
                                md={4}
                                className="pr-[15px]">
                                <div className="numeroprodmyposts">
                                    Número de publicaciones:{" "}
                                    {numeroPublicaciones}
                                </div>
                            </Grid>
                        </Grid>

                        <div className="ps-page__content mtmenos50 min-h-[650px]">
                            <div>
                                <div className="ps-layout__right">
                                    <MyPosts
                                        setNumeroPublicaciones={
                                            setNumeroPublicaciones
                                        }
                                        orderPrice={orderPrice}
                                        setOrderPrice={setOrderPrice}
                                        datosBuscar={datosBuscar}
                                        setDatosBuscar={setDatosBuscar}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default index;
