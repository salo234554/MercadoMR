import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { URL_IMAGES_RESULTSSMS } from "../../../helpers/Constants";
import { useDispatch, useSelector } from "react-redux";
import { getCtlrInput } from "~/store/ctlrinput/action";
import LeftBarMobile from "~/components/elements/header/modules/LeftBarMobile";
import { Drawer, Box, useMediaQuery, useTheme, Grid } from '@mui/material';
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { getIraComprar } from "../../../store/iracomprar/action";

const FooterDefault = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const openclosecity = useSelector(
        (state) => state.openclosecity.openclosecity
    );
    const [classCity, setClassCity] = useState("FooterWebPage");
    const messagesRef = useRef(null);

    const theme = useTheme();

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [activeView, setActiveView] = useState('main'); // <-- aquí arriba también

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const getDrawerWidth = () => {
        if (isXs) return '85%';
        if (isSm) return '60%';
        if (isMd) return '50%';
        return 0;
    };

    const handleOpenCategorias = () => {
        setActiveView('categorias'); // Cambia la vista antes
        setDrawerOpen(true);         // Abre el drawer
    };

    const handleToggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    // Asignamos Datos al arreglo de Usuarios desde el state

    useEffect(() => {
        if (openclosecity == 1) {
            setClassCity("FooterWebPageOpenCity");
        } else if (openclosecity == 2) {
            setClassCity("FooterWebPageOpenCityDos");
        } else {
            setClassCity("FooterWebPage");
        }
    }, [openclosecity]);

    const handleClick = () => {
        dispatch(getCtlrInput(true));
    };

    const locationComprar = () => {
        router.push("/");
        dispatch(getIraComprar(true));
    }

    useEffect(() => {
        if (isLgUp && isDrawerOpen) {
            setDrawerOpen(false);
        }
    }, [isLgUp, isDrawerOpen]);



    const handleIr = (path) => {
        localStorage.removeItem('inputdata');
        localStorage.removeItem('placeholdersearch');
        router.push(path); 
    };

    return (
        <div>
            <footer className={classCity}>
                <Grid
                    container
                    style={{ width: "100%" }}
                    className="SubFooterWebPage">
                    <div className="SubcMainFooter">
                        <div className="footerDataMain">
                            <p>
                                HAZ PARTE DE NUESTRO <br /> EQUIPO
                            </p>
                            <div className="footerData">
                                <span onClick={() => handleIr('/my-account')}>
                                    Registrarme
                                </span>
                                {
                                    /*
                                        .then(() =>window.location.reload()) //Reload Registra
                                        .then(() => window.location.reload())//Reload Iniciar sesion
                                    */
                                }
                                <span onClick={() => handleIr('/loginaccount')}>
                                    Iniciar sesión
                                </span>
                                <span onClick={() => handleIr('/CreateProduct/createproduct')}>
                                    Vender
                                </span>
                                <span
                                    onClick={() => locationComprar()}>
                                    Comprar
                                </span>
                            </div>
                        </div>

                        <div className="footerDataMain ">
                            <p>AYUDA</p>
                            <div className="footerData2">
                                {
                                    /*
                                    <span
                                    onClick={() =>
                                        router.push({
                                            pathname: "/ResolverDudas",
                                        })
                                    }>
                                    Necesito ayuda
                                </span>
                                    */
                                }
                                <span onClick={() => handleIr('/PQR')}>
                                    PQRS
                                </span>
                                <span onClick={() => handleIr('/ResolverDudas')}>
                                    Centro de ayuda
                                </span>
                                <span>Terminos y condiciones</span>
                                <span>Tratamiento de datos</span>
                            </div>
                        </div>

                        <div className="footerDataMain">
                            <p>SECCIONES POPULARES</p>
                            <div className="footerData2">
                                <span onClick={() => handleIr('/searchinteractive/searchinteractive')}>
                                    Buscador interactivo{" "}
                                </span>
                                <span onClick={() => handleIr('/CreateProduct/createproduct')}>
                                    Vender
                                </span>
                                <span
                                    onClick={() => locationComprar()}>
                                    Comprar
                                </span>
                                <div className="none1050px"
                                    onClick={() => handleClick()}
                                >
                                    <span>Categorías</span>
                                </div>

                                <div className="show1050px"
                                    onClick={handleOpenCategorias}
                                >
                                    <span>Categorías</span>
                                </div>

                            </div>
                        </div>
                        <div className="footerDataMainContactanos footerDataMain">
                            <p>CONTÁCTANOS</p>
                            <div className="footerData2">
                                <span onClick={() => handleIr('/PQR')} >
                                    PQRS
                                </span>
                                <span>Facebook</span>
                                <span>Instagram</span>
                                <span>Tiktok</span>
                                <span>Youtube</span>
                            </div>
                        </div>
                        <div className="footerDataMain footerDataMainIMG">
                            <img
                                src={
                                    URL_IMAGES_RESULTSSMS +
                                    "/imgmr/logomrblanco.png"
                                }
                                alt=""
                            />
                        </div>
                    </div>

                    <Grid
                        container
                        style={{ width: "100%" }}
                        className="SubInfoMediosPagoFooter">
                        <Grid
                            container
                            style={{ width: "90%" }}
                            className="infoContainerFooter"
                            display={"flex"}
                            justifyContent={"space-between"}>
                            <div className="mainMedioPagoFooter">
                                <p>Medios de pago:</p>
                                <div className="medioPagoFooter">
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Efecty.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Nequi.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Mastercard.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/Bancolombia.png"
                                        }
                                        alt=""
                                    />
                                    <img
                                        src={
                                            URL_IMAGES_RESULTSSMS +
                                            "/imgmr/PSE.png"
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="Wompi">
                                <img
                                    src={
                                        URL_IMAGES_RESULTSSMS +
                                        "/imgmr/Wompi.png"
                                    }
                                    alt=""
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        style={{ width: "100%" }}
                        className="DerechosContainerMain">
                        <Grid
                            container
                            style={{ width: "90%" }}
                            className="DerechosContainer"
                            display={"flex"}
                            justifyContent={"center"}>
                            <p>
                                Todos los derechos reservados de Mercado
                                Repuesto 2024©
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </footer>

              <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={handleToggleDrawer}
                    PaperProps={{
                        sx: {
                            width: getDrawerWidth(),
                            transition: "width 0.3s ease",
                            position: "relative",
                            height: "100vh",
                        },
                    }}
                >
                    <div style={{ position: "relative", height: "100%" }}>
                        {/* Ícono fijo dentro del Drawer */}
                        {activeView === 'subcategorias' && (
                            <>
                                <div
                                    className="circuloIconoSuperiorOpiniones"
                                    onClick={() => {
                                        setTimeout(() => {
                                            if (messagesRef.current) {
                                                messagesRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                });
                                            }
                                        }, 100);
                                    }}
                                >
                                    <FaLongArrowAltUp color="#ffffff" />
                                </div> 
                                <div
                                    className="circuloIconoInferiorMsjsBottomLeftBar"
                                    onClick={() => {
                                        setTimeout(() => {
                                            if (messagesRef.current) {
                                                messagesRef.current.scrollTo({
                                                    top: messagesRef.current.scrollHeight,
                                                    behavior: "smooth",
                                                });
                                            }
                                        }, 100);
                                    }}
                                >
                                    <FaLongArrowAltDown color="#ffffff" />
                                </div>
                            </>
                        )}

                        {/* ✅ Aquí va el ref */}
                        <div
                            style={{ height: "100%", overflowY: "auto" }}
                            ref={messagesRef}
                        >
                            <LeftBarMobile
                                close={handleToggleDrawer}
                                activeView={activeView}
                                setActiveView={setActiveView}
                            />
                        </div>
                    </div>
                </Drawer>



        </div>
    );
};

export default FooterDefault;
