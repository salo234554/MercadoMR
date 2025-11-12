import React, { useEffect, useState, useRef } from "react";
import ContainerResult from "~/components/layouts/ContainerResult";
import BreadCumbBusqueda from "~/components/elements/BreadCumbBusqueda";
import ShopSearch from "~/components/partials/shop/ShopSearch";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupInteractive from "~/hooks/useProductGroupInteractive";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";
import useProductGroup from "~/hooks/useProductGroup";
import { useRouter } from "next/router";
import ModuleShopResults from "~/components/partials/shop/modules/ModuleShopResults";
import CustomPagination from "~/components/elements/basic/CustomPagination";
import CustomPaginationSearch from "~/components/elements/basic/CustomPaginationSearch";
import SidebarShopResults from "~/components/shared/sidebar/SidebarShopResults";
import axios from "axios";
import { Box, Grid, Button, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ViewAddShoppingCart from "../shop/viewaddshoppingcart";
import AddShoppingCart from "../shop/addshoppingcart";
import { getAddEdToCart } from "../../store/addedtocart/action";
import { getDataShoppingCart } from "../../store/datashoppingcart/action";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getOpenCloseCity } from "../../store/openclosecity/action";
import { getNumberPrdSelect } from "../../store/numberprdselect/action";
import { getFiltroPrd } from "../../store/filtroprd/action";
import { getFiltroCondicionPrd } from "../../store/filtrocondicionprd/action";
import { getRangosPrecio } from "../../store/rangosprecio/action";
import { getUpdateData } from "../../store/updatedata/action";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled as muiStyled } from '@mui/material/styles';
import PromotionSecureInformation from "../../components/shared/sections/PromotionInformationSearch";
import FooterDefault from "../../components/shared/footers/FooterDefault";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";
import { IoClose } from "react-icons/io5";
import { getNumberPages } from "../../store/numberpages/action";
import { getLongPage } from "../../store/longpage/action"

import { getChangeSearchPrice } from "../../store/changesearchprice/action";

import ModalMensajesWishListSearch from "../../pages/mensajes/ModalMensajesWishListSearch";

//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { AirlineSeatReclineExtra } from "@material-ui/icons";
import { getUserMenu } from "../../store/usermenu/action";
import { getAddLogin } from "../../store/addlogin/action";

let ciudadesAlt = [];
let ciudadesselAlt = [];


const breadcrumb = [
    {
        id: 1,
        text: "Inicio",
        url: "/",
    },
    {
        id: 2,
        text: "Resultados de la búsqueda",
    },
];

let dataPrd = [];
let itemciud = [];
let allprdciud = [];
let nombreres = null;
let basePrecios = [];
let dataProd = [];
let controlcond = false;
let baseCiudad = [];
let holder = 0;
let valdata = 0;
let longprd = 0;
let registrosPorPagina = 2;
let itemsProduct = [];
let itemsPrdTot = [];
let totalPaginas = 0

const SearchResultScreen = () => {
    const Router = useRouter();
    const irA = useRef(null);
    const dispatch = useDispatch();
    let { keyword } = Router.query;

    const { loading, productItems, getProducts, dataPayload } =
        useGetProducts();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const { withGridDos } = useProductGroup();
    const { withListMaximize } = useProductGroupInteractive();
    const { withListView } = useProductGroup();

    const [resultFind, setResultFind] = useState(false);
    const [wordCambia, setWordCambia] = useState(false);
    const [cantidadPrdCiudad, setCantidadPrdCiudad] = useState([]);
    const [cantidadPrdCiudadAll, setCantidadPrdCiudadAll] = useState([]);
    const [PrdCiudadUno, setPrdCiudadUno] = useState([]);
    const [PrdCiudadDos, setPrdCiudadDos] = useState([]);

    const [PrdCiudadUnoAll, setPrdCiudadUnoAll] = useState([]);
    const [PrdCiudadDosAll, setPrdCiudadDosAll] = useState([]);

    const [allCity, setAllCity] = useState([]);
    const [selected, setSelected] = useState([]);
    const [marcaSelected, setmarcaSelected] = useState("");
    const [activaCiudad, setActivaCiudad] = useState(true);
    const [eraseCitySel, setEraseCitySel] = useState(0);
    const [citySelected, setCitySelected] = useState([]);
    const [pagina, setPagina] = useState(1);
    let itemsPorPagina = 8;
    const isXs = useMediaQuery('(max-width:600px)');
    const isSm = useMediaQuery('(min-width:601px) and (max-width:960px)');
    const isMd = useMediaQuery('(min-width:961px) and (max-width:1580px)');
    let longpage = useSelector((state) => state.longpage.longpage);

    const [activar, setActivar] = useState("habilitar");
    const [selectGrid, setSelectGrid] = useState(1);
    const [itemsPaginas, setItemsPaginas] = useState(10);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);

    const [condition, setCondition] = useState(null);
    const [marcarCondicion, setMarcarCondicion] = useState("");
    const [paginaSel, setPaginaSel] = useState(1);
    const [itemSel, setitemSel] = useState(null);
    const [itemSelCond, setitemSelCond] = useState(null);
    const [contCond, setContCond] = useState(controlcond);
    const [disableEnable, setDisableEnable] = useState("");

    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(10000000);

    const [numProdRel, setNumProdRel] = useState(10);
    const [irInicio, setIrInicio] = useState(false);

    const [filtroCond, setFiltroCond] = useState(0);
    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [cerrarFiltro, setCerrarFiltro] = useState(false);

    const [classCondicion, setClassCondicion] = useState("ml-1 mt-10 mb-50");
    const [classCity, setClassCity] = useState(
        "colorcerrarselectlocation apuntador"
    );
    const [classCitySel, setClassCitySel] = useState(
        "colorxcerrarfiltro apuntador"
    );

    const [ok, setOk] = useState(false);
    const [clearFiltroCity, setclearFiltroCity] = useState(false);
    const [actCity, setActCiy] = useState(false);
    const [itemIni, setitemIni] = useState(1);
    const [itemFin, setItemFin] = useState(40);
    const [textoOrdenar, setTextoOrdenar] = useState("Ordenar por");
    const [isLoading, setIsLoading] = useState(true);

    const [addcartId, setAddcartId] = useState(0);
    const [addcartIdLogin, setAddcartIdLogin] = useState(0);
    const [addcartImagen, setAddcartImagen] = useState(0);
    const [addcartTitulo, setAddcartTitulo] = useState(0);
    const [addcartCantidad, setAddcartCantidad] = useState(0);
    const [agregarCarrito, setAgregarCarrito] = useState(false);
    const [dataCart, setDataCart] = useState(0);

    const [carPrdId, setCarPrdId] = useState(null);
    const [carImagen, setCartImagen] = useState(null);
    const [carTitulo, setCarTitulo] = useState(null);
    const [carCantidad, setCarCantidad] = useState(null);

    const [dataHolder, setDataHolder] = useState("");
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [onOffClick, setOnOffClick] = useState(
        "ps-page ps-page--shopping ml-85 cajaprueba habilitar"
    );

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    let itemsIni = 0;
    let itemsFin = registrosPorPagina;

    // Asignamos Datos al arreglo de Usuarios desde el state
    let addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const leeira = useSelector((state) => state.leeira.ira);
    // Lee registro de producto al carrito por login de usuario
    const addlogin = useSelector((state) => state.addlogin.addlogin);
    //lee valor de la grilla seleccionada
    const gripselect = useSelector((state) => state.gripselect.gripselect);

    const filtroprd = useSelector((state) => state.filtroprd.filtroprd);
    const orderbyprd = useSelector(
        (state) => state.filtroorderbyprd.filtroorderbyprd
    );
    const filtrocondprd = useSelector((state) => state.filtrocondicionprd.filtrocondicionprd);

    const openclosecity = useSelector(
        (state) => state.openclosecity.openclosecity
    );

    let paginaselect = useSelector(
        (state) => state.pageselect.pageselect
    );

    const changesearchprice = useSelector(
        (state) => state.changesearchprice.changesearchprice
    );

    const updatedata = useSelector(
        (state) => state.updatedata.updatedata
    );
    if (selectGrid === 1) {
        if (isXs) itemsPorPagina = 12;

        else if (isMd) itemsPorPagina = 20;
        else itemsPorPagina = 15;
    } else if (selectGrid === 2) {
        if (isXs) itemsPorPagina = 17;

        else if (isMd) itemsPorPagina = 30;
        else itemsPorPagina = 15;
    } else if (selectGrid === 3) {
        if (isXs) itemsPorPagina = 10;

        else if (isMd) itemsPorPagina = 12;
        else itemsPorPagina = 12;
    }

    useEffect(() => {
        if (itemsProduct) {
            let precios = [];
            itemsProduct &&
                itemsProduct?.map((row, index) => {
                    precios.push(row.price);
                });

            let menorAmayor = precios.sort(function (a, b) {
                return a - b;
            });
            let long = menorAmayor.length;

            setMenorPrecio(menorAmayor[0]);
            setMayorPrecio(menorAmayor[long - 1]);
            let item = {
                menorprecio: menorAmayor[0],
                mayorprecio: menorAmayor[long - 1],
            };

            if (filtroprd != 3)
                localStorage.setItem("rangoprecios", JSON.stringify(item));
        }
    }, [itemsProduct]);

    useEffect(() => {
        let numprd = dataPrd?.length;

        let numpag = ((numprd / registrosPorPagina)).toFixed(0);
        let arraypg = [];
        setNumeroPaginas(numpag);

        for (var i = 1; i <= numpag; i++) {
            arraypg.push(i);
        }
        //console.log("productosActuales : ", arraypg);
        dispatch(getNumberPages(arraypg));
    }, [dataPrd, filtrocondprd, openclosecity, changesearchprice]);

    //[itemsPrdTot, filtrocondprd, openclosecity, changesearchprice]);

    useEffect(() => {
        let array = [];
        if ((itemsProduct?.length != productItems?.length && productItems?.length > 0) || updatedata) {
            itemsProduct = productItems;
            itemsPrdTot = productItems;
            dispatch(getUpdateData(false));
        }
    }, [paginaselect, itemsPrdTot, productItems, updatedata])

    useEffect(() => {
        dispatch(getNumberPrdSelect(longprd));
    }, [gripselect, longprd]);

    useEffect(() => {
        //console.log("ITEMPRD 291:", itemsProduct)
        dispatch(getUserMenu(false));
        dispatch(getUserMenuPrimary(false));
        let itemshoppingcartadd = JSON.parse(
            localStorage.getItem("itemshoppingcartadd")
        );

        let contrview = JSON.parse(localStorage.getItem("contrview"));

        //console.log("291 ", addlogin);

        if (addlogin.length > 0) {
            setAddcartId(0);
            localStorage.setItem("itemshoppingcartadd", JSON.stringify(null));
            setAddcartIdLogin(addlogin[0]?.idproducto);
            setAddcartImagen(addlogin[0]?.nombreimagen1);
            setAddcartTitulo(addlogin[0]?.titulonombre);
            setAddcartCantidad(addlogin[0]?.cantidad);
        } else if (contrview == 0) {
            let item = {
                idproducto: 0,
                nombreimagen1: "",
                titulonombre: "",
            };
            setAddcartId(0);
            setAddcartIdLogin(0);
            setAddcartImagen(null);
            setAddcartTitulo(null);
            setAddcartCantidad(0);
            localStorage.setItem("addedtocart", JSON.stringify(item));
        }

        let okwishlist = JSON.parse(localStorage.getItem("itemswishlistadd"));
        if (okwishlist == "Ok") {
            localStorage.setItem("itemswishlistadd", JSON.stringify(null));
            setShowModalMensajes(true);
            setOnOffClick(
                "ps-page ps-page--shopping ml-85 cajaprueba deshabilitar"
            );
            setTituloMensajes("Lista de deseos");
            let texto = "Producto agregado a lista de deseo";
            setTextoMensajes(texto);
        }
    }, [itemsProduct]);

    useEffect(() => {
        let itemshoppingcartadd = JSON.parse(
            localStorage.getItem("itemshoppingcartadd")
        );

        if (itemshoppingcartadd) {
            const controlNumPrdCar = (data) => {
                let continuar = true;

                const leerItemsCarrito = async () => {
                    let params = {
                        usuario: datosusuarios?.uid,
                    };

                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "59",
                        params,
                    });

                    if (res.data.type == 1) {
                        if (res.data.listarcarritocompra.length >= 15) {
                            continuar = false;
                            setShowModalMensajes(true);
                            setTituloMensajes("Carrito de compra");
                            let texto =
                                "Puedes agregar maximo 15 productos al carrito de compra";
                            setTextoMensajes(texto);
                            return;
                        } else validaPrdShoppingCar();
                    } else {
                        console.log("Error leyendo items carrito de compra");
                        continuar = true;
                        validaPrdShoppingCar();
                    }
                };
                leerItemsCarrito();
            };
            controlNumPrdCar();

            const validaPrdShoppingCar = () => {
                localStorage.setItem("contrview", JSON.stringify(0));
                const leerItem = async () => {

                    const leerItems = async () => {
                        let params = {
                            idproducto: itemshoppingcartadd.idproducto,
                            usuario: datosusuarios?.uid,
                        };

                        const res = await axios({
                            method: "post",
                            url: URL_BD_MR + "62", params
                        });

                        if (res.data.listaritemcarrito.length > 0) {
                            console.log("LEER : ", res.data)
                        } else {
                            grabarItemCarrito();
                            //console.log("error")
                        }
                    };

                    leerItems();
                };
                leerItem();
            };

            const grabarItemCarrito = async () => {
                if (leeira != 3) {
                    let params = {
                        compatible: itemshoppingcartadd.compatible,
                        idproducto: itemshoppingcartadd.idproducto,
                        usuario: datosusuarios?.uid,
                        cantidad: 1,
                    };

                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "58", params
                    });

                    if (res.data.type == 1) {
                        const grabarItemCarritoHistorial = async () => {
                            let params = {
                                compatible: itemshoppingcartadd.compatible,
                                idproducto: itemshoppingcartadd.idproducto,
                                usuario: datosusuarios?.uid,
                                cantidad: 1,
                            };

                            const rest = await axios({
                                method: "post",
                                url: URL_BD_MR + "581",
                                params,
                            });

                            if (rest.data.type == 1) {
                                console.log(
                                    "OK item  add carrito de compra"
                                );
                            } else {
                                console.log(
                                    "Error item add carrito de compra"
                                );
                            };
                        };
                        grabarItemCarritoHistorial();

                        const leeItemAgregadoCarrito = async () => {
                            let params = {
                                idproducto: itemshoppingcartadd.idproducto,
                                usuario: datosusuarios?.uid,
                            };

                            const result = await axios({
                                method: "post",
                                url: URL_BD_MR + "62",
                                params,
                            });

                            if (result.data.type == 1) {
                                let item = {
                                    idproducto:
                                        res.data.listaritemcarrito[0]
                                            .idproducto,
                                    nombreimagen1:
                                        res.data.listaritemcarrito[0]
                                            .nombreimagen1,
                                    titulonombre:
                                        res.data.listaritemcarrito[0]
                                            .titulonombre,
                                    cantidad:
                                        res.data.listaritemcarrito[0]
                                            .cantidad,
                                };

                                dispatch(getAddEdToCart(item));
                                localStorage.setItem(
                                    "addedtocart",
                                    JSON.stringify(item)
                                );
                                localStorage.setItem(
                                    "itemshoppingcartadd",
                                    JSON.stringify(null)
                                );
                                localStorage.setItem(
                                    "contrview",
                                    JSON.stringify(1)
                                );
                            } else {
                                console.log(
                                    "Error leyendo items carrito de compra"
                                );
                            };
                        };
                        leeItemAgregadoCarrito();

                        const leerItemsCarrito = async () => {
                            let params = {
                                usuario: datosusuarios?.uid,
                            };

                            const results = await axios({
                                method: "post",
                                url: URL_BD_MR + "59",
                                params,
                            });

                            if (results.data.type == 1) {
                                dispatch(
                                    getDataShoppingCart(
                                        res.data.listarcarritocompra
                                            .length
                                    )
                                );
                            } else {
                                console.log(
                                    "Error leyendo items carrito de compra"
                                );
                            };
                        };
                        leerItemsCarrito();

                    } else {
                        console.log(
                            "Error leyendo items carrito de compra"
                        );
                    }
                }
            };
        }
    }, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("itemaddcart"));
        if (data) {
            setCarPrdId(data?.idproducto);
            setCartImagen(data?.nombreimagen1);
            setCarTitulo(data?.titulonombre);
            setCarCantidad(data?.cantidad);
        }
    }, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("addedtocart"));

        if (data) {
            setAddcartId(data?.idproducto);
            setAddcartImagen(data?.nombreimagen1);
            setAddcartTitulo(data?.titulonombre);
            setAddcartCantidad(data?.cantidad);
        }
    }, [addedtocart]);

    useEffect(() => {
        if (
            keyword != 1 &&
            keyword != 2 &&
            keyword != 3 &&
            keyword != 4 &&
            keyword != 5 &&
            keyword != 6 &&
            keyword != 7
        ) {
            let row = [];
            let item = {
                word: keyword,
            };
            // word: keyword.trim()
            row.push(item);
            localStorage.setItem("keyword", JSON.stringify(row));
        }

        let datax = JSON.parse(localStorage.getItem("keyword"));

        let datay = "";
        if (datax) {
            datay = datax[0]?.word;
        }
        valdata = JSON.parse(localStorage.getItem("placeholdersearch"));
        let filtrocondicionprd = JSON.parse(
            localStorage.getItem("filtrocondicionprd")
        );

        let filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );

        let filtroprecioprd = JSON.parse(
            localStorage.getItem("filtroprecioprd")
        );

        setIsLoading(true);
        if (
            keyword < 7 &&
            filtrocondicionprd == 0 &&
            filtrociudadprd.length == 0 &&
            filtroprecioprd.length == 0 &&
            orderbyprd == 0
        ) {
            cerrarFiltros();
        }
    }, [keyword]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        // Lee numero de items de la consulta //
        const leebdprd = async () => {
            if (dataProd.length == 0) {
                
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "43",
                });

                if (res.data.type == 1) {

                    let datos = res.data.cantidadprdciudad;

                    baseCiudad = datos;

                    const compare = (a, b) => {
                        if (a.nombre_ciu < b.nombre_ciu) {
                            return -1;
                        }
                        if (a.nombre_ciu > b.nombre_ciu) {
                            return 1;
                        }
                        return 0;
                    };

                    if (datos.length > 0) datos.sort(compare);

                    let prdciudaduno = [];
                    let prdciudaddos = [];
                    let allcity = [];
                    datos &&
                        datos.map((row, index) => {
                            if (index % 2 == 0) {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombre_ciu: row.nombre_ciu,
                                    nombreciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaduno.push(item);
                                allcity.push(ciud);
                            } else {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombre_ciu,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaddos.push(item);
                                allcity.push(ciud);
                            }
                        });

                    const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

                    if (!activafiltrociudad) {
                        setPrdCiudadUno(prdciudaduno);
                        setPrdCiudadDos(prdciudaddos);
                        setAllCity(allcity);
                    }

                    if (datos?.length > 0) {
                        setCantidadPrdCiudad(datos);
                        setCantidadPrdCiudadAll(datos);
                        setPrdCiudadUnoAll(prdciudaduno);
                        setPrdCiudadDosAll(prdciudaddos);
                    }

                };
                setOk(false);
            }
        };
        leebdprd();
    }, []);

    useEffect(() => {
        if (clearFiltroCity && filtroCond == 0) {

            dispatch(getOpenCloseCity(0));
            let arrayciud = [];
            let prdciudaduno = [];
            let prdciudaddos = [];

            allprdciud = [];
            itemciud = [];
            itemsProduct &&
                itemsProduct?.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
            setclearFiltroCity(true);
        }
    }, [clearFiltroCity]);

    const cambiar = () => {
        setActivaCiudad(false);
    };

    useEffect(() => {
        if (filtrarciud.length == 0) {
            dispatch(getOpenCloseCity(2));
        }
    }, [filtroCond]);

    useEffect(() => {
        if (longpage == 1) {
            setPagina(longpage);
        }
    }, [longpage]);

    useEffect(() => {
        // Lee numero de items de la consulta //

        let arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        if (citySelected.length == 0) {
            allprdciud = [];
            itemciud = [];
            dataProd = [];

            itemsPrdTot &&
                itemsPrdTot?.map((row, index) => {
                    if (row.genericos != "productosgenericos") {
                        dataProd.push(row);
                    } else {
                        dataProd.push(row);
                    }
                });

            dataProd &&
                dataProd.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {

                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;

                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                //AQUI
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
        } else if (citySelected.length > 0 && filtroCond > 0) {

            let dataalter = dataProd;
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataalter &&
                        dataalter.map((row, index) => {
                            if (
                                row.ciudad == item.idciu &&
                                filtroCond == row.condition
                            ) {
                                dataProd.push(row);
                            }
                        });
                });

        } else if (itemciud.length > 0 && filtroCond > 0) {

            allprdciud = [];
            itemciud = [];

            dataProd &&
                dataProd.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
        } else if (citySelected.length > 0 && filtroCond == 0) {

            let contador = 0;
            allprdciud = [];
            itemciud = [];
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    itemsProduct &&
                        itemsProduct?.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                allprdciud.push(row.ciudad);
                                let validar;
                                validar = itemciud.includes(row.ciudad);
                                dataProd.push(row);
                                if (!validar) {
                                    itemciud.push(row.ciudad);
                                }
                            }
                        });
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });

                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
        }
        setActCiy(false);

    }, [itemsProduct, actCity, citySelected, filtroCond]);

    useEffect(() => {
        if (basePrecios.length > 0) {
            let precios = [];
            basePrecios &&
                basePrecios.map((row, index) => {
                    precios.push(row.price);
                });

            precios.sort(function (a, b) {
                return a - b;
            });
            setMenorPrecio(precios[0]);

            precios.sort(function (a, b) {
                return b - a;
            });
            setMayorPrecio(precios[0]);
        }
    }, [basePrecios, selectGrid]);

    useEffect(() => {
        if (basePrecios.length > 0) {
            let precios = [];
            basePrecios &&
                basePrecios.map((row, index) => {
                    precios.push(row.price);
                });
        }
    }, [precioFiltroMinimo, precioFiltroMaximo]);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordCambia(true);
        }, 500);
        return () => console.log("actualizar");
    }, [wordCambia]);

    useEffect(() => {
        if (!valdata) {
            holder = JSON.parse(localStorage.getItem("findsearch"));

            nombreres = "";
            setResultFind("");

            const queries = {
                name_contains: holder,
            };
            //console.log("BUSXXXX : ", queries);
            getProducts(queries);
        } else if (
            (keyword != 1 &&
                keyword != 2 &&
                keyword != 3 &&
                keyword != 4 &&
                keyword != 5 &&
                keyword != 6 &&
                keyword != 7) ||
            !itemsProduct
        ) {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1) {
                nombreres = ubiposprod;
                //keyword = ubiposprod;
            }

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");

            let keyword1 = keyword?.toLowerCase();
            let keyword2 = keyword1?.replace(",", "");

            const queries = {
                name_contains: keyword2,
            };
            //console.log("BUSCAR : ", queries);
            getProducts(queries);
        } else {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1)
                nombreres = ubiposprod;

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");
        }

        if (holder == 0) {
            let selectvehgarage = JSON.parse(
                localStorage.getItem("selectvehgarage")
            );
            if (selectvehgarage) {
                let data = JSON.parse(
                    localStorage.getItem("placeholdersearch")
                );
                setDataHolder(data);
            } else {
                setDataHolder("");
            }
        }

        let posicionprd = JSON.parse(localStorage.getItem("posicionprd"));
        let subcategorias = JSON.parse(localStorage.getItem("subcategorias"));

        if (posicionprd) {
            let name = subcategorias.find(p => p.codigoposicion == posicionprd)?.nombre;
            //console.log("XXXXX : ", name);

            let keyword = JSON.parse(
                localStorage.getItem("keyword")
            );
            if (keyword) {
                //console.log("KEYWORD : ", keyword[0]?.word)
                setDataHolder(name);
                nombreres = name;
            } else {
                setDataHolder("");
            }
        }

        let selectvehgarage = JSON.parse(localStorage.getItem("selectvehgarage"));

        if (selectvehgarage) {
            //console.log("KEYWORD : ", selectvehgarage)
            let transmision = selectvehgarage?.transmision ? selectvehgarage?.transmision : "";
            let cilindraje = selectvehgarage?.cilinder ? selectvehgarage?.cilinder : "";
            let anno = selectvehgarage?.year ? selectvehgarage?.year : "";
            let combustible = selectvehgarage?.fuel ? selectvehgarage?.fuel : "";
            let traccion = selectvehgarage?.traction ? selectvehgarage?.traction : "";

            let name = selectvehgarage?.body + " " + selectvehgarage?.brand + " "
                + selectvehgarage?.model + " " + transmision + " " + cilindraje + " " + anno + " "
                + traccion + " " + combustible;
            setDataHolder(name);
        }

    }, [keyword, wordCambia, selectGrid]);

    let products = null;
    let productcategory = null;
    let productos = [];
    let productoscategoria = [];
    let mostrarGategorias = false;

    let filtrarciud = [];
    let prdfiltrados = [];

    if (itemsProduct && itemsProduct?.length > 0) {
        //console.log("ITEMSPRD111 : ", itemsProduct)
        //console.log("ITEMSPRD222 : ", productItems)

        controlcond = contCond;

        let esgenerico = JSON.parse(localStorage.getItem("esgenerico"));
        let codigogenerico = JSON.parse(localStorage.getItem("codigogenerico"));
        let itemordenar = JSON.parse(localStorage.getItem("orderbyprd"));
        let texto = JSON.parse(localStorage.getItem("textoorderbyprd"));

        if (itemordenar > 0) {
            if (itemordenar == 1) {
                const compare = (a, b) => {
                    if (a.fechacreacion < b.fechacreacion) {
                        return -1;
                    }
                    if (a.fechacreacion > b.fechacreacion) {
                        return 1;
                    }
                    return 0;
                };
                if (itemsProduct?.length > 0) itemsProduct?.sort(compare);
            }

            if (itemordenar == 2) {
                const compare = (a, b) => {
                    if (b.price < a.price) {
                        return -1;
                    }
                    if (b.price > a.price) {
                        return 1;
                    }
                    return 0;
                };
                if (itemsProduct?.length > 0) itemsProduct?.sort(compare);
            }

            if (itemordenar == 3) {
                const compare = (a, b) => {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1;
                    }
                    return 0;
                };
                if (itemsProduct?.length > 0) itemsProduct?.sort(compare);
            }
        } else {
            if (ordenarPor == 1) {
                const compare = (a, b) => {
                    if (a.fechacreacion < b.fechacreacion) {
                        return -1;
                    }
                    if (a.fechacreacion > b.fechacreacion) {
                        return 1;
                    }
                    return 0;
                };
                if (itemsProduct?.length > 0) itemsProduct?.sort(compare);
            }

            if (ordenarPor == 2) {
                const compare = (a, b) => {
                    if (b.price < a.price) {
                        return -1;
                    }
                    if (b.price > a.price) {
                        return 1;
                    }
                    return 0;
                };
                if (itemsProduct?.length > 0) itemsProduct?.sort(compare);
            }

            if (ordenarPor == 3) {
                const compare = (a, b) => {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1;
                    }
                    return 0;
                };
                if (itemsProduct?.length > 0) itemsProduct?.sort(compare);
            }
        }

        let filtrociudad = [];

        if (citySelected.length > 0) {
            citySelected &&
                citySelected.map((item, index) => {
                    itemsProduct &&
                        itemsProduct?.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                filtrociudad.push(row);
                            }
                        });
                });
        } else {
            filtrociudad = itemsProduct;
        }

        let filtroprecio = [];

        filtrociudad &&
            filtrociudad.map((row, index) => {
                if (
                    row.price >= precioFiltroMinimo &&
                    row.price <= precioFiltroMaximo
                ) {
                    filtroprecio.push(row);
                }
            });

        filtroprecio &&
            filtroprecio.map((row, index) => {
                if (row.productogenerico == "No") {
                    productos.push(row);
                } else {
                    productoscategoria.push(row);
                }
            });

        let productos0 = [];
        let productoscategoria0 = [];
        let prdfiltrocondicion = [];
        let categfiltrocondicion = [];

        const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

        if (activafiltrociudad) {
            const filtrociudadprd = JSON.parse(localStorage.getItem("filtrociudadprd"));
            filtrociudad = filtrociudadprd;

            filtrociudad &&
                filtrociudad.map((item, index) => {
                    productos &&
                        productos.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                productos0.push(row);
                            }
                        });
                });

            filtrociudad &&
                filtrociudad.map((item, index) => {
                    productoscategoria &&
                        productoscategoria.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                productoscategoria0.push(row);
                            }
                        });
                });

        } else {
            productos0 = productos;
            productoscategoria0 = productoscategoria;
        }

        if (filtroCond > 0) {
            productos0 &&
                productos0.map((row, index) => {
                    if (row.condition == filtroCond) {
                        prdfiltrocondicion.push(row);
                    }
                });

            productoscategoria0 &&
                productoscategoria0.map((row, index) => {
                    if (row.condition == filtroCond) {
                        categfiltrocondicion.push(row);
                    }
                });
        } else {
            prdfiltrocondicion = productos0;
            categfiltrocondicion = productoscategoria0;
        }

        let ciudsel = [];
        let itemciud = [];
        cantidadPrdCiudad &&
            cantidadPrdCiudad.map((row, index) => {
                categfiltrocondicion &&
                    categfiltrocondicion.map((item, index) => {
                        if (row.idciu == item.ciudad) {
                            let validar;
                            validar = itemciud.includes(row.idciu);
                            if (!validar) {
                                itemciud.push(row.ciudad);
                                ciudsel.push(row);
                            }
                            prdfiltrados.push(item);
                        }
                    });
            });

        cantidadPrdCiudad &&
            cantidadPrdCiudad.map((row, index) => {
                prdfiltrocondicion &&
                    prdfiltrocondicion.map((item, index) => {
                        if (row.idciu == item.ciudad) {
                            let validar;
                            validar = itemciud.includes(row.idciu);
                            if (!validar) {
                                itemciud.push(row.ciudad);
                                ciudsel.push(row);
                            }
                            prdfiltrados.push(item);
                        }
                    });
            });

        if (!activafiltrociudad)
            filtrarciud = ciudsel;

        if (!dataPayload && categfiltrocondicion.length > 0)
            mostrarGategorias = true;

        let allprdciud2 = [];
        let itemciud2 = [];
        let allprd2 = [];

        prdfiltrocondicion &&
            prdfiltrocondicion.map((row, index) => {
                allprd2.push(row)
            });

        categfiltrocondicion &&
            categfiltrocondicion.map((row, index) => {
                allprd2.push(row)
            });

        allprd2 &&
            allprd2.map((row, index) => {
                let validar;
                validar = itemciud2.includes(row.ciudad);
                if (!validar) {
                    itemciud2.push(row.ciudad);
                }
            });

        const compareAsc = (a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        };

        const compareDesc = (a, b) => {
            if (b.price < a.price) {
                return -1;
            }
            if (b.price > a.price) {
                return 1;
            }
            return 0;
        };

        //console.log("PROD2AASSA : ", allprd2)

        let rangomenor = 0;
        if (allprd2.length > 0) allprd2.sort(compareAsc);

        if (allprd2?.length > 0)
            rangomenor = allprd2[0]?.price;

        let rangomayor = 0;
        if (allprd2.length > 0) allprd2.sort(compareDesc);

        if (allprd2?.length > 0)
            rangomayor = allprd2[0]?.price;

        if (!allprd2?.length || allprd2?.length == 0) {
            let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
            rangomenor = rangoprecios?.menorprecio;
            rangomayor = rangoprecios?.mayorprecio;
        }

        let rangpre = {
            menorprecio: rangomenor,
            mayorprecio: rangomayor,
        };

        //console.log("RANGREXACAS : ", rangpre);

        if (rangomenor != 1 && rangomayor != 10000000) {
            localStorage.setItem(
                "filtroprecioprd",
                JSON.stringify(rangpre)
            );
        }

        localStorage.setItem("rangoprecios", JSON.stringify(rangpre));
        // Coloca los datos en state range de precios
        dispatch(getRangosPrecio(rangpre));

        itemciud2 &&
            itemciud2.map((item, ind) => {
                let contador = 0;
                let dat;
                allprd2 &&
                    allprd2.map((row, index) => {
                        if (item == row.ciudad) {
                            contador = parseInt(contador) + 1;
                            dat = {
                                id: index,
                                idciu: row.ciudad,
                                ciudad: row.ciudad,
                                nombreciu: row.nombreciudad,
                                nombre_ciu: row.nombreciudad,
                                productosciudad: contador,
                            }
                        }
                    });
                allprdciud2.push(dat);
            });

        dataPrd = allprd2;

        let contar = 0;
        let productosUno = [];
        let productosDos = [];

        //console.log("NUMPAGPRD : ", prdfiltrocondicion)
        //console.log("NUMPAGCATEG : ", categfiltrocondicion)

        //console.log("NUMPAGINI : ", itemsIni)
        //console.log("NUMPAGFIN : ", itemsFin)

        if (prdfiltrocondicion?.length > 0) {
            prdfiltrocondicion &&
                prdfiltrocondicion.map((row, index) => {

                    productosUno.push(row);
                    contar = parseInt(contar) + parseInt(1);

                });
        }

        if (categfiltrocondicion?.length > 0) {
            categfiltrocondicion &&
                categfiltrocondicion.map((row, index) => {


                    productosDos.push(row);
                    contar = parseInt(contar) + parseInt(1);


                });
        }

        //console.log("NUMPAG333 : ", numeroPaginas);
        //console.log("NUMPAG : ", dataPrd);
        //console.log("NUMPAG111 : ", productosUno);
        //console.log("NUMPAG222 : ", productosDos);

        longprd = dataPrd.length;
        filtrarciud = allprdciud2;
        //setCantidadPrdCiudad(allprdciud2);
        const inicio = (pagina - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        const arrayUnido = [...productosUno, ...productosDos];

        const totalItems = arrayUnido.length;
        totalPaginas = Math.ceil(totalItems / itemsPorPagina);

        const productosPagina = arrayUnido.slice(inicio, fin);

        const productosNormales = productosPagina.filter(p => p.productogenerico == 'No');
        const productosRecomendados = productosPagina.filter(p => p.productogenerico == 'Si');

        //console.log("productosnormales", productosNormales)
        //console.log("productosrecomendados", productosRecomendados)

        const esUltimoProductoNormal = (inicio + productosNormales.length - 1) >= productosUno.length - 1;

        if (selectGrid == 1) {
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                productcategory = withGridDos(productosRecomendados, loading, 4);
            }
            products = withGridDos(productosNormales, loading, 4);
        } else if (selectGrid == 2) {
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                productcategory = withListMaximize(productosRecomendados, loading, 4);
            }
            products = withListMaximize(productosNormales, loading, 4);
        } else if (selectGrid == 3) {
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                productcategory = withListView(productosRecomendados, loading, 4);
            }
            products = withListView(productosNormales, loading, 4);
        } else {
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                productcategory = withGridDos(productosRecomendados, loading, 4);
            }
            products = withGridDos(productosNormales, loading, 4);
        }
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    useEffect(() => {
        if (filtrarciud?.length > 0 && cantidadPrdCiudad?.length == 0) {
            setCantidadPrdCiudad(filtrarciud);
        }
    }, [filtrarciud])

    useEffect(() => {
        if (openclosecity == 1) {

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));
            if (activafiltrociudad) {
                const filtrociudadprd = JSON.parse(localStorage.getItem("filtrociudadprd"));
                const dataciudadprd = JSON.parse(localStorage.getItem("filtrarciud"));

                if (filtrociudadprd.length > 0) {
                    filtrarciud = filtrociudadprd;

                    setCantidadPrdCiudad(filtrociudadprd);

                    let prdciudaduno = [];
                    let prdciudaddos = [];
                    let allcity = [];
                    filtrociudadprd &&
                        filtrociudadprd.map((row, index) => {
                            if (index % 2 == 0) {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombre_ciu,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaduno.push(item);
                                allcity.push(ciud);
                            } else {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombre_ciu,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaddos.push(item);
                                allcity.push(ciud);
                            }
                        });

                    setPrdCiudadUno(prdciudaduno);
                    setPrdCiudadDos(prdciudaddos);
                    setAllCity(allcity);

                } else {
                    setPrdCiudadUno([]);
                    setPrdCiudadDos([]);
                    setAllCity([]);
                }
            }
        } else {
            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (!activafiltrociudad && itemsProduct?.length > 0) {
                let allprdciud2 = [];
                let itemciud2 = [];
                let allprd2 = [];

                itemsProduct &&
                    itemsProduct?.map((row, index) => {
                        let validar;
                        validar = itemciud2.includes(row.ciudad);
                        if (!validar) {
                            itemciud2.push(row.ciudad);
                        }
                    });

                itemciud2 &&
                    itemciud2.map((item, ind) => {
                        let contador = 0;
                        let dat;
                        itemsProduct &&
                            itemsProduct?.map((row, index) => {
                                if (item == row.ciudad) {
                                    contador = parseInt(contador) + 1;
                                    dat = {
                                        id: index,
                                        idciu: row.ciudad,
                                        ciudad: row.ciudad,
                                        nombreciu: row.nombreciudad,
                                        nombre_ciu: row.nombreciudad,
                                        productosciudad: contador,
                                    }
                                }
                            });
                        allprdciud2.push(dat)
                    });

                //const filtrociudadprd = allprdciud2;
                //const dataciudadprd = allprdciud2;

                if (filtrocondprd == 0 && (openclosecity == 0 || openclosecity == 2 || !changesearchprice)) {
                    setPrdCiudadUno(PrdCiudadUnoAll);
                    setPrdCiudadDos(PrdCiudadDosAll);
                    setCantidadPrdCiudad(cantidadPrdCiudadAll);
                }
                else
                    setCantidadPrdCiudad(allprdciud2);

                localStorage.setItem("filtrociudadprd", JSON.stringify(citySelected));
                localStorage.setItem("dataciudadprd", JSON.stringify(citySelected));

                let datos = allprdciud2;

                baseCiudad = datos;

                const compare = (a, b) => {
                    if (a.nombre_ciu < b.nombre_ciu) {
                        return -1;
                    }
                    if (a.nombre_ciu > b.nombre_ciu) {
                        return 1;
                    }
                    return 0;
                };

                if (datos.length > 0) datos.sort(compare);

                let prdciudaduno = [];
                let prdciudaddos = [];
                let allcity = [];
                datos &&
                    datos.map((row, index) => {
                        if (index % 2 == 0) {
                            let item = {
                                id: index,
                                idciu: row.idciu,
                                nombre_ciu: row.nombre_ciu,
                                productosciudad: row.productosciudad,
                            };

                            let ciud = {
                                id: index,
                                idciu: row.idciu,
                                nombreciu: row.nombreciu,
                                nombre_ciu: row.nombreciu,
                                productosciudad: row.productosciudad,
                            };

                            prdciudaduno.push(item);
                            allcity.push(ciud);
                        } else {
                            let item = {
                                id: index,
                                idciu: row.idciu,
                                nombre_ciu: row.nombre_ciu,
                                productosciudad: row.productosciudad,
                            };

                            let ciud = {
                                id: index,
                                idciu: row.idciu,
                                nombreciu: row.nombreciu,
                                nombre_ciu: row.nombreciu,
                                productosciudad: row.productosciudad,
                            };

                            prdciudaddos.push(item);
                            allcity.push(ciud);
                        }
                    });

                if (!activafiltrociudad) {
                    setPrdCiudadUno(prdciudaduno);
                    setPrdCiudadDos(prdciudaddos);
                    setAllCity(allcity);
                }

                if (datos?.length > 0) {
                    if (filtrocondprd == 0 && (openclosecity == 0 || openclosecity == 2 || !changesearchprice)) {
                        setPrdCiudadUno(PrdCiudadUnoAll);
                        setPrdCiudadDos(PrdCiudadDosAll);
                        setCantidadPrdCiudad(cantidadPrdCiudadAll);
                    } else
                        setCantidadPrdCiudad(datos);
                }

            }
        }
    }, [openclosecity])

    useEffect(() => {
        setOk(true);
    }, [itemsPaginas]);


    useEffect(() => {
        if (selectGrid == 1) {
            if (isMdDown) {
                registrosPorPagina = 12;
            } else {
                registrosPorPagina = 20;
            }
        } else if (selectGrid == 2) {
            if (isMdDown) {
                registrosPorPagina = 17;
            } else {
                registrosPorPagina = 30;
            }
        } else if (selectGrid == 3) {
            registrosPorPagina = 10;
        }
    }, [selectGrid, isMdDown]);


    const cerrarCity = (dato) => {
        let ciudades = citySelected;
        let citysel = [];
        let contcity = [];
        ciudades &&
            ciudades.map((item, index) => {
                if (dato != item.idciu) {
                    citysel.push(item);
                } else setEraseCitySel(dato);
            });
        setCitySelected(citysel);
    };

    useEffect(() => {
        let filtrociudadprd = [];
        filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );
        if (filtrociudadprd.length == 0) {
            setCitySelected([]);
        }
        let row = [];

        row.push([]);
        dispatch(
            getAddLogin(row)
        );
    }, [])

    const cerrarFiltros = () => {
        setPrecioFiltroMinimo(1);
        setPrecioFiltroMaximo(100000000);
        setFiltroPrecio(false);
        setMenorPrecio(1);
        setMayorPrecio(100000000);

        setCerrarFiltro(true);
        setCitySelected([]);
        setSelected([]);
        setmarcaSelected("");
        setCondition(null);
        setitemSel(0);
        setitemSelCond(0);
        setFiltroCond(0);
        setMarcarCondicion("");
        setOrdenarPor(0);
        setTextoOrdenar("Ordenar por");
    };

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

    useEffect(() => {
        if (citySelected.length > 0) {
            localStorage.setItem(
                "filtrociudadprd",
                JSON.stringify(citySelected)
            );
        }
        if (citySelected.length > 0 && filtroCond > 0) {
            setClassCity("colorcerrarselectlocationdos apuntador");
            setClassCondicion("mt-60 mlmenos35");
            setClassCitySel("");
        } else {
            setClassCondicion("mt-60 mlmenos230");
            setClassCity("colorcerrarselectlocation apuntador");
            setClassCitySel("mlmenos50");
        }

        if (citySelected.length > 0) {
            dispatch(getFiltroPrd(2));
        }
    }, [citySelected, filtroCond]);

    useEffect(() => {
        let filtrocondicionprd = JSON.parse(
            localStorage.getItem("filtrocondicionprd")
        );
        let filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );
        if (filtrociudadprd.length > 0) {
            dispatch(getFiltroPrd(2));
        }
        let filtroprecioprd = JSON.parse(
            localStorage.getItem("filtroprecioprd")
        );
        if (filtroprecioprd.length > 0) {
            dispatch(getFiltroPrd(3));
            setPrecioFiltroMinimo(filtroprecioprd[0]?.preminimo);
            setPrecioFiltroMaximo(filtroprecioprd[0]?.premaximo);
        } else {
            let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
            if (rangoprecios) {
                setPrecioFiltroMinimo(rangoprecios.menorprecio);
                setPrecioFiltroMaximo(rangoprecios.mayorprecio);
                setMenorPrecio(rangoprecios.menorprecio);
                setMayorPrecio(rangoprecios.mayorprecio);
            }
        }
    }, []);

    useEffect(() => {
        let filtrocondicionprd = JSON.parse(
            localStorage.getItem("filtrocondicionprd")
        );
        let filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );
        let filtroprecioprd = JSON.parse(
            localStorage.getItem("filtroprecioprd")
        );

        if (
            filtrocondicionprd == 0 &&
            filtrociudadprd.length == 0 &&
            filtroprecioprd.length == 0 &&
            orderbyprd == 0
        ) {
            cerrarFiltros();
        }

        if (itemsProduct) {
            if (itemsProduct?.length != dataProd.length) dataProd = itemsProduct;
        }
    }, [itemsProduct]);

    const SelectCondition = (item) => {
        if (filtroCond == item) {
            localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        }
        if (item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setMarcarCondicion("");
        } else if (item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setMarcarCondicion("");
        }
    };

    const encontrar = () => {
        if (datosusuarios?.activo == 30) {
            setDisableEnable("deshabilitar");
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Productos MR");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }

        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        localStorage.setItem("eraseplaceholder", JSON.stringify(0));
        Router.push("/Contactanos/");
    };

    const onSelectPrd = () => {
        localStorage.setItem("selectpage", JSON.stringify(paginaSel));
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [addcartId, addcartCantidad, paginaselect]);

    useEffect(() => {
        window.addEventListener("beforeunload", reiniciarCartItem());
    }, []);

    const reiniciarCartItem = () => {
        let item = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
        };
        setAddcartId(0);
        setAddcartImagen(null);
        setAddcartTitulo(null);
        setAddcartCantidad(0);
        localStorage.setItem("addedtocart", JSON.stringify(item));
    };

    const limpiarFiltro = () => {
        localStorage.setItem("activafiltrociudad", JSON.stringify(false));
        //setActivoFiltroCiud(false);
        dispatch(getOpenCloseCity(0));
        setActivar("habilitar");
        //setCiudades([]);
        setCitySelected([]);
        //setCiudadesSel([]);
        ciudadesAlt = [];
        ciudadesselAlt = [];
        setCerrarFiltro(false);
        setSelected([]);
        setActivaCiudad(false);
        setActCiy(true);
        setIrInicio(true);
        setPaginaSel(1);
        setitemIni(1);
        setItemFin(40);
        setclearFiltroCity(true);
    };

    //console.log("citySelected : ", citySelected);

    useEffect(() => {
        if (citySelected.length == 0) {
            localStorage.setItem("filtrociudadprd", JSON.stringify([]));
            localStorage.setItem("activafiltrociudad", JSON.stringify(false));
        }
    }, [citySelected, cantidadPrdCiudad, PrdCiudadUno, PrdCiudadDos]);

    const containerProduRef2 = useRef(null);

    const handleChange = (event, value) => {
        setPagina(value);
        sessionStorage.setItem('paginaActualGeneral', value);
        dispatch(getLongPage(value));

        // Verifica si el contenedor existe y realiza scroll suave 
        setTimeout(() => {
            containerProduRef2.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    useEffect(() => {
        const url = sessionStorage.getItem('urlProduct');
        const cameFromProductPage2 = localStorage.getItem('cameFromProductPage2');

        if (cameFromProductPage2 == 'true' && url && url.includes('/product/')) {

            // Si la URL contiene '/product/', significa que venimos de la vista de detalle
            const paginaGuardada = sessionStorage.getItem('paginaActualGeneral');
            if (paginaGuardada) {
                setPagina(Number(paginaGuardada)); // Recuperamos la página guardada
            }
            localStorage.removeItem('cameFromProductPage2');
        } else {
            sessionStorage.removeItem('paginaActualGeneral');
            // Si no venimos de la vista de detalle, establecemos la página en 1
            setPagina(1);
        }

    }, []);

    return (
        <ContainerResult>
            <ModalMensajesWishListSearch
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
                setOnOffClick={setOnOffClick}
            />
            <ModalControlAcceso
                shown={showModalControlAcceso}
                close={setShowModalControlAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />
            <div className={onOffClick} ref={irA}>
                <div className="container pr-0" id="section-1">
                    <div className="ps-page__header">
                        <BreadCumbBusqueda breacrumb={breadcrumb} />

                        {agregarCarrito ? (
                            <AddShoppingCart data={dataCart} />
                        ) : null}
                        {
                            console.log("IMGPRD : ", carImagen)
                        }
                        {addcartId > 0 ? (
                            <div className="productoagregarcarrito">
                                <ViewAddShoppingCart
                                    idproducto={addcartId}
                                    nombreimagen1={addcartImagen}
                                    titulonombre={addcartTitulo}
                                />
                            </div>
                        ) : addcartIdLogin > 0 ? (
                            <div className="productoagregarcarrito">
                                <ViewAddShoppingCart
                                    idproducto={addcartIdLogin ? addcartIdLogin : carPrdId}
                                    nombreimagen1={addcartImagen ? addcartImagen : carImagen}
                                    titulonombre={addcartTitulo ? addcartTitulo : carTitulo}
                                />
                            </div>
                        ) : null}

                        <br />

                        <div className="none1300px tituloResultadosMain">
                            {holder == 0 ? (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {dataHolder?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {dataHolder.substr(0, 86)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproddos">
                                                    {dataHolder.substr(87, 88)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultprodtres">
                                                    {dataHolder.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {dataHolder?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            ) : resultFind == "" ||
                                !resultFind ||
                                !keyword ||
                                activaCiudad ||
                                !activaCiudad ||
                                actCity ? (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {nombreres?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {nombreres?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproddos">
                                                    {nombreres?.substr(87, 88)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultprodtres">
                                                    {nombreres?.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {nombreres?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            ) : keyword != resultFind ||
                                activaCiudad ||
                                !activaCiudad ||
                                actCity ? (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {resultFind?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {resultFind?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproddos">
                                                    {resultFind.substr(87, 88)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultprodtres">
                                                    {resultFind?.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {resultFind?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            ) : (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {keyword?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {keyword.substr(0, 86)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproddos">
                                                    {keyword.substr(87, 88)}
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultprodtres">
                                                    {keyword.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {keyword.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            )}
                        </div>

                        <div className="titleHiddeMainResults">
                            {holder == 0 ? (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {dataHolder?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {dataHolder.substr(0, 86)} {dataHolder.substr(87, 88)} {dataHolder.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {dataHolder?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            ) : resultFind == "" ||
                                !resultFind ||
                                !keyword ||
                                activaCiudad ||
                                !activaCiudad ||
                                actCity ? (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {nombreres?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {nombreres?.substr(0, 86)} {nombreres?.substr(87, 88)} {nombreres?.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {nombreres?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            ) : keyword != resultFind ||
                                activaCiudad ||
                                !activaCiudad ||
                                actCity ? (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {resultFind?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {resultFind?.substr(0, 86)} {resultFind.substr(87, 88)} {resultFind?.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {resultFind?.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            ) : (
                                <a className="textoresultprod mlmenos51 ps-page__heading">
                                    {keyword?.length > 70 ? (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {keyword.substr(0, 86)} {keyword.substr(87, 88)} {keyword.substr(175, 88)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <p className="textoresultproduno">
                                                    ({longprd}) Resultado de la
                                                    búsqueda:{" "}
                                                    {keyword.substr(0, 86)}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    )}
                                </a>
                            )}
                        </div>

                    </div>

                    <div className="mtmenos95">
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={2} md={2} lg={2} className="none1200px">
                                {filtroCond > 0 ? (
                                    <div className="mlmenos11 mt-60">
                                        {filtroCond == 1 ? (
                                            <div className="mlmenos35 tamañotextociudadeselect">
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={8}
                                                        md={8}
                                                        lg={8}>
                                                        <a className="">
                                                            Nuevo
                                                        </a>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1}
                                                        md={1}
                                                        lg={1}>
                                                        <a
                                                            className="colorxcerrarfiltro apuntador"
                                                            onClick={() =>
                                                                SelectCondition(
                                                                    1
                                                                )
                                                            }>
                                                            {" X "}
                                                        </a>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ) : filtroCond == 2 ? (
                                            <div className="mlmenos35 tamañotextociudadeselect">
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={8}
                                                        md={8}
                                                        lg={8}>
                                                        <a className="">
                                                            Usado
                                                        </a>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1}
                                                        md={1}
                                                        lg={1}>
                                                        <a
                                                            className="colorxcerrarfiltro apuntador"
                                                            onClick={() =>
                                                                SelectCondition(
                                                                    2
                                                                )
                                                            }>
                                                            {" X "}
                                                        </a>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="mt-50"></div>
                                )}
                            </Grid>

                            <div className="contenedor-ciudades">
                                <Grid container spacing={1} columns={12}>

                                    {/* Condición (Nuevo / Usado) */}
                                    {filtroCond > 0 && (
                                        <Grid item xs={6} sm={4} md={2.4}>
                                            <div className="contSelectedItemResultsMobile">
                                                <p>{filtroCond === 1 ? "Nuevo" : "Usado"}</p>
                                                <IoClose onClick={() => SelectCondition(filtroCond)} />
                                            </div>
                                        </Grid>
                                    )}

                                    {/* Ciudades seleccionadas */}
                                    {citySelected?.length === 1 ? (
                                        <Grid item xs={6} sm={4} md={2.4} key={citySelected[0]?.idciu}>
                                            <div className="contSelectedItemResultsMobile">
                                                <p>{citySelected[0]?.nombreciu}</p>
                                                <IoClose onClick={limpiarFiltro} />
                                            </div>
                                        </Grid>
                                    ) : citySelected?.length === 2 ? (
                                        <>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[0]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[0]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[0]?.idciu)} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[1]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[1]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[1]?.idciu)} />
                                                </div>
                                            </Grid> </>
                                    ) : citySelected?.length === 3 ? (
                                        <>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[0]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[0]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[0]?.idciu)} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[1]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[1]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[1]?.idciu)} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[2]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[2]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[2]?.idciu)} />
                                                </div>
                                            </Grid>
                                        </>
                                    ) : citySelected?.length === 4 ? (
                                        <>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[0]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[0]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[0]?.idciu)} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[1]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[1]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[1]?.idciu)} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[2]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[2]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[2]?.idciu)} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={4} md={2.4} key={citySelected[3]?.idciu}>
                                                <div className="contSelectedItemResultsMobile">
                                                    <p>{citySelected[3]?.nombreciu}</p>
                                                    <IoClose onClick={() => cerrarCity(citySelected[3]?.idciu)} />
                                                </div>
                                            </Grid>
                                        </>
                                    ) : null}

                                </Grid>
                            </div>

                            <Grid
                                item
                                xs={9}
                                md={9}
                                lg={9}
                                className="mlmenos4 none1200px ">
                                {citySelected.length == 1 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : citySelected?.length == 2 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[1]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[1]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : citySelected?.length == 3 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[1]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[1]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[2]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[2]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : citySelected?.length == 4 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[1]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[1]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[2]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[2]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[3]?.nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[3]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : (
                                    <div className="mtmenos90"></div>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <div className=" mlmenos45">
                        <div className="ps-layout--with-sidebar">
                            <div className="ps-layout__left">
                                <SidebarShopResults
                                    filtrarciud={filtrarciud}
                                    prdfiltrados={prdfiltrados}
                                    setCantidadPrdCiudad={setCantidadPrdCiudad}
                                    cantidadPrdCiudad={cantidadPrdCiudad}
                                    PrdCiudadUno={PrdCiudadUno}
                                    PrdCiudadDos={PrdCiudadDos}
                                    setActivar={setActivar}
                                    menorprecio={menorprecio}
                                    mayorprecio={mayorprecio}
                                    setMenorPrecio={setMenorPrecio}
                                    setMayorPrecio={setMayorPrecio}
                                    precioFiltroMinimo={precioFiltroMinimo}
                                    setPrecioFiltroMinimo={
                                        setPrecioFiltroMinimo
                                    }
                                    precioFiltroMaximo={precioFiltroMaximo}
                                    setPrecioFiltroMaximo={
                                        setPrecioFiltroMaximo
                                    }
                                    setSelected={setSelected}
                                    marcaSelected={marcaSelected}
                                    setmarcaSelected={setmarcaSelected}
                                    marcarCondicion={marcarCondicion}
                                    setMarcarCondicion={setMarcarCondicion}
                                    condition={condition}
                                    setCondition={setCondition}
                                    numProdRel={numProdRel}
                                    setActivaCiudad={setActivaCiudad}
                                    activaCiudad={activaCiudad}
                                    itemSel={itemSel}
                                    setitemSel={setitemSel}
                                    itemSelCond={itemSelCond}
                                    setitemSelCond={setitemSelCond}
                                    setFiltroCond={setFiltroCond}
                                    filtroCond={filtroCond}
                                    cerrarFiltro={cerrarFiltro}
                                    setCerrarFiltro={setCerrarFiltro}
                                    setEraseCitySel={setEraseCitySel}
                                    eraseCitySel={eraseCitySel}
                                    setCitySelected={setCitySelected}
                                    citySelected={citySelected}
                                    setIrInicio={setIrInicio}
                                    setActCiy={setActCiy}
                                    actCity={actCity}
                                    setPaginaSel={setPaginaSel}
                                    setitemIni={setitemIni}
                                    setItemFin={setItemFin}
                                    setclearFiltroCity={setclearFiltroCity}
                                    setFiltroPrecio={setFiltroPrecio}
                                    longprd={longprd}
                                    dataPrd={dataPrd}
                                    productItems={itemsProduct}
                                />
                            </div>
                            <div className="ps-layout__right tamañocontainerresult">
                                <ModuleShopResults
                                    setSelectGrid={setSelectGrid}
                                    itemsPaginas={itemsPaginas}
                                    setItemsPaginas={setItemsPaginas}
                                    ordenarPor={ordenarPor}
                                    setOrdenarPor={setOrdenarPor}
                                    textoOrdenar={textoOrdenar}
                                    setTextoOrdenar={setTextoOrdenar}
                                    // 
                                    filtrarciud={filtrarciud}
                                    prdfiltrados={prdfiltrados}
                                    setCantidadPrdCiudad={setCantidadPrdCiudad}
                                    cantidadPrdCiudad={cantidadPrdCiudad}
                                    PrdCiudadUno={PrdCiudadUno}
                                    PrdCiudadDos={PrdCiudadDos}
                                    setActivar={setActivar}
                                    menorprecio={menorprecio}
                                    mayorprecio={mayorprecio}
                                    setMenorPrecio={setMenorPrecio}
                                    setMayorPrecio={setMayorPrecio}
                                    precioFiltroMinimo={precioFiltroMinimo}
                                    setPrecioFiltroMinimo={
                                        setPrecioFiltroMinimo
                                    }
                                    precioFiltroMaximo={precioFiltroMaximo}
                                    setPrecioFiltroMaximo={
                                        setPrecioFiltroMaximo
                                    }
                                    setSelected={setSelected}
                                    marcaSelected={marcaSelected}
                                    setmarcaSelected={setmarcaSelected}
                                    marcarCondicion={marcarCondicion}
                                    setMarcarCondicion={setMarcarCondicion}
                                    condition={condition}
                                    setCondition={setCondition}
                                    numProdRel={numProdRel}
                                    setActivaCiudad={setActivaCiudad}
                                    activaCiudad={activaCiudad}
                                    itemSel={itemSel}
                                    setitemSel={setitemSel}
                                    itemSelCond={itemSelCond}
                                    setitemSelCond={setitemSelCond}
                                    setFiltroCond={setFiltroCond}
                                    filtroCond={filtroCond}
                                    cerrarFiltro={cerrarFiltro}
                                    setCerrarFiltro={setCerrarFiltro}
                                    setEraseCitySel={setEraseCitySel}
                                    eraseCitySel={eraseCitySel}
                                    setCitySelected={setCitySelected}
                                    citySelected={citySelected}
                                    setIrInicio={setIrInicio}
                                    setActCiy={setActCiy}
                                    actCity={actCity}
                                    setPaginaSel={setPaginaSel}
                                    setitemIni={setitemIni}
                                    setItemFin={setItemFin}
                                    setclearFiltroCity={setclearFiltroCity}
                                    setFiltroPrecio={setFiltroPrecio}
                                    longprd={longprd}
                                    dataPrd={dataPrd}
                                    productItems={itemsProduct}
                                />
                                <div ref={containerProduRef2}>
                                    <div className="mtmenos25 pb-3">
                                        <Grid container spacing={0} className="none1310px">
                                            <Grid item xs={12} md={12} lg={12}>
                                                <a className="textoclicaqui">
                                                    Si no encuentras lo que
                                                    buscas,{" "}
                                                    <a
                                                        className="subrayartextoclicaqui"
                                                        onClick={() =>
                                                            encontrar()
                                                        }>
                                                        haz clic aquí
                                                    </a>
                                                </a>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            className="none1310px"
                                            container
                                            alignItems="center"
                                            spacing={0}>
                                            <Grid item xs={6} md={6} lg={6}>
                                                {productos.length == 0 &&
                                                    !isLoading ? (
                                                    <h2 className="ml-1 mtmenos5 tamañotextotoken">
                                                        Producto no encontrado
                                                    </h2>
                                                ) : null}
                                            </Grid>
                                        </Grid>
                                        <div className="topInfoResulados">
                                            {productos.length == 0 &&
                                                !isLoading ? (
                                                <h5>Producto no encontrado</h5>
                                            ) : null}
                                            <p>Si no encuentras lo que buscas, <a onClick={() => encontrar()}>haz clic aquí</a></p>
                                        </div>
                                    </div>
                                    <br />

                                    {isLoading ? <LoadingSearchResult /> : null}
                                    <div className={disableEnable}>
                                        <div className="mtmenos20">
                                            {productos.length > 0 ? (
                                                <div
                                                    className={activar}
                                                    onClick={() =>
                                                        onSelectPrd()
                                                    }>
                                                    <ShopSearch classes="ps-shop--grid disableEnable">
                                                        {products}
                                                    </ShopSearch>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    {dataPayload || mostrarGategorias ? (
                                        <div>
                                            <div className="infoprodgenericos">
                                                ** Estos productos son
                                                recomendados para ti, pero
                                                pueden no coincidir exactamente
                                                con tu búsqueda **{" "}
                                            </div>
                                            <div className={disableEnable}>
                                                <div className="mt-20">
                                                    <ShopSearch classes="ps-shop--grid">
                                                        {productcategory}
                                                    </ShopSearch>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="ps-shop__footer">
                                    <Stack spacing={2} alignItems="center" className="mt-[20px]">
                                        <StyledPagination
                                            count={totalPaginas}
                                            page={pagina}
                                            onChange={handleChange}
                                            variant="outlined"
                                            shape="rounded"
                                        />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="positionfootermainsearchini">
                        <FooterDefault />
                    </div>
                </div>
            </div>
        </ContainerResult>
    );
};

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


export default SearchResultScreen;
