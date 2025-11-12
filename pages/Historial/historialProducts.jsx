import Container from "../../components/layouts/Container";
import {
    Grid,
    useMediaQuery,
    useTheme,
    InputAdornment,
    InputBase,
    ImageList,
    ImageListItem,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled as muiStyled } from "@mui/material/styles";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import { Router } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoSquareOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesEliminar from "../mensajes/ModalMensajesEliminar";
import { getLeeIra } from "../../store/leeira/action";
import ModalMensajesSoyNuevo from "../../pages/mensajes/ModalMensajesSoyNuevo";
import CustomPaginationSearch from "../../components/elements/basic/CustomPaginationSearch";
import { getNumberPages } from "../../store/numberpages/action";
import { useLocation } from "react-router-dom";
let registrosPorPagina = 31;

export default function historialProducts() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const [busqueda, setBusqueda] = useState("");
    const [datosUsuarioOriginales, setDatosUsuarioOriginales] = useState("");
    const [tituloMensajes, setTituloMensajes] = useState(""); //titulo modal
    const [textoMensajes, setTextoMensajes] = useState(""); //texto modal
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [UidUser, setUidUser] = useState("");
    const [DatosUser, setDatosUser] = useState([]);
    const [showModal2, setShowModal2] = useState(false); //Modal de confirmación de eliminar todo el historial
    const [paginaActual, setPaginaActual] = useState(1); //función para identificar pagina actual del usuaro
    const productosPorPagina = 40; //productos por pagina maximo 40
    const indexUltimoProducto = paginaActual * productosPorPagina; //función para
    const indexPrimerProducto = indexUltimoProducto - productosPorPagina;

    const [showModalMensajesSoyNuevo, setShowModalMensajesSoyNuevo] =
        useState(false);
    const [tituloMensajesSoyNuevo, setTituloMensajesSoyNuevo] = useState(false);
    const [textoMensajesSoyNuevo, setTextoMensajesSoyNuevo] = useState(false);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [orderPrice, setOrderPrice] = useState(null);
    //const [registrosPorPagina, setRegistrosPorPagina] = useState(14);
    const [arrayPrdHistorial, setArrayPrdHistorial] = useState([]);
    let itemsIni = 0;
    let itemsFin = registrosPorPagina;

    const productosActuales = datosUsuario.slice(
        indexPrimerProducto,
        indexUltimoProducto
    );
    const numeroTotalPaginas = Math.ceil(
        datosUsuario.length / productosPorPagina
    );

    // Detectamos el tamaño del viewport
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));

    // Ajustamos la cantidad de columnas según el tamaño
    let cols = 1;
    if (isSm) cols = 3;
    else if (isXs) cols = 1;
    else if (isMd) cols = 5;
    else if (isLg) cols = 5;
    else cols = 5; // xl o mayor

    useEffect(() => {
        let numprd = datosUsuario.length;
        let numpag = (numprd / registrosPorPagina).toFixed(0) - 1;
        //alert(numpag)
        let arraypg = [];
        setNumeroPaginas(numpag);

        for (var i = 1; i <= numpag; i++) {
            arraypg.push(i);
        }
        //console.log("productosActuales : ", arraypg);
        dispatch(getNumberPages(arraypg));
    }, [productosActuales]);

    let paginaselect = useSelector((state) => state.pageselect.pageselect);

    useEffect(() => {
        let array = [];

        if (isMdDown) registrosPorPagina = 6;

        if (!paginaselect) paginaselect = 1;

        for (var i = 1; i <= numeroPaginas; i++) {
            if (paginaselect == 1) {
                itemsIni = 0;
                itemsFin = registrosPorPagina;
            } else if (paginaselect == i) {
                itemsIni = registrosPorPagina * i;
                itemsFin = registrosPorPagina * (i + 1);
            }
        }

        let indice = 0;
        if (datosUsuario.length > 0) {
            datosUsuario &&
                datosUsuario.map((row, index) => {
                    indice = parseInt(indice) + parseInt(1);
                    if (indice >= itemsIni && indice <= itemsFin) {
                        array.push(row);
                    }
                });
            setArrayPrdHistorial(array);

            irA.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        arrayPrdHistorial, setArrayPrdHistorial;
    }, [paginaselect, datosUsuario]);

    const [todosSeleccionados, setTodosSeleccionados] = useState(false); //cuando se seleccionan todos los productos
    // Estado para los productos seleccionados
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    //PosiciónTopPage
    const irA = useRef(null);
    const [showModal3, setShowModal3] = useState(false);

    const eliminarProductosSeleccionados = () => {
        // Muestra el modal de confirmación
        setShowModal3(true);
    };

    //cerrar modal de favoritos y de eliminar un producto
    const handleModalClose = () => {
        setShowModal(false);
    };

    //handle para eliminar todo el historial con modal
    const eliminarHistorial = () => {
        setShowModal2(true);
    };

    //función para ponerle la ", " a los precios
    function formatearPrecio(precio) {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        console.log("DAT USER : ", datosusuarios);
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

    //Petición para mapear datos de producs historial user
    useEffect(() => {
        // Define una función asíncrona para obtener los datos del usuario
        const leerProductos = async () => {
            // Define los parámetros para la solicitud
            let params = {
                usuario: UidUser,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "88",
                params,
            })
                .then((res) => {
                    let datahist = res?.data?.listarallhistoryvisitprd;
                    let data = [];

                    datahist &&
                        datahist.map((row, index) => {
                            if (index <= 99) {
                                data = [...data, row];
                            }
                        });

                    // Si la solicitud es exitosa, mapea los datos del usuario
                    const productos = data.map(
                        (producto) => {
                            return {
                                id: producto.id,
                                idproducto: producto.idproducto,
                                compatible: producto.compatible,
                                usuario: producto.usuario,
                                fechacreacion: producto.fechacreacion,
                                titulonombre: producto.titulonombre,
                                precio: formatearPrecio(producto.precio),
                                numerodeunidades: producto.numerodeunidades,
                                nombreimagen1: producto.nombreimagen1,
                            };
                        }
                    );
                    setDatosUsuarioOriginales(productos);
                    productos.sort(
                        (a, b) =>
                            new Date(b.fechacreacion) -
                            new Date(a.fechacreacion)
                    );
                    console.log(productos); // Imprime los datos en la consola
                    setDatosUsuario(productos);
                })
                .catch(function (error) {
                    // Si ocurre un error, registra el error en la consola
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerProductos();
    }, [UidUser]);

    //función para eliminar un producto con modal de confirmación
    const eliminarProducto = async (idproducto) => {
        let params = {
            idproducto: idproducto,
            usuario: UidUser, // Usa el uid del usuario obtenido anteriormente
        };

        return axios({
            method: "post",
            url: URL_BD_MR + "91",
            params,
        })
            .then((res) => {
                console.log("Producto eliminado exitosamente");
                // Muestra el modal
                setShowModal(true);
                setTituloMensajes("Producto eliminado");
                let texto = "Producto eliminado exitosamente";
                setTextoMensajes(texto);
            })
            .catch(function (error) {
                console.error("Error al eliminar el producto", error);
            });
    };

    //función para eliminar todo el historial con modal de confirm y luego el modal de confirmación
    const confirmarEliminacion = async () => {
        let params = {
            usuario: UidUser, // Usa el uid del usuario obtenido anteriormente
        };

        await axios({
            method: "post",
            url: URL_BD_MR + "90",
            params,
        })
            .then((res) => {
                console.log("Historial eliminado exitosamente");
                // Aquí puedes actualizar tus datos después de eliminar el historial
                setDatosUsuario([]);
                setDatosUsuarioOriginales([]);
            })
            .catch(function (error) {
                console.error("Error al eliminar el historial", error);
            });

        // Cierra el modal después de la eliminación
        setShowModal2(false);
    };

    // Función para verificar si el producto ya está en favoritos
    const verificarProducto = async (producto) => {
        let params = {
            idproducto: producto.idproducto,
            usuario: datosusuarios.uid,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "57",
                params,
            });
            if (res.data.listaritemdeseos.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error al verificar el producto", error);
        }
    };

    // Función para enviar el producto a favoritos
    const enviarAFavoritos = async (producto) => {
        let params = {
            idproducto: producto.idproducto,
            compatible: producto.compatible,
            usuario: datosusuarios.uid,
        };

        try {
            await axios({
                method: "post",
                url: URL_BD_MR + "53",
                params,
            });
            console.log("Producto añadido a favoritos");

            const grabarItemhistorial = async () => {
                let params = {
                    idproducto: producto.idproducto,
                    compatible: producto.compatible,
                    usuario: datosusuarios.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "531",
                    params,
                })
                    .then((res) => {
                        console.log("HISTORIAL LISTA DESEOS ", OK);
                    })
                    .catch(function (error) {
                        console.log("ERROR HISTORIAL LISTA DESEOS");
                    });
            };
            grabarItemhistorial();
        } catch (error) {
            console.error("Error al añadir el producto a favoritos", error);
        }
    };

    // Función para verificar y enviar a favoritos
    const verificarYEnviarAFavoritos = async (producto) => {
        const estaEnFavoritos = await verificarProducto(producto);

        if (estaEnFavoritos) {
            setShowModal(true);
            setTituloMensajes("Lista de deseos");
            let texto = "Producto ya existe en lista de deseo";
            setTextoMensajes(texto);
        } else {
            await enviarAFavoritos(producto);
            setShowModal(true);
            setTituloMensajes("Lista de deseos");
            let texto = "Producto añadido a favoritos con éxito";
            setTextoMensajes(texto);
        }
    };

    //función para filtrar por fecha
    const handleSelect = (eventKey) => {
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena los productos según la opción seleccionada
        let productosOrdenados;
        const hoy = new Date();
        switch (eventKey) {
            case "Última semana":
                productosOrdenados = datosUsuarioOriginales.filter(
                    (producto) => {
                        const fechaProducto = new Date(producto.fechacreacion);
                        const unaSemanaAtras = new Date(
                            hoy.getFullYear(),
                            hoy.getMonth(),
                            hoy.getDate() - 7
                        );
                        return fechaProducto >= unaSemanaAtras;
                    }
                );
                break;
            case "Últimos 15 días":
                productosOrdenados = datosUsuarioOriginales.filter(
                    (producto) => {
                        const fechaProducto = new Date(producto.fechacreacion);
                        const quinceDiasAtras = new Date(
                            hoy.getFullYear(),
                            hoy.getMonth(),
                            hoy.getDate() - 15
                        );
                        return fechaProducto >= quinceDiasAtras;
                    }
                );
                break;
            case "Último mes":
                productosOrdenados = datosUsuarioOriginales.filter(
                    (producto) => {
                        const fechaProducto = new Date(producto.fechacreacion);
                        const unMesAtras = new Date(
                            hoy.getFullYear(),
                            hoy.getMonth() - 1,
                            hoy.getDate()
                        );
                        return fechaProducto >= unMesAtras;
                    }
                );
                break;
            case "Últimos dos meses":
                productosOrdenados = datosUsuarioOriginales.filter(
                    (producto) => {
                        const fechaProducto = new Date(producto.fechacreacion);
                        const dosMesesAtras = new Date(
                            hoy.getFullYear(),
                            hoy.getMonth() - 2,
                            hoy.getDate()
                        );
                        return fechaProducto >= dosMesesAtras;
                    }
                );
                break;
            case "Últimos seis meses":
                productosOrdenados = datosUsuarioOriginales.filter(
                    (producto) => {
                        const fechaProducto = new Date(producto.fechacreacion);
                        const seisMesesAtras = new Date(
                            hoy.getFullYear(),
                            hoy.getMonth() - 6,
                            hoy.getDate()
                        );
                        return fechaProducto >= seisMesesAtras;
                    }
                );
                break;
            default:
                productosOrdenados = [...datosUsuarioOriginales];
        }
        setDatosUsuario(productosOrdenados);
    };

    //button dropdown
    const CustomDropdownButton = React.forwardRef(
        ({ children, onClick }, ref) => (
            <button ref={ref} onClick={onClick} className="dropdownHistorial">
                {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
            </button>
        )
    );
    //Funcion para filtrar por nombre del producto
    const handleSearch = (event) => {
        setBusqueda(event.target.value);
    };
    useEffect(() => {
        let productosFiltrados = datosUsuarioOriginales;
        if (busqueda !== "") {
            const palabrasBusqueda = busqueda.toLowerCase().split(" ");
            productosFiltrados = datosUsuarioOriginales.filter((producto) => {
                const titulonombreMinusculas =
                    producto.titulonombre.toLowerCase();
                return palabrasBusqueda.every((palabra) =>
                    titulonombreMinusculas.includes(palabra)
                );
            });
        }
        setDatosUsuario(productosFiltrados);
    }, [busqueda, datosUsuarioOriginales]);

    //Función para enviar al usuario al top cuando entra
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            localStorage.setItem("ira", JSON.stringify(7));
            localStorage.setItem("rutaira", JSON.stringify(router.pathname));

            dispatch(getLeeIra(7));

            setShowModalMensajesSoyNuevo(true);
            setTituloMensajesSoyNuevo(
                "¡Bienvenido! Para ir a historial debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesSoyNuevo(texto);
            //setLogin(true);
            return;
        }
    }, []);

    // Esta función se llama cuando haces clic en un producto.
    // Si el producto ya está seleccionado, lo deselecciona.
    // Si el producto no está seleccionado, lo selecciona.
    const manejarClicProducto = (producto) => {
        if (productosSeleccionados.includes(producto)) {
            // Si el producto ya está seleccionado, lo deseleccionamos.
            setProductosSeleccionados(
                productosSeleccionados.filter(
                    (p) => p.idproducto !== producto.idproducto
                )
            );
        } else {
            // Si el producto no está seleccionado, lo seleccionamos.
            setProductosSeleccionados([...productosSeleccionados, producto]);
        }
    };

    const confirmarEliminacionProductosSeleccionados = () => {
        // Mapea cada producto a una promesa de eliminación
        const promesasDeEliminacion = productosSeleccionados.map((producto) =>
            eliminarProducto(producto.idproducto)
        );

        // Espera a que todas las promesas se resuelvan
        Promise.all(promesasDeEliminacion)
            .then(() => {
                // Actualiza tus datos después de eliminar los productos
                const nuevosDatos = datosUsuario.filter(
                    (producto) => !productosSeleccionados.includes(producto)
                );
                setDatosUsuario(nuevosDatos);
                setDatosUsuarioOriginales(nuevosDatos);

                // Limpia el array después de eliminar los productos
                setProductosSeleccionados([]);

                // Muestra el modal
                setShowModal(true);
                setTituloMensajes("Producto eliminado");
                let texto =
                    productosSeleccionados.length > 1
                        ? "Productos eliminados exitosamente"
                        : "Producto eliminado exitosamente";
                setTextoMensajes(texto);

                // Cierra el modal de confirmación
                setShowModal3(false);
            })
            .catch((error) => {
                // Si hay un error, lo mostramos en la consola.
                console.error("Error al eliminar los productos", error);
            });
    };

    // Este manejador de clics se llama cuando haces clic en el botón para eliminar un producto individualmente.
    const manejarClicEliminar = async (idproducto, usuario) => {
        // Esperamos a que la promesa de eliminación se resuelva.
        await eliminarProducto(idproducto, usuario);

        // Actualizamos los datos después de eliminar el producto.
        const nuevosDatos = datosUsuario.filter(
            (producto) => producto.idproducto !== idproducto
        );
        setDatosUsuario(nuevosDatos);
        setDatosUsuarioOriginales(nuevosDatos);
    };

    // Esta función se llama cuando haces clic en el botón de "seleccionar todo".
    // Si todos los productos ya están seleccionados, los deselecciona.
    // De lo contrario, selecciona todos los productos.
    const manejarClicSeleccionarTodos = () => {
        if (productosSeleccionados.length === datosUsuario.length) {
            // Si todos los productos ya están seleccionados, los deseleccionamos.
            setProductosSeleccionados([]);
        } else {
            // Si no todos los productos están seleccionados, los seleccionamos todos.
            setProductosSeleccionados(datosUsuario);
        }
    };

    const verProduct = (dat) => {
        //console.log("DATXXX : ", dat)
        //return
        let ruta = "/product/" + dat.idproducto;
        router.push(ruta);
    };
    const [page, setPage] = useState(1);
    const cardsRef = useRef(null); //
    const itemsPerPage = isMdDown ? 6 : 20;
    useEffect(() => {
        const url = sessionStorage.getItem("urlProduct");
        const cameFromProductPage = localStorage.getItem("cameFromProductPage");

        if (cameFromProductPage == "true" && url && url.includes("/product/")) {
            // Si la URL contiene '/product/', significa que venimos de la vista de detalle
            const paginaGuardada = sessionStorage.getItem("pageselectHi");
            if (paginaGuardada) {
                setPage(Number(paginaGuardada)); // Recuperamos la página guardada
            }

            localStorage.removeItem("cameFromProductPage");
        } else {
            sessionStorage.removeItem("pageselectHi"); // Limpiamos la página guardada si no venimos de la vista de detalle
            setPage(1); // Reiniciamos la página a 1 si no venimos de la vista de detalle
        }
    }, []);

    useEffect(() => {
        if (cardsRef.current) {
            cardsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [page]);
    // Lógica de paginación
    const handleChange = (event, value) => {
        setPage(value);
        sessionStorage.setItem("pageselectHi", value);
    };

    const totalPages = Math.ceil(datosUsuario.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedHistorial = datosUsuario.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <ModalMensajesSoyNuevo
                        shown={showModalMensajesSoyNuevo}
                        close={setShowModalMensajesSoyNuevo}
                        titulo={tituloMensajesSoyNuevo}
                        mensaje={textoMensajesSoyNuevo}
                        setSoyNuevo={0}
                        setTengoCuenta={0}
                        tipo="1"
                    />
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__content ps-account">
                                <Grid
                                    className="contDataUsers"
                                    container
                                    style={{
                                        width: isMdDown ? "100%" : "90%",
                                    }}>
                                    <Grid
                                        className="contDataUsers conTopH"
                                        container>
                                        <p>Tu historial</p>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="titleHistorial1">
                                        <div
                                            className="DeleteHistorial"
                                            onClick={eliminarHistorial}>
                                            <p>Eliminar historial</p>
                                            <FaTrashAlt className="iconDeleteHistorial" />
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        className="titleHistorial ">
                                        <div className="ContTopHistorial">
                                            <Dropdown
                                                onSelect={handleSelect}
                                                className="DropHistorial">
                                                <Dropdown.Toggle
                                                    as={CustomDropdownButton}
                                                    id="dropdown-basic">
                                                    {selectedSortOption
                                                        ? `Ordenar por ${selectedSortOption}`
                                                        : "Ordenar por"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="tamañocajaoptionsHistorial">
                                                    <Dropdown.Item
                                                        eventKey="Última semana"
                                                        className="itemsdropdownTdocPersona">
                                                        Última semana
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Últimos 15 días"
                                                        className="itemsdropdownTdocPersona">
                                                        Últimos 15 días
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Último mes"
                                                        className="itemsdropdownTdocPersona">
                                                        Último mes
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Últimos dos meses"
                                                        className="itemsdropdownTdocPersona">
                                                        Últimos dos meses
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Últimos seis meses"
                                                        className="itemsdropdownTdocPersona">
                                                        Últimos seis meses
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <InputBase
                                                className="inputhISTORIAL"
                                                placeholder="Buscar en mi historial"
                                                sx={{
                                                    fontSize: "16px",
                                                    color: "#2C2E82;",
                                                    fontWeight: "500",
                                                    "&::placeholder": {
                                                        color: "#3E4089",
                                                        fontWeight: "600",
                                                    },
                                                }}
                                                onChange={handleSearch}
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
                                        </div>
                                    </Grid>
                                    <Grid
                                        className="contProductsHistorial"
                                        container
                                        style={{ width: "100%" }}>
                                        <div className="selectedProductsHistorial">
                                            <div className="DeletedSelectsHistorial">
                                                <div
                                                    onClick={
                                                        manejarClicSeleccionarTodos
                                                    }
                                                    className="iconsSelectAll">
                                                    <IoSquareOutline className="iconSquare2" />
                                                    {productosSeleccionados.length ===
                                                        datosUsuario.length && (
                                                        <FaCheck className="iconCheck2 selected2" />
                                                    )}
                                                </div>
                                                <button
                                                    className={`buttonDeleteProductsSelects ${
                                                        productosSeleccionados.length >
                                                        0
                                                            ? "underline"
                                                            : "disabled"
                                                    }`}
                                                    onClick={
                                                        eliminarProductosSeleccionados
                                                    }
                                                    disabled={
                                                        productosSeleccionados.length ===
                                                        0
                                                    }>
                                                    Eliminar productos
                                                    seleccionados
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className="ProducsH"
                                            ref={cardsRef}>
                                            <ImageList cols={cols}>
                                                {paginatedHistorial.length >
                                                0 ? (
                                                    paginatedHistorial.map(
                                                        (producto, index) => (
                                                            <div
                                                                className="ContProductHistorial"
                                                                key={
                                                                    producto.id
                                                                }>
                                                                <ImageListItem
                                                                    key={index}>
                                                                    <div
                                                                        className="iconsHistorial2 "
                                                                        onClick={() =>
                                                                            manejarClicProducto(
                                                                                producto
                                                                            )
                                                                        }>
                                                                        <IoSquareOutline className="iconSquare" />
                                                                        {productosSeleccionados.includes(
                                                                            producto
                                                                        ) && (
                                                                            <FaCheck className="iconCheck selected" />
                                                                        )}
                                                                    </div>

                                                                    <div
                                                                        onClick={() =>
                                                                            verProduct(
                                                                                producto
                                                                            )
                                                                        }>
                                                                        <img
                                                                            src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`}
                                                                            alt={
                                                                                producto.titulonombre
                                                                            }
                                                                        />
                                                                        <div className="DataProductHistorial">
                                                                            <p className="ProductName">
                                                                                {
                                                                                    producto.titulonombre
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                $
                                                                                {
                                                                                    producto.precio
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="iconsHistorial">
                                                                        <div className="iconsHrl">
                                                                            <div
                                                                                className="icon1Delete"
                                                                                onClick={() =>
                                                                                    manejarClicEliminar(
                                                                                        producto.idproducto,
                                                                                        producto.usuario
                                                                                    )
                                                                                }>
                                                                                <FaTrashAlt className="iconDeleteH" />
                                                                            </div>
                                                                            <div
                                                                                className="icon1Delete"
                                                                                onClick={() =>
                                                                                    verificarYEnviarAFavoritos(
                                                                                        producto
                                                                                    )
                                                                                }>
                                                                                <IoMdHeartEmpty className="iconFavH" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </ImageListItem>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <p>
                                                        No se encontraron
                                                        productos en tu
                                                        historial.
                                                    </p>
                                                )}
                                            </ImageList>
                                        </div>
                                        <div className="lenghHistorial">
                                            <div className="contLenghHistorial">
                                                <p>
                                                    Total de productos en tu
                                                    historial:{" "}
                                                    {datosUsuario.length}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="paginaciónMainHistorial">
                                            <ModalMensajes
                                                shown={showModal}
                                                close={handleModalClose}
                                                titulo={tituloMensajes}
                                                mensaje={textoMensajes}
                                                tipo="error"
                                            />
                                            <ModalMensajesEliminar
                                                shown={showModal2}
                                                setContinuarEliminar={
                                                    confirmarEliminacion
                                                }
                                                setAbandonarEliminar={() =>
                                                    setShowModal2(false)
                                                }
                                                titulo="Eliminar historial"
                                                mensaje="¿Estás seguro de que quieres eliminar el historial?"
                                                tipo="confirmación"
                                            />
                                            <ModalMensajesEliminar
                                                shown={showModal3}
                                                setContinuarEliminar={
                                                    confirmarEliminacionProductosSeleccionados
                                                }
                                                setAbandonarEliminar={() =>
                                                    setShowModal3(false)
                                                }
                                                titulo="Eliminar historial"
                                                mensaje="¿Estás seguro de que quieres eliminar estos productos de tu historial?"
                                                tipo="confirmación"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <Stack spacing={2} alignItems="center" mt={2}>
                        <StyledPagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Stack>
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
