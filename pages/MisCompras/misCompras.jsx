import Container from "../../components/layouts/Container";
import {
    Grid,
    useMediaQuery,
    useTheme,
    InputAdornment,
    InputBase,
    Button,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import LateralMenu from "../../pages/LateralMenuMisCompras";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { myNumber } from "../../utilities/ArrayFunctions";
import { getCloseMenu } from "../../store/closemenu/action";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";
import CustomPaginationSearch from "../../components/elements/basic/CustomPaginationSearch";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";
import { IoMenu } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { Drawer } from "@mui/material";
import DrawerLeftMobile from "./DrawerLeftMobile";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled as muiStyled } from "@mui/material/styles";
import { getCtlrLongCadena } from "~/store/ctlrlongcadena/action";

let numeroCompras = 0;
let arrayPrdComprass = [];

export default function misCompras() {
    const [page, setPage] = useState(1);
    const lolograTa = useRef(null); //
    const [UidUser, setUidUser] = useState("");
    const dispatch = useDispatch();
    const [DatosUser, setDatosUser] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("DAT USER MIS COMPRAS : ", datosusuarios);
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const router = useRouter();
    const [compras, setCompras] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("contImgMisCompras");
    const [sombraOpenTres, setSombraOpenTres] = useState("productComprado");
    const [sombraOpenCuatro, setSombraOpenCuatro] = useState(
        "precioProductMisComprasHidde"
    );

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [fondoInput, setFondoInput] = useState("#f1f2f6");
    const [controlImg, setControlImg] = useState("apuntador");
    const [sizeMenu, setSizeMenu] = useState("menulateralseis");
    const [disabledImg, setDisabledImg] = useState("menulateralcuatro");
    //PosiciónTopPage
    const irA = useRef(null);
    const [detallesProducto, setDetallesProducto] = useState(null);

    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const closemenu = useSelector((state) => state.closemenu.closemenu);

    const [paginaInicial, setPaginaInicial] = useState(1);
    const [paginaFinal, setPaginaFinal] = useState(10);
    const numpagina = useSelector((state) => state.pageselect.pageselect);
    const [openDrawer, setOpenDrawer] = useState(false);

    const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [arrayPrdCompras, setArrayPrdCompras] = useState([]);
    const [orderPrice, setOrderPrice] = useState(null);

    let itemsIni = 0;
    let itemsFin = registrosPorPagina;

    const handleOpenDrawer = () => setOpenDrawer(true);
    const handleCloseDrawer = () => setOpenDrawer(false);

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Mis datos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    });

    useEffect(() => {
        let numpag = (numeroCompras / registrosPorPagina).toFixed(0);
        setNumeroPaginas(numpag - 1);

        let arraypg = [];
        for (var i = 1; i <= numpag; i++) {
            arraypg.push(i);
        }
        dispatch(getNumberPages(arraypg));
        dispatch(getPageSelect(1));
        dispatch(getCtlrLongCadena(false));
    }, [numeroCompras]);

    const paginaselect = useSelector((state) => state.pageselect.pageselect);

    useEffect(() => {
        let array = [];

        for (var i = 1; i <= numeroPaginas; i++) {
            if (paginaselect == 1) {
                itemsIni = 0;
                itemsFin = registrosPorPagina;
            } else if (paginaselect == i) {
                itemsIni = registrosPorPagina * i;
                itemsFin = registrosPorPagina * (i + 1);
            }
        }

        if (compras.length > 0) {
            compras &&
                compras.map((row, index) => {
                    if (index >= itemsIni && index <= itemsFin) {
                        array.push(row);
                    }
                });

            setArrayPrdCompras(array);

            irA.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [paginaselect, compras]);

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUser(res.data[0]);
                setUidUser(res.data[0].uid);
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerUidUsuario();
    }, [datosusuarios]);

    const handleSelect = (eventKey) => {
        setPage(1);
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena los productos según la opción seleccionada
        if (eventKey === "Más antiguo") {
            setCompras(
                [...compras].sort(
                    (a, b) => new Date(a.fechacompra) - new Date(b.fechacompra)
                )
            );
        } else if (eventKey === "Más reciente") {
            setCompras(
                [...compras].sort(
                    (a, b) => new Date(b.fechacompra) - new Date(a.fechacompra)
                )
            );
        }
    };

    const CustomDropdownButton = React.forwardRef(
        ({ children, onClick }, ref) => (
            <button
                ref={ref}
                onClick={onClick}
                className="dropdowncustomMiscomprasPersButton">
                {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
            </button>
        )
    );
    //Obtener datos de mis compras

    useEffect(() => {
        const leerMisCompras = async () => {
            let params = {
                uidcomprador: UidUser,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "103",
                params,
            })
                .then(async (res) => {
                    if (res.data && res.data.listarmiscompras) {
                        console.log(
                            "Mis Compras : ",
                            res.data.listarmiscompras
                        );
                        const miscompras = await Promise.all(
                            res.data.listarmiscompras.map(
                                async (compra, index) => {
                                    // Obtén los detalles del producto
                                    //if (index <= 2) {
                                    const detallesProducto =
                                        await obtenerNombreProducto(
                                            compra.idproducto
                                        );
                                    setDetallesProducto(detallesProducto);

                                    // Obtén el nombre del vendedor
                                    //console.log("USUARIOFFFF : ", detallesProducto);
                                    const detallesVendedor =
                                        await obtenerNombreVendedor(
                                            detallesProducto.usuarioVendedor
                                        );

                                    return {
                                        ...compra,
                                        fechacompra: compra.fechacompra.slice(
                                            0,
                                            10
                                        ),
                                        fechaentrega: compra.fechaentrega.slice(
                                            0,
                                            10
                                        ),
                                        fechadespacho:
                                            compra.fechadespacho.slice(0, 10),
                                        fechadepago: compra.fechadepago.slice(
                                            0,
                                            10
                                        ),
                                        nuevoValor:
                                            compra.preciodeventa +
                                            compra.precioenvio,
                                        nombreProducto:
                                            detallesProducto.nombreProducto,
                                        UsuarioVendedor:
                                            detallesProducto.usuarioVendedor,
                                        salePrice: detallesProducto.salePrice,
                                        nombreImagen:
                                            detallesProducto.nombreImagen,
                                        nombreVendedor:
                                            detallesVendedor.nombreVendedor,
                                        apellidoVendedor:
                                            detallesVendedor.apellidoVendedor,
                                    };
                                    //}
                                }
                            )
                        );
                        // Almacena las miscompras en el estado de tu componente
                        setCompras(miscompras);
                        //console.log("COMPRAS xxxx ", miscompras);
                        // Imprime las miscompras en la consola
                        //console.log("miscompras:", miscompras);
                    } else {
                        console.error(
                            "Error: res.data o res.data.listarmiscompras es undefined"
                        );
                    }
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerMisCompras();
    }, [UidUser]);
    //función para obtener datos del producto
    async function obtenerNombreProducto(idprd) {
        let params = {
            idarticulo: idprd,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });

            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;
            const nombreImagen = res.data[0].images[0].name; // Asegúrate de que la imagen exista
            const usuarioVendedor = res.data[0].usuario;

            return { nombreProducto, salePrice, nombreImagen, usuarioVendedor };
        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    //función para obtener el nombre del vendedor
    //función para obtener el nombre y apellido del vendedor
    async function obtenerNombreVendedor(uid) {
        let params = {
            usuario: uid,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });

            const nombreVendedor = res.data[0].primernombre;
            const apellidoVendedor = res.data[0].primerapellido;

            return { nombreVendedor, apellidoVendedor };
        } catch (error) {
            console.error("Error al obtener el nombre del vendedor", error);
        }
    }

    arrayPrdComprass = compras.filter(
        (producto) =>
            producto &&
            producto.nombreProducto &&
            producto.nombreProducto
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    numeroCompras = compras.length;

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    // Función para enviar mensajes
    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("contImgMisCompras");
        setSombraOpenTres("productComprado");
        setSombraOpenCuatro("precioProductMisComprasHidde");
        setDisabledImg("");
        setFondoInput("#f1f2f6");
    }, [activausermenu]);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("contImgMisCompras");
            setSombraOpenTres("productComprado");
            setSombraOpenCuatro("precioProductMisComprasHidde");
            setDisabledImg("");
            setFondoInput("#f1f2f6");
            dispatch(getCloseMenu(false));
        }
    }, [closemenu]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        if (arrayPrdCompras.length == 0)
            setSombraOpen("disablemyaccountcuatro0MisC1");
        else setSombraOpen("disablemyaccountcuatro");

        setSombraOpenDos("contImgMisComprasDisabled");
        setSombraOpenTres("productCompradoDisabled");
        setSombraOpenCuatro("precioProductMisComprasDisabled");
        setControlImg("disabledimg");
        setFondoInput("");
        dispatch(getUserMenuPrimary(false));
    };

    useEffect(() => {
        if (closeOpen) {
            setDisabledImg("menulateralcinco");
        } else {
            setDisabledImg("menulateralcuatro");
            setControlImg("");
        }
    }, [closeOpen]);

    useEffect(() => {
        if (!closeOpen) {
            if (arrayPrdCompras.length == 0) {
                setSizeMenu("menulateralseis");
                setDisabledImg("menulateralseis");
            } else if (arrayPrdCompras.length == 1) {
                setSizeMenu("menulateralseis");
                setDisabledImg("menulateralseis");
            } else if (arrayPrdCompras.length == 2) {
                setSizeMenu("menulateralseis2");
                setDisabledImg("menulateralseis2");
            } else if (arrayPrdCompras.length == 3) {
                setSizeMenu("menulateralseis3");
                setDisabledImg("menulateralseis3");
            } else if (arrayPrdCompras.length == 4) {
                setSizeMenu("menulateralseis4");
                setDisabledImg("menulateralseis4");
            } else if (arrayPrdCompras.length == 5) {
                setSizeMenu("menulateralseis5");
                setDisabledImg("menulateralseis5");
            } else if (arrayPrdCompras.length == 6) {
                setSizeMenu("menulateralseis6");
                setDisabledImg("menulateralseis6");
            } else if (arrayPrdCompras.length == 7) {
                setSizeMenu("menulateralseis7");
                setDisabledImg("menulateralseis7");
            } else if (arrayPrdCompras.length == 8) {
                setSizeMenu("menulateralseis8");
                setDisabledImg("menulateralseis8");
            } else if (arrayPrdCompras.length == 9) {
                setSizeMenu("menulateralseis9");
                setDisabledImg("menulateralseis9");
            } else if (arrayPrdCompras.length == 10) {
                setSizeMenu("menulateralseis10");
                setDisabledImg("menulateralseis10");
            } else if (arrayPrdCompras.length == 11) {
                setSizeMenu("menulateralseis11");
                setDisabledImg("menulateralseis11");
            } else if (arrayPrdCompras.length == 12) {
                setSizeMenu("menulateralseis12");
                setDisabledImg("menulateralseis12");
            } else if (arrayPrdCompras.length == 13) {
                setSizeMenu("menulateralseis13");
                setDisabledImg("menulateralseis13");
            } else if (arrayPrdCompras.length == 14) {
                setSizeMenu("menulateralseis14");
                setDisabledImg("menulateralseis14");
            }
        }
    }, [arrayPrdCompras]);

    const verProduct = (dat) => {
        let ruta = "/product/" + dat.idproducto;
        router.push(ruta);
    };

    const itemsPerPage = isMdDown ? 6 : 10;

    // Lógica de paginación
    const handleChange = (event, value) => {
        setPage(value);
        //localStorage.setItem("pageselectMisCompras", value);
        sessionStorage.setItem("pageselectMisCompras", value);
        setTimeout(() => {
            lolograTa.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    const totalPages = Math.ceil(arrayPrdComprass.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCompras = arrayPrdComprass.slice(startIndex, endIndex);

    useEffect(() => {
        const urlProduct = sessionStorage.getItem("urlProduct");
        const cameFromProductPage = localStorage.getItem("cameFromProductPage");

        const urlVerCompra = sessionStorage.getItem("urlVerCompra");
        const cameFromProductVerCompra = localStorage.getItem(
            "cameFromProductVerCompra"
        );

        const urlMsjComprador = sessionStorage.getItem("urlMsjComprador");
        const cameFromMsjVendedor = localStorage.getItem("cameFromMsjVendedor");

        const paginaGuardada = sessionStorage.getItem("pageselectMisCompras");

        if (
            (cameFromProductPage === "true" &&
                urlProduct?.includes("/product/")) ||
            (cameFromProductVerCompra === "true" &&
                urlVerCompra?.includes("/MisCompras/verCompra")) ||
            (cameFromMsjVendedor === "true" &&
                urlMsjComprador?.includes("/MisCompras/msjVendedor"))
        ) {
            if (paginaGuardada) {
                setPage(Number(paginaGuardada));
            }

            localStorage.removeItem("cameFromProductPage");
            localStorage.removeItem("cameFromProductVerCompra");
            localStorage.removeItem("cameFromMsjVendedor");
        } else {
            sessionStorage.removeItem("pageselectMisCompras");
            setPage(1);
        }
    }, []);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div
                        className="ps-page ps-page--inner contMinHegihtLeftMisCompras"
                        id="myaccount">
                        <ModalControlAcceso
                            shown={showModalControlAcceso}
                            close={setShowModalControlAcceso}
                            titulo={tituloControlAcceso}
                            mensaje={textoControlAcceso}
                            tipo="1"
                        />
                        <div>
                            <div className="ml-57 mt-22">
                                <Grid container spacing={1}>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <Button
                                            className="none1200px"
                                            variant="outline-light"
                                            onClick={() => closeOpenMenu()}
                                            style={{
                                                backgroundColor: "transparent",
                                            }}>
                                            <div
                                                className={
                                                    closeOpen
                                                        ? "menulateralseisMisccom"
                                                        : "menulateralseis"
                                                }>
                                                <MenuIcon className="menuproperty" />
                                            </div>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={7} md={7} lg={7}>
                                        <div className="titlesformsUsersCuatro">
                                            <div
                                                className={
                                                    closeOpen
                                                        ? "textomisventasMiscC"
                                                        : "textomisventas"
                                                }>
                                                Mis compras
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <div className="numeroVentas">
                                            Número de compras: {numeroCompras}
                                        </div>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="mt-7">
                                                {closeOpen ? (
                                                    <LateralMenu />
                                                ) : null}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={sombraOpen}>
                                <Grid
                                    className="contDataUsers TopContMisCompras"
                                    container
                                    style={{
                                        width: isMdDown ? "90%" : "85%",
                                    }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            placeholder="Buscar en mis compras"
                                            sx={{
                                                borderRadius: "10px",
                                                backgroundColor: fondoInput,
                                                padding: "8px",
                                                marginRight: "8px",
                                                width: isMdDown
                                                    ? "100%"
                                                    : "90%", // Ajuste responsivo
                                                height: "44px",
                                                padding: "10px",
                                                fontSize: "16px",
                                                paddingLeft: "3rem",
                                                color: "#2C2E82",
                                                fontWeight: "500",
                                                marginBottom: isMdDown
                                                    ? "1rem"
                                                    : "0", // Ajuste responsivo para marginBottom
                                                "&::placeholder": {
                                                    color: "#3E4089",
                                                    fontWeight: "600",
                                                },
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <SearchIcon
                                                        style={{
                                                            fontSize: 30,
                                                            color: "#3E4089",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        sx={{
                                            display: "flex",
                                            justifyContent: isMdDown
                                                ? "space-between"
                                                : "flex-end",
                                            alignItems: "center",
                                        }}>
                                        <p className="numComprasNone">
                                            Numero de Compras: {numeroCompras}
                                        </p>
                                        
                                        <Dropdown
                                            style={{ width: "40%" }}
                                            onSelect={handleSelect}>
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic">
                                                {selectedSortOption
                                                    ? `Ordenar por ${selectedSortOption}`
                                                    : "Ordenar por"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="tamañocajaoptionsTdocPersona">
                                                <Dropdown.Item
                                                    eventKey="Más antiguo"
                                                    className="itemsdropdownTdocPersona">
                                                    Más antiguo
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Más reciente"
                                                    className="itemsdropdownTdocPersona">
                                                    Más reciente
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Grid>
                                </Grid>

                                <Grid
                                    ref={lolograTa}
                                    className="contProdcOMPR"
                                    container
                                    style={{
                                        width: isMdDown ? "90%" : "85%",
                                        marginTop: "2rem",
                                    }}>
                                    {/* Mostrar productos */}
                                    {paginatedCompras.length > 0 ? (
                                        paginatedCompras.map(
                                            (producto, index) => (
                                                <Grid
                                                    key={index}
                                                    className={sombraOpenTres}
                                                    container>
                                                    <Grid
                                                        key={producto.id}
                                                        item
                                                        xs={12}
                                                        sm={9}
                                                        md={9}
                                                        className="productCompradoSubCont">
                                                        <Grid
                                                            xs={6}
                                                            md={6}
                                                            className={
                                                                sombraOpenDos
                                                            }
                                                            onClick={() =>
                                                                router.push({
                                                                    pathname:
                                                                        "./verCompra",
                                                                    query: {
                                                                        producto:
                                                                            JSON.stringify(
                                                                                producto
                                                                            ),
                                                                        uidcomprador:
                                                                            JSON.stringify(
                                                                                datosusuarios.uid
                                                                            ),
                                                                    },
                                                                })
                                                            }>
                                                            <img
                                                                className={
                                                                    controlImg
                                                                }
                                                                src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            className="none500MisCompras"
                                                            item
                                                            xs={12}
                                                            md={9}>
                                                            <Grid className="subContMiscompras">
                                                                <p className="estadoCompra">
                                                                    {
                                                                        producto.estadomiscompras
                                                                    }
                                                                </p>
                                                                <p className="nombreProductMiCompra">
                                                                    {
                                                                        producto.nombreProducto
                                                                    }
                                                                </p>
                                                                <div className="divCantCompradas">
                                                                    <p className="UnidCompradas">
                                                                        Unidades
                                                                        compradas:{" "}
                                                                        {
                                                                            producto.cantidad
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="divNcompra">
                                                                    <p className="UnidCompradas">
                                                                        {" "}
                                                                        Número
                                                                        de
                                                                        compra:{" "}
                                                                        {
                                                                            producto.numerodeaprobacion
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <p className="dateCompra">
                                                                    {
                                                                        producto.fechacompra
                                                                    }
                                                                </p>
                                                                <p className="dateCompraPrecioCompra">
                                                                    <b>
                                                                        $
                                                                        {myNumber(
                                                                            1,
                                                                            producto.preciodeventa,
                                                                            2
                                                                        )}
                                                                    </b>
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={3}
                                                            className={
                                                                sombraOpenCuatro
                                                            }>
                                                            <p>
                                                                <b>
                                                                    $
                                                                    {myNumber(
                                                                        1,
                                                                        producto.preciodeventa,
                                                                        2
                                                                    )}
                                                                </b>
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={3}
                                                        md={3}
                                                        className="ContRightMisCompras">
                                                        <div className="SendMsjVendandName">
                                                            <div className="infoCompraMobile">
                                                                <h5>
                                                                    {
                                                                        producto?.estadomiscompras
                                                                    }
                                                                </h5>
                                                                <span>
                                                                    {
                                                                        producto?.nombreProducto
                                                                    }
                                                                </span>
                                                                <span>
                                                                    Unidades
                                                                    Compradas:{" "}
                                                                    {
                                                                        producto?.cantidad
                                                                    }
                                                                </span>
                                                                <span>
                                                                    Número de
                                                                    Compra:{" "}
                                                                    {
                                                                        producto?.numerodeaprobacion
                                                                    }
                                                                </span>
                                                                <span>
                                                                    {
                                                                        producto?.fechacompra
                                                                    }
                                                                </span>
                                                                <span>
                                                                    <b>
                                                                        $
                                                                        {myNumber(
                                                                            1,
                                                                            producto.preciodeventa,
                                                                            2
                                                                        )}
                                                                    </b>{" "}
                                                                </span>
                                                            </div>
                                                            <p className="nameVendedorMiCompra">
                                                                {
                                                                    producto.nombreVendedor
                                                                }{" "}
                                                                {
                                                                    producto.apellidoVendedor
                                                                }{" "}
                                                            </p>
                                                            <p
                                                                className="buttonSendMsjVendedor"
                                                                onClick={() =>
                                                                    router.push(
                                                                        {
                                                                            pathname:
                                                                                "./msjVendedor",
                                                                            query: {
                                                                                producto:
                                                                                    JSON.stringify(
                                                                                        producto
                                                                                    ),
                                                                            },
                                                                        }
                                                                    )
                                                                }>
                                                                Enviar mensaje
                                                                al vendedor
                                                            </p>
                                                        </div>

                                                        <div className="divButtonVercompra">
                                                            <button
                                                                onClick={() =>
                                                                    router.push(
                                                                        {
                                                                            pathname:
                                                                                "./verCompra",
                                                                            query: {
                                                                                producto:
                                                                                    JSON.stringify(
                                                                                        producto
                                                                                    ),
                                                                                uidcomprador:
                                                                                    JSON.stringify(
                                                                                        datosusuarios.uid
                                                                                    ),
                                                                            },
                                                                        }
                                                                    )
                                                                }>
                                                                Ver Compra
                                                            </button>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            )
                                        )
                                    ) : (
                                        <p>No se encontraron resultados</p>
                                    )}
                                </Grid>
                            </div>
                        </div>
                        <div className="flex justify-center w-full minhPropio">
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
                    </div>
                </Container>
            </div>
        </>
    );
}
const StyledPagination = muiStyled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
        border: "none",
        backgroundColor: "transparent", // Sin fondo por defecto
        color: "#2D2E83", // Color azul para los números no seleccionados
        borderRadius: "0", // Sin borde redondeado para los números no seleccionados
        width: "32px",
        height: "32px",
        minWidth: "32px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        "&.Mui-selected": {
            backgroundColor: "#2D2E83", // Fondo azul para el número seleccionado
            color: "white", // Texto blanco en el número seleccionado
            borderRadius: "50%", // Bordes redondeados en la página seleccionada
            fontWeight: "bold", // Hacerlo más destacado
        },
        [theme.breakpoints.down("sm")]: {
            width: "26px",
            height: "26px",
            minWidth: "26px",
            fontSize: "1rem",
        },
    },
    "& .MuiPaginationItem-ellipsis": {
        backgroundColor: "transparent", // Sin fondo en elipsis
        color: "#2D2E83", // Color azul para elipsis
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
            width: "26px",
            height: "26px",
            fontSize: "0.75rem",
        },
    },
    // Estilos para los botones "previous" y "next"
    "& .MuiPaginationItem-previousNext": {
        backgroundColor: "transparent",
        color: "#2D2E83", // azul
        borderRadius: "0", // sin círculos
        fontSize: "1.7rem", // tamaño más grande
        minWidth: "auto",
        width: "auto",
        height: "auto",
        "&:hover": {
            backgroundColor: "transparent",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.4rem",
        },
    },
}));
