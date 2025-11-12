import React, { useState, useEffect } from "react";
import Link from "next/link";
import useProduct from "~/hooks/useProduct";
import { Row, Col } from "react-bootstrap";
import { myNumber } from "../../../utilities/ArrayFunctions";
import RatingPrdSingleView from "~/components/elements/products/modules/RatingPrdSingleView";
import EstadoProducto from "~/components/elements/products/modules/EstadoProducto";

import { PiCheckFatFill } from "react-icons/pi";

import ModalMensajesWishList from "../../../pages/mensajes/ModalMensajesWishList";
import ModalMensajesSoyNuevo from "../../../pages/mensajes/ModalMensajesSoyNuevo";
import ModalControlAcceso from "../../../pages/mensajes/ModalControlAcceso";

import ModalMensajesWishListControl from "../../../pages/mensajes/ModalMensajesWishListControl";
import ModalMensajes from "../../../pages/mensajes/ModalMensajes";
import axios from "axios";
import { getDataWishList } from "../../../store/datawishlist/action";
import { getDataShoppingCart } from "../../../store/datashoppingcart/action";
import { getAddEdToCart } from "../../../store/addedtocart/action";
import { getLeeIra } from "../../../store/leeira/action";
import { getBlockScreen } from "../../../store/blockscreen/action";
import { useDispatch, connect, useSelector } from "react-redux";

import { getViewSearch } from "../../../store/viewsearch/action";
import { getSelectViewPrd } from "../../../store/selectviewprd/action";
import { getViewCheckout } from "../../../store/viewcheckout/action";

import { useRouter } from "next/router";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
let itemmasselect = [];
let itemmenosselect = [];

const ProductListPhotoImageSearchDos = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pricesearch, badges } = useProduct();
    const [unidadesSelect, setunidadesSelect] = useState(1);
    const [classUnd, setClassUnd] = useState(0);
    const [classUndMas, setClassUndMas] = useState(0);

    const [showModalMensajesInfo, setShowModalMensajesInfo] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);
    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState(false);
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState(false);

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    const [soyNuevo, setSoyNuevo] = useState(false);
    const [TengoCuenta, setTengoCuenta] = useState(false);
    //soynuevo, tengocuenta, seguir

    const [login, setLogin] = useState(false);

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        //addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, "cart");
        //dispatch(toggleDrawer(true));
    }

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        if (unidadesSelect == 0) {
            setClassUnd("botonescontrolunidadesmenos sinborder deshabilitar");
        } else {
            setClassUnd("botonescontrolunidadesmenos sinborder");
        }

        if (unidadesSelect >= product.numerounidades) {
            setClassUndMas("botonescontrolunidades sinborder deshabilitar");
        } else {
            setClassUndMas("botonescontrolunidades sinborder");
        }
        //product.numerounidades
    }, [unidadesSelect]);

    const selCantidad = (cant) => {
        let cantidad = parseInt(unidadesSelect) + parseInt(cant);
        setunidadesSelect(cantidad);
        //product.numerounidades
    };

    const validaPrdListWish = () => {
       
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Crear productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }

        if (datosusuarios.uid && datosusuarios.uid != 0) {
            const leerItems = async () => {
                let params = {
                    idproducto: product.id,
                    usuario: datosusuarios.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "57",
                    params,
                })
                    .then((res) => {
                        if (res.data.listaritemdeseos.length > 0) {
                            //console.log("LEER : ", res.data.listaritemdeseos[0].idproducto
                            setShowModalMensajes(true);
                            setTituloMensajes("Lista de deseos");
                            let texto = "Producto ya existe en lista de deseo";
                            setTextoMensajes(texto);
                            return;
                        } else agregarListaDeseo();
                    })
                    .catch(function (error) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Lista de deseos");
                        let texto = "Error leyendo producto en lista de deseo";
                        setTextoMensajes(texto);
                        return;
                    });
            };
            leerItems();
        } else agregarListaDeseo();
    };

    const agregarListaDeseo = () => {
        //alert("HDHDHDHDHD")
        const url = window.location.pathname;
        //alert(url);

        //return
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
         dispatch(getLeeIra(5));
           
            localStorage.setItem("ira", JSON.stringify(5));

            let itemswishlistadd = {
                ruta: "/searchinteractive/searchinteractive", //url,
                idproducto: product.id,
                compatible: product.compatible,
                cantidad: 1,
            };
            localStorage.setItem(
                "itemswishlistadd",
                JSON.stringify(itemswishlistadd)
            );

            //return
            setShowModalMensajesShoppingCart(true);
            let texto =
                "¡Bienvenido! Para agregar a lista de deseo debes ingresar a tu cuenta";
            setTituloMensajesShoppingCart(texto);
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }

        const grabarItem = async () => {
            let params = {
                idproducto: product.id,
                compatible: product.compatible,
                usuario: datosusuarios.uid,
            };
            //console.log("PROD : ", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "53",
                params,
            })
                .then((res) => {
                    //console.log("DAT: ", res.data);
                    setShowModalMensajes(true);
                    setTituloMensajes("Lista de deseos");
                    let texto = "Producto agregado a lista de deseo";
                    setTextoMensajes(texto);

                    const grabarItemhistorial = async () => {
                        let params = {
                            idproducto: product.id,
                            compatible: product.compatible,
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

                    const leerItems = async () => {
                        let params = {
                            usuario: datosusuarios.uid,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "54",
                            params,
                        })
                            .then((res) => {
                                //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                dispatch(
                                    getDataWishList(
                                        res.data.listaritemdeseos.length
                                    )
                                );
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo preguntas al vendedor"
                                );
                            });
                    };
                    leerItems();
                })
                .catch(function (error) {
                    console.log("Error leyendo preguntas al vendedor");
                });
        };
        grabarItem();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (login) {
                router.push("/loginaccount");
                setLogin(false);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [login]);

    const controlNumPrdCar = (data) => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Crear productos");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }


        let continuar = true;

        const leerItemsCarrito = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {
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
                        continuar = true;
                        validaPrdShoppingCar();
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo items carrito de compra");
                });
        };

        if (datosusuarios.uid == 0) {
            agregarCarritoCompra(0);
        } else leerItemsCarrito();
    };

    const validaPrdShoppingCar = (data) => {
        if (unidadesSelect == 0) {
            setShowModalMensajesInfo(true);
            setTituloMensajes("Carrito de compra");
            let texto = "Debes seleccionar como minimo una unidad";
            setTextoMensajes(texto);
            return;
        }

        localStorage.setItem("contrview", JSON.stringify(0));
        localStorage.setItem("aadditemcar", JSON.stringify(true));

        if (datosusuarios.uid == 0) agregarCarritoCompra(data);
        else {
            const leerItems = async () => {
                let params = {
                    idproducto: product.id,
                    usuario: datosusuarios.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "62",
                    params,
                })
                    .then((res) => {
                        if (res.data.listaritemcarrito.length > 0) {
                            let unidades =
                                parseInt(
                                    res.data.listaritemcarrito[0].cantidad
                                ) + parseInt(unidadesSelect);

                            if (unidades <= unidadesSelect) {
                                setShowModalMensajes(true);
                                setTituloMensajes("Carrito de compra");
                                let texto =
                                    "No tenemos unidades disponibles en inventario";
                                setTextoMensajes(texto);
                                return;
                            }

                            const actualizarItemCarrito = async () => {
                                let params = {
                                    id: res.data.listaritemcarrito[0].id,
                                    idproducto:
                                        res.data.listaritemcarrito[0]
                                            .idproducto,
                                    compatible:
                                        res.data.listaritemcarrito[0]
                                            .compatible,
                                    usuario:
                                        res.data.listaritemcarrito[0].usuario,
                                    cantidad: unidades,
                                };
                                //console.log("PROD : ", params);

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "63",
                                    params,
                                })
                                    .then((res) => {
                                        const leeItemAgregadoCarrito =
                                            async () => {
                                                let params = {
                                                    usuario: datosusuarios.uid,
                                                    idproducto: product.id,
                                                };

                                                await axios({
                                                    method: "post",
                                                    url: URL_BD_MR + "62",
                                                    params,
                                                })
                                                    .then((res) => {
                                                        let item = {
                                                            idproducto:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .idproducto,
                                                            nombreimagen1:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .nombreimagen1,
                                                            titulonombre:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .titulonombre,
                                                            cantidad:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .cantidad,
                                                        };

                                                        dispatch(
                                                            getAddEdToCart(item)
                                                        );
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
                                                    })
                                                    .catch(function (error) {
                                                        console.log(
                                                            "Error leyendo items carrito de compra"
                                                        );
                                                    });
                                            };
                                        leeItemAgregadoCarrito();

                                        const leerItemsCarrito = async () => {
                                            let params = {
                                                usuario: datosusuarios.uid,
                                            };

                                            await axios({
                                                method: "post",
                                                url: URL_BD_MR + "59",
                                                params,
                                            })
                                                .then((res) => {
                                                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                                    dispatch(
                                                        getDataShoppingCart(
                                                            res.data
                                                                .listarcarritocompra
                                                                .length
                                                        )
                                                    );
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error leyendo items carrito de compra"
                                                    );
                                                });
                                        };
                                        leerItemsCarrito();
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo items carrito de compra"
                                        );
                                    });
                            };
                            actualizarItemCarrito();
                        } else agregarCarritoCompra(data);
                    })
                    .catch(function (error) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Carrito de compra");
                        let texto =
                            "Error leyendo producto en carrito de compra";
                        setTextoMensajes(texto);
                        return;
                    });
            };
            leerItems();
        }
    };
    const agregarCarritoCompra = (data) => {
        let rutaira = router.pathname;
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            dispatch(getLeeIra(6));
            localStorage.setItem("activargrilla", JSON.stringify(1));
            localStorage.setItem("ira", JSON.stringify(6));
            //product.images[0].name
            let itemshoppingcartadd = {
                ruta: rutaira,
                idproducto: product.id,
                compatible: product.compatible,
                cantidad: unidadesSelect,
                nombreimagen1: product.images[0].name,
                titulonombre: product.name,
                valida: 0,
            };
            localStorage.setItem(
                "itemshoppingcartadd",
                JSON.stringify(itemshoppingcartadd)
            );

            //console.log("DATASXXX : ", itemshoppingcartadd)
            //return

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart(
                "¡Bienvenido! Para comprar debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }

        const grabarItemCarrito = async () => {
            localStorage.setItem("aadditemcar", JSON.stringify(true));
            let params = {
                idproducto: product.id,
                compatible: product.compatible,
                usuario: datosusuarios.uid,
                cantidad: unidadesSelect,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "58",
                params,
            })
                .then((res) => {
                    const grabarItemCarritoHistorial = async () => {
                        let params = {
                            idproducto: product.id,
                            compatible: product.compatible,
                            usuario: datosusuarios.uid,
                            cantidad: unidadesSelect,
                        };
                        //console.log("PROD : ", params);

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "581",
                            params,
                        })
                            .then((res) => {
                                console.log("OK item  add carrito de compra");
                            })
                            .catch(function (error) {
                                console.log("Error item add carrito de compra");
                            });
                    };
                    grabarItemCarritoHistorial();

                    const leeItemAgregadoCarrito = async () => {
                        let params = {
                            usuario: datosusuarios.uid,
                            idproducto: product.id,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "62",
                            params,
                        })
                            .then((res) => {
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
                                        res.data.listaritemcarrito[0].cantidad,
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
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo items carrito de compra"
                                );
                            });
                    };
                    leeItemAgregadoCarrito();

                    const leerItemsCarrito = async () => {
                        let params = {
                            usuario: datosusuarios.uid,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "59",
                            params,
                        })
                            .then((res) => {
                                dispatch(
                                    getDataShoppingCart(
                                        res.data.listarcarritocompra.length
                                    )
                                );
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo items carrito de compra"
                                );
                            });
                    };
                    leerItemsCarrito();
                })
                .catch(function (error) {
                    console.log("Error leyendo items carrito de compra");
                });
        };
        grabarItemCarrito();
    };

    const onClickImagen = () => {
        dispatch(getViewSearch(true));
        dispatch(getSelectViewPrd(product.id));
        dispatch(getViewCheckout(false));
        dispatch(getLeeIra(6));
        localStorage.setItem("ira", JSON.stringify(6));
        localStorage.setItem("rutaira", JSON.stringify(router.pathname));
        localStorage.setItem("activargrilla", JSON.stringify(1));

        const addItemVisita = async () => {
            let params = {
                idproducto: product.id,
                usuario: datosusuarios.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "70",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data);
                    } else console.log("ERROR : ", res.data);
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data);
                    return;
                });
        };
        addItemVisita();

        const addItemHistoryPrd = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));

            let params = {
                idproducto: product.id,
                usuario: datauser?.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "87",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data);
                    } else console.log("ERROR : ", res.data);
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data);
                    return;
                });
        };
        addItemHistoryPrd();
    };

    //console.log("RUTAXXXX : ", router.pathname);
    return (
        <>
            <div className="mobileContainerReultsRInteractiveSearch">
                <div className="mobileContainerReultsRLeftInteractiveSearch">
                    <div
                        className="apuntador"
                        onClick={() => onClickImagen(product)}>
                        <img
                            src={URL_IMAGES_RESULTS + product.images[0].name}
                            alt="First slide"
                        />
                    </div>
                    <div>
                        <div
                            className="apuntador"
                            onClick={() => onClickImagen(product)}>
                            <h3>{product.name}</h3>
                        </div>
                        <p>
                            <PiCheckFatFill />
                            Marca: {product.marcarepuesto}
                        </p>
                        <p>
                            <PiCheckFatFill />
                            Condición: {product.condicion}
                        </p>
                        {product.estadoproducto > 0 ? (
                            <>
                                <span className="none540px">
                                    <p>Estado del producto: </p>
                                    <RatingPrdSingleView
                                        estadoproducto={product.estadoproducto}
                                    />
                                </span>
                                <span className="only540px">
                                    <p>Estado del producto:</p>
                                    <EstadoProducto
                                        estado={product.estadoproducto}
                                    />
                                </span>
                            </>
                        ) : null}
                        <div>
                            <div className="none700px">
                                <i className="mt-4 searchContainerFont colorbase fa fa-heart-o"></i>
                                <Link href="#">
                                    <a
                                        className="ml-2 textoordenarpor pt-3"
                                        onClick={() => validaPrdListWish()}>
                                        Agregar a lista de deseos{" "}
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <h5 className="priceSearchDos">
                            ${myNumber(1, product.price, 2)}
                        </h5>
                    </div>
                </div>

                <div className="mobileContainerReultsRRight">
                    <div>
                        <h4>${myNumber(1, product.price, 2)}</h4>
                    </div>
                    <div className="itemRightCartResults">
                        <div className="botonCartMleDos">
                            <span>
                                <RiSubtractLine
                                    onClick={() => selCantidad(-1)}
                                    className={`sinborder ${
                                        unidadesSelect <= 0
                                            ? "deshabilitar"
                                            : ""
                                    }`}
                                />
                            </span>
                            <h3>{unidadesSelect || 0}</h3>
                            <span>
                                <IoMdAdd
                                    onClick={() => selCantidad(1)}
                                    className={`sinborder ${
                                        unidadesSelect >= product.numerounidades
                                            ? "deshabilitar"
                                            : ""
                                    }`}
                                />
                            </span>
                        </div>
                        <p>
                            Unidades disponibles:{" "}
                            {product.numerounidades ||
                            product.numerounidades > 0
                                ? product.numerounidades
                                : 0}
                        </p>
                    </div>
                    <div
                        className={
                            product.numerounidades || product.numerounidades > 0
                                ? "addToCartResulttres"
                                : "addToCartResulttresDisabled"
                        }
                        onClick={() => {
                            if (
                                product.numerounidades &&
                                product.numerounidades > 0
                            ) {
                                controlNumPrdCar(product);
                            }
                        }}>
                        Agregar al carrito
                    </div>
                </div>
            </div>

            <ModalMensajes
                shown={showModalMensajesInfo}
                close={setShowModalMensajesInfo}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            <ModalMensajesWishList
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesWishListControl
                shown={showModalMensajesCtlr}
                close={setShowModalMensajesCtlr}
                titulo={tituloMensajesCtlr}
                mensaje={textoMensajesCtlr}
                setSoyNuevo={setSoyNuevo}
                setTengoCuenta={setTengoCuenta}
                tipo="1"
            />
            <ModalMensajesSoyNuevo
                shown={showModalMensajesShoppingCart}
                close={setShowModalMensajesShoppingCart}
                titulo={tituloMensajesShoppingCart}
                mensaje={textoMensajesShoppingCart}
                setSoyNuevo={setSoyNuevo}
                setTengoCuenta={setTengoCuenta}
                tipo="1"
            />

            <ModalControlAcceso
                shown={showModalControlAcceso}
                close={setShowModalControlAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />
        </>
    );
};

export default ProductListPhotoImageSearchDos;
