import React, { useState, useEffect, useRef } from "react";
import ContainerResult from "~/components/layouts/ContainerResult";
import swal from "sweetalert";
import { Row, Col, Dropdown, Form, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import ModalMensajesContactanos from "../mensajes/ModalMensajesContactanos";
import ModalMensajes from "../mensajes/ModalMensajes";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import AdjustIcon from '@material-ui/icons/Adjust';
import ModalMensajesConfirmarEliminar from "../mensajes/ModalMensajesConfirmarEliminar";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { getEditData } from "../../store/editdata/action";
import { getDataSearchInteractive } from "../../store/datasearchinteractive/action";
import { getDataSelectSearch } from "../../store/dataselectsearch/action";
import { getEditDataHistory } from "~/store/editdatahistory/action";

import axios from "axios";
import Moment from "moment";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import SearchContact from "../searchcontact"
import { set } from "lodash";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
        &#x25bc;
    </a>
));

let itemeliminar = 0;

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañocajaoptionsitemssearchdos"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value)}
                //value={value}
                />

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
                { }
            </div>
        );
    }
);

function HistoryVehSpecialSearch({ marcarItem, setMarcarItem, setSelVehHistory }) {
    //const { marcarItem, setMarcarItem, tiposelecthome } = props;
    const dispatch = useDispatch();
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesCity, setShowModalMensajesCity] = useState(false);
    const [tituloMensajesCity, setTituloMensajesCity] = useState("");
    const [textoMensajesCity, setTextoMensajesCity] = useState("");

    const [showModalMensajesEliminar, setShowModalMensajesEliminar] =
        useState(false);
    const [continuarEliminar, setContinuarEliminar] = useState(false);
    const [abandonarEliminar, setAbandonarEliminar] = useState(false);
    const [itemSelect, setItemSelect] = useState(0);

    const [textoBoton, setTextoBoton] = useState("Seguir comprando");

    const [tiposVehiculos, setTiposVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    const [arrayHistoryVeh, setArrayHistoryVeh] = useState([]);
    const [dataSearch, setDataSearch] = useState(false);
    const [emailContact, setEmailContact] = useState(null);

    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    //console.log("USER : ", datosusuarios.email)

    let datosvehiculos = datosgenerales.vgl_tiposvehiculos;

    let datosmodelosvehiculos = [];
    datosmodelosvehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    let datosannos = [];
    datosannos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_annosvehiculos
    );

    let datoscilindrajevehiculos = [];
    datoscilindrajevehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );

    useEffect(() => {
        setEmailContact(datosusuarios.email);

        const params = {
            usuario: datosusuarios.uid
        };

        const leerDatGeneric = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "99",
                params,
            })
                .then((res) => {
                    //console.log("HISTORIA VEH BUSCADOR ESPECIAL : ", res.data);

                    const compare = (b, a) => {
                        if (a.id < b.id) {
                            return -1;
                        }
                        if (a.id > b.id) {
                            return 1;
                        }
                        return 0;
                    };
                    if (res.data.listhistoryvehsearchspecial.length > 0)
                        res.data.listhistoryvehsearchspecial.sort(compare);

                    setArrayHistoryVeh(res.data.listhistoryvehsearchspecial);
                    //setDataFind(datacontact);
                })
                .catch(function (error) {
                    console.log("Lee Productos Temporal Error: ");
                });
        };

        if (datosusuarios.uid && datosusuarios.uid != 0)
            leerDatGeneric();
        else {
            let datahistoryveh = JSON.parse(localStorage.getItem("datahistoryveh"));
            setArrayHistoryVeh(datahistoryveh);
        }
    }, [datosusuarios]);

    useEffect(() => {
        setTiposVehiculos(datosgenerales.vgl_tiposvehiculos);
        setListMarcas(datosgenerales.vgl_marcasvehiculos);
        setListCarrocerias(datosgenerales.vgl_carroceriasvehiculos);
        setListModelos(datosgenerales.vgl_modelosvehiculos);
        setListCilindrajes(datosgenerales.vgl_cilindrajesvehiculos);
        setAnnos(datosgenerales.vgl_annosvehiculos);
    }, [datosgenerales]);

    const onSelectItem = (e, dataveh) => {
        //console.log("EDITDATA00000 : ", e, dataveh?.tipovehiculo)
        setSelVehHistory(1);
        localStorage.setItem("tipovehiculo", JSON.stringify(dataveh?.tipovehiculo));
        localStorage.setItem("interactivesearch", JSON.stringify(false));
        if (marcarItem.includes(e)) {
            let item = [];
            setMarcarItem([]);
            let editdata = {
                editar: false,
            };
            dispatch(getEditData(editdata));
            localStorage.setItem("editdata", JSON.stringify(false));
            localStorage.setItem("editVehHistory", JSON.stringify(false));
        } else {
            let item = [];
            setMarcarItem([]);
            item.push(e);
            setMarcarItem(item);

            let data = [];
            arrayHistoryVeh &&
                arrayHistoryVeh.map((item, index) => {
                    if (index == e) {
                        data = item;
                    }
                });

            let editdata = {
                editar: true,
            };

            dispatch(getEditData(editdata));
            localStorage.setItem("editdata", JSON.stringify(true));
            localStorage.setItem("editVehHistory", JSON.stringify(true));
            //location.reload();

            console.log("DATVEH : ", data)

            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: false
            };

            let DatosSeleccionadosBuscador = "";

            if (data.idvehiculo != 4) {
                DatosSeleccionadosBuscador = {
                    nombretipovehiculo: data.nombretipovehiculo,
                    nombrecarroceria: data.nombrecarroceria,
                    nombremarca: data.nombremarca,
                    nombreanno: data.nombreanno,
                    nombremodelo: data.nombremodelo,
                    nombrecilindraje: data.nombrecilindraje,
                    nombretipocombustible: data.nombretipocombustible,
                    nombretransmision: data.nombretransmision,
                    nombretraccion: data.nombretraccion
                }
            } else {
                DatosSeleccionadosBuscador = {
                    nombretipovehiculo: data.nombretipovehiculo,
                    nombrecarroceria: "; " + data.nombrecarroceria,
                    nombremarca: "; " + data.nombremarca,
                    nombreanno: data.nombreanno,
                    nombremodelo: "; " + data.nombremodelo,
                    nombrecilindraje: data.nombrecilindraje,
                    nombretipocombustible: data.nombretipocombustible
                }
            }

            let datalist = [];
            const DatosBuscadorInteractivo = {
                idvehiculo: data.idvehiculo,
                idcarrorecia: data.idcarrorecia,
                idmarca: data.idmarca,
                codigoano: data.codigoano,
                codigomodelo: data.codigomodelo,
                codigocilindraje: data.codigocilindraje,
                codigocombustible: data.codigocombustible,
                codigotransmision: data.codigotransmision,
                codigotraccion: data.codigotraccion,
                nombretipovehiculo: data.nombretipovehiculo,
                nombrecarroceria: data.nombrecarroceria,
                nombremarca: data.nombremarca,
                nombreanno: data.nombreanno,
                nombremodelo: data.nombremodelo,
                nombrecilindraje: data.nombrecilindraje,
                nombretipocombustible: data.nombretipocombustible,
                nombretransmision: data.nombretransmision,
                nombretraccion: data.nombretraccion,
                marcasseleccionadas: data.marcasseleccionadas,
                annosseleccionado: data.annosseleccionado,
                modelosseleccionados: data.modelosseleccionados,
                cilindrajesseleccionados: data.cilindrajesseleccionados,
                combustiblesseleccionados: data.combustiblesseleccionados,
                transmisionesseleccionadas: data.transmisionesseleccionadas,
                traccionesseleccionadas: data.traccionesseleccionadas,
                tiposvehiculos: datalist,
                tiposcarrocerias: datalist,
                tiposmarcas: datalist,
                tiposmodelos: datalist,
                tiposcilindrajes: datalist
            };

            //console.log("DatosBuscadorInteractivo : ", DatosBuscadorInteractivo)
            //return
            dispatch(getDataSelectSearch(DatosSeleccionadosBuscador));
            localStorage.setItem("dataselectsearch", JSON.stringify(DatosSeleccionadosBuscador));
            //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatosBuscadorInteractivo);
            dispatch(getDataSearchInteractive(DatosBuscadorInteractivo));
            localStorage.setItem("datasearchinteractive", JSON.stringify(DatosBuscadorInteractivo));

            editdata = {
                editar: false
            }
            dispatch(getEditData(editdata));

            let carroceriasvehiculos = JSON.parse(
                localStorage.getItem("datoscarroceriasvehiculos")
            );

            const newCarrecerias = [];
            carroceriasvehiculos &&
                carroceriasvehiculos.forEach((row) => {
                    if (parseInt(row.tipovehiculo) === parseInt(data.idvehiculo)) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipovehiculo: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.carroceria,
                        };
                        newCarrecerias.push(item);
                    }
                });
            //console.log("CARROCESSASASA : ", newCarrecerias);
            localStorage.setItem("datahistorycarrocerias", JSON.stringify(newCarrecerias));

            let marcasvehiculos = JSON.parse(
                localStorage.getItem("datosmarcasvehiculos")
            );

            const newDetMarcas = [];
            marcasvehiculos &&
                marcasvehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(data.idvehiculo) &&
                        Number.parseInt(row.carroceria) ===
                        Number.parseInt(data.carroceria)
                    ) {
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipovehiculo: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDetMarcas.push(item);
                    }
                });

            //console.log("MARCASXXXX : ", newDetMarcas);
            localStorage.setItem("datahistorymarcas", JSON.stringify(newDetMarcas));

            const newDet = [];
            datosmodelosvehiculos &&
                datosmodelosvehiculos.forEach((row) => {
                    if (
                        parseInt(row.tipovehiculo) ===
                        parseInt(data.idvehiculo) &&
                        parseInt(row.marca) ===
                        parseInt(data.idmarca) &&
                        parseInt(row.carroceria) ===
                        parseInt(data.carroceria)
                    ) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipovehiculo: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDet.push(item);
                    }
                });
            //setModels(newDet);
            //console.log("MODELOSXXX : ", newDet);
            localStorage.setItem("datahistorymodelos", JSON.stringify(newDet));

            const newDetCilindraje = [];
            datoscilindrajevehiculos &&
                datoscilindrajevehiculos.forEach((row) => {
                    if (
                        parseInt(row.tipovehiculo) ===
                        parseInt(data.idvehiculo) &&
                        parseInt(row.carroceria) ===
                        parseInt(data.carroceria) &&
                        parseInt(row.modelo) ===
                        parseInt(data.codigomodelo)
                    ) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            cilindraje: row.cilindraje,
                            tipovehiculo: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            modelo: row.modelo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                        };
                        newDetCilindraje.push(item);
                    }
                });

            //console.log("CILINDRAJEXXX : ", newDetCilindraje);
            localStorage.setItem("datahistorycilindraje", JSON.stringify(newDetCilindraje));
            //setCilindrajes(newDetCilindraje);
            dispatch(getEditDataHistory(true));
        }
    }

    const deleteSelectItem = (e) => {
        let item = [];
        setMarcarItem([]);
        item.push(e);
        setMarcarItem(item);
        //setItemSelect(e);
        setShowModalMensajesEliminar(true);
        setTituloMensajes("Historial Busqueda");
        setTextoMensajes("¿Estas seguro de querer eliminar vehículo del historial?");
    }

    const deleteSelectItemNoRegistrado = (e) => {
        setMarcarItem([]);
        itemeliminar = e;
        setShowModalMensajesEliminar(true);
        setTituloMensajes("Historial Busqueda");
        setTextoMensajes("¿Estas seguro de querer eliminar vehículo del historial?");
    }

    useEffect(() => {
        if (continuarEliminar) {
            deleteItemHistory();
        } else
            if (abandonarEliminar) {
                setAbandonarEliminar(false);
                setMarcarItem([]);
            }
    }, [continuarEliminar, showModalMensajesEliminar]);

    const deleteItemHistory = () => {
        marcarItem &&
            marcarItem.map((row, index) => {
                let params = {
                    id: row
                };

                const borrarItem = async () => {
                    await axios({
                        method: "post",
                        url: URL_BD_MR + "101",
                        params,
                    })
                        .then((res) => {
                            params = {
                                usuario: datosusuarios.uid
                            };

                            setMarcarItem([]);
                            const leerDatGeneric = async () => {
                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "99",
                                    params,
                                })
                                    .then((res) => {
                                        //console.log("HISTORIA VEH BUSCADOR ESPECIAL : ", res.data);
                                        setArrayHistoryVeh(res.data.listhistoryvehsearchspecial);
                                        setContinuarEliminar(false);
                                    })
                                    .catch(function (error) {
                                        console.log("Lee Productos Temporal Error: ");
                                    });
                            };
                            leerDatGeneric();
                        })
                        .catch(function (error) {
                            console.log("Error borrar historial");
                        });
                };

                if (datosusuarios.uid && datosusuarios.uid != 0) {
                    borrarItem();
                }
            });

        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            let datahistoryveh = JSON.parse(localStorage.getItem("datahistoryveh"));
            let item = [];
            datahistoryveh &&
                datahistoryveh.map((row, index) => {
                    if (itemeliminar != index)
                        item.push(row)
                });
            setContinuarEliminar(false);
            setArrayHistoryVeh(item);
            localStorage.setItem("datahistoryveh", JSON.stringify(item));
        }
    };


    return (

        <div className="containerhistoryveh">
            <ModalMensajesConfirmarEliminar
                shown={showModalMensajesEliminar}
                setShowModalMensajesEliminar={setShowModalMensajesEliminar}
                setContinuarEliminar={setContinuarEliminar}
                setAbandonarEliminar={setAbandonarEliminar}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            <ModalMensajesContactanos
                shown={showModalMensajesCity}
                close={setShowModalMensajesCity}
                titulo={tituloMensajesCity}
                mensaje={textoMensajesCity}
                setActivarCity=""
                textoBoton={textoBoton}
                tipo="6"
            />
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            {
                !dataSearch ?
                    (
                        <div className="mt-30">
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <h3 className="textotituloclickaqui">
                                        Tu Historial de Vehículos
                                    </h3>
                                </Grid>
                            </Grid>
                        </div>
                    )
                    :
                    null
            }
            <div className="ubicarhistorialsearch">
                <div className="mt-10">
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={12} >
                            {arrayHistoryVeh &&
                                arrayHistoryVeh.map((item, index) => {
                                    return (
                                        <div className="mt-6">
                                            <Row>
                                                <Col xl={12} lg={12} md={12} xs={12}>
                                                    <div className="ps-form__input">

                                                        <Row className="m-0">
                                                            <Col className="p-0"
                                                                xs={10} sm={11}>
                                                                <div className=" historyvehsearchspecial flex justify-between items-center">
                                                                    <div className="textElipsis" >
                                                                        {
                                                                            item.idvehiculo == 1 ?
                                                                                <i className="tamanoiconohistory fa fa-motorcycle mr-10" aria-hidden="true"></i>
                                                                                :
                                                                                item.idvehiculo == 2 ?
                                                                                    <i className="tamanoiconohistory fa fa-car mr-10" aria-hidden="true"></i>
                                                                                    :
                                                                                    item.idvehiculo == 3 ?
                                                                                        <i className="tamanoiconohistory fa fa-truck mr-10" aria-hidden="true"></i>
                                                                                        :
                                                                                        item.idvehiculo == 6 ?
                                                                                            <i className="tamanoiconohistory fa fa-bus mr-10"></i>
                                                                                            :
                                                                                            <i className="tamanoiconohistory fa fa-car mr-10" aria-hidden="true"></i>
                                                                        }


                                                                        {item.selecttipo}{" "}
                                                                        {item.selectcarroceria}{" "}
                                                                        {item.selectmarca}{" "}
                                                                        {!item.annosseleccionado || item.selectanno == "Año" || item.selectanno == 0 ?
                                                                            " "
                                                                            :
                                                                            " " + item.annosseleccionado}
                                                                        {" " + item.selectmodelo}{" "}
                                                                        {item.selectcilindraje == "Cilindraje" || !item.selectcilindraje ?
                                                                            " "
                                                                            :
                                                                            " " + item.selectcilindraje}
                                                                        {item.selecttraccion == "Tracción" || !item.selecttraccion ?
                                                                            " "
                                                                            :
                                                                            " " + item.selecttraccion}

                                                                        {item.selectcombustible == "Combustible" || !item.selectcombustible ?
                                                                            " "
                                                                            :
                                                                            " " + item.selectcombustible}

                                                                        {item.selecttransmision == "Transmisión" || !item.selecttransmision ?
                                                                            " "
                                                                            :
                                                                            " " + item.selecttransmision}
                                                                    </div>
                                                                    <div className="ubicarcheckhistoryveh"
                                                                        onClick={() => onSelectItem(index, item)}
                                                                    >
                                                                        {
                                                                            marcarItem.includes(index) ?
                                                                                <AdjustIcon
                                                                                    style={{
                                                                                        fontSize: 20,
                                                                                    }}
                                                                                />
                                                                                :
                                                                                <RadioButtonUncheckedIcon
                                                                                    style={{
                                                                                        fontSize: 20,
                                                                                    }}
                                                                                />

                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Col>

                                                            <Col
                                                                xl={1}
                                                                lg={1}
                                                                md={1}
                                                                xs={1}>
                                                                {
                                                                    !datosusuarios.uid || datosusuarios.uid == 0 ?
                                                                        <div className="ubicariconohistoryvehdelete"
                                                                            onClick={() => deleteSelectItemNoRegistrado(index)}
                                                                        >
                                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                        </div> :
                                                                        <div className="ubicariconohistoryvehdelete"
                                                                            onClick={() => deleteSelectItem(item.id)}
                                                                        >
                                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                        </div>

                                                                }


                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>

                                            </Row>
                                        </div>
                                    );
                                })}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default HistoryVehSpecialSearch;