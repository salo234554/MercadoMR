import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Dropdown, Form, Carousel } from "react-bootstrap";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTSSMS,
} from "../../../../helpers/Constants";
import { useRouter } from "next/router";
import { RiPoliceCarFill } from "react-icons/ri";
import { FaBusAlt } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5"; //electrico
import { BsBusFrontFill } from "react-icons/bs"; //camion
import { RiMotorbikeFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { getViewAddCart } from "~/store/viewaddcart/action";

const HomeOneTopBanners = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const prevIcon = "https://i.postimg.cc/FsbgSDBn/prevIcon.png"; // Imagen para el botón "anterior"
    const nextIcon = "https://i.postimg.cc/kXPvDkfb/nextIcon.png"; // Imagen para el botón "siguiente"
    const [imagenes, setImagenes] = useState([]);
    const [alertarCarroceria, setAlertarCarroceria] = useState("");
    const [alertaMarca, setAlertaMarca] = useState("");
    const [alertarMarca, setAlertarMarca] = useState("");
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] =
        useState("Carrocería");
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState("Marca");

    const [selectCarrocerias, setSelectCarrocerias] = useState([]);
    const [carrocerias, setCarrocerias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [selectMarcas, setSelectMarcas] = useState([]);
    const [alertaCarroceria, setAlertaCarroceria] = useState("");

    const [disabledMotos, setDisabledMotos] = useState("iconsearchhome");
    const [disabledAutos, setDisabledAutos] = useState("iconsearchhome");
    const [disabledCamiones, setDisabledCamiones] = useState("iconsearchhome");
    const [disabledElectricos, setDisabledElectricos] =
        useState("iconsearchhome");
    const [disabledBuses, setDisabledBuses] = useState("iconsearchhome");

    const [disabledCarroceria, setDisabledCarroceria] = useState(true);
    const [disabledMarca, setDisabledMarca] = useState(true);

    const [tipoVehiculo, setTipoVehiculo] = useState(0);
    const [carroceriaVehiculo, setCarroceriaVehiculo] = useState(0);
    const [marcaVehiculo, setMarcaVehiculo] = useState(0);
    const [classBtnSearchHome, setClassBtnSearchHome] = useState(
        "botonsearchhome disableoption disableicon"
    );

    let datosmodelosvehiculos = [];
    datosmodelosvehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    useEffect(() => {
        let carroceriasvehiculos = JSON?.parse(
            localStorage.getItem("datoscarroceriasvehiculos")
        );
        let marcasvehiculos = JSON?.parse(
            localStorage.getItem("datosmarcasvehiculos")
        );

        setCarrocerias(carroceriasvehiculos);
        setMarcas(marcasvehiculos);
        //setCilindrajes(data.tiposcilindrajes)
        dispatch(getViewVehPrd(null));
        dispatch(getViewAddCart(1));
        localStorage.setItem("urlviewprd", JSON.stringify(null));
    }, []);

    // Componente personalizado para los botones
    const CustomButton = ({ iconUrl, tipo }) => (
        <span
            className={` ${tipo === "prev" ? "prev-button" : "next-button"}`}
            style={{
                display: "inline-block",
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: "cover",
                borderRadius: "12px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            aria-hidden="true"
        />
    );

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "129",
                });
                setImagenes(res.data.listimgcarrusel);
            } catch (error) {
                console.error("Error al leer las imágenes", error);
            }
        };
        obtenerImagenes();
    }, []);

    const selectTipoVeh = (selectedOptions) => {
        setNombreCarroceriaVeh("Carrocería");
        setNombreMarcaVeh("Marca");
        setTipoVehiculo(selectedOptions);
        setDisabledCarroceria(false);
        setDisabledMarca(true);
        setClassBtnSearchHome("botonsearchhome disableoption disableicon");
        localStorage.setItem("tipovehiculo", JSON?.stringify(selectedOptions));

        if (tipoVehiculo == selectedOptions) {
            setDisabledMotos("iconsearchhome");
            setDisabledAutos("iconsearchhome");
            setDisabledCamiones("iconsearchhome");
            setDisabledElectricos("iconsearchhome");
            setDisabledBuses("iconsearchhome");
            setDisabledCarroceria(true);
        } else if (selectedOptions == 1) {
            setDisabledMotos("iconsearchhome");
            setDisabledAutos("iconsearchhome disableicon");
            setDisabledCamiones("iconsearchhome disableicon");
            setDisabledElectricos("iconsearchhome disableicon");
            setDisabledBuses("iconsearchhome disableicon");
        } else if (selectedOptions == 2) {
            setDisabledMotos("iconsearchhome disableicon");
            setDisabledAutos("iconsearchhome");
            setDisabledCamiones("iconsearchhome disableicon");
            setDisabledElectricos("iconsearchhome disableicon");
            setDisabledBuses("iconsearchhome disableicon");
        } else if (selectedOptions == 3) {
            setDisabledMotos("iconsearchhome disableicon");
            setDisabledAutos("iconsearchhome disableicon");
            setDisabledCamiones("iconsearchhome");
            setDisabledElectricos("iconsearchhome disableicon");
            setDisabledBuses("iconsearchhome disableicon");
        } else if (selectedOptions == 4) {
            setDisabledMotos("iconsearchhome disableicon");
            setDisabledAutos("iconsearchhome disableicon");
            setDisabledCamiones("iconsearchhome disableicon");
            setDisabledElectricos("iconsearchhome");
            setDisabledBuses("iconsearchhome disableicon");
        } else if (selectedOptions == 6) {
            setDisabledMotos("iconsearchhome disableicon");
            setDisabledAutos("iconsearchhome disableicon");
            setDisabledCamiones("iconsearchhome disableicon");
            setDisabledElectricos("iconsearchhome disableicon");
            setDisabledBuses("iconsearchhome");
        }

        let carroceriasvehiculos = JSON?.parse(
            localStorage.getItem("datoscarroceriasvehiculos")
        );

        console.log("CARROCERIAS : ", carroceriasvehiculos);

        const newDet = [];
        carroceriasvehiculos &&
            carroceriasvehiculos.forEach((row) => {
                if (parseInt(row.tipovehiculo) === parseInt(selectedOptions)) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipovehiculo: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.carroceria,
                    };
                    newDet.push(item);
                }
            });
        setSelectCarrocerias(newDet);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setClassBtnSearchHome("botonsearchhome disableoption disableicon");
        setDisabledMarca(false);
        setCarroceriaVehiculo(selectedOptions);
        setMarcaVehiculo(0);
        setNombreMarcaVeh("Marca");

        const newDet = [];
        marcas &&
            marcas.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVehiculo) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(selectedOptions)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipovehiculo: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDet.push(item);
                }
            });
        setSelectMarcas(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        setMarcaVehiculo(selectedOptions);
        setClassBtnSearchHome("botonsearchhome");

        const newDetModelos = [];

        datosmodelosvehiculos &&
            datosmodelosvehiculos.forEach((row) => {
                if (
                    parseInt(row.tipovehiculo) === parseInt(tipoVehiculo) &&
                    parseInt(row.marca) === parseInt(selectedOptions) &&
                    parseInt(row.carroceria) === parseInt(carroceriaVehiculo)
                ) {
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
                    newDetModelos.push(item);
                }
            });

        localStorage.setItem(
            "modelosselecthome",
            JSON?.stringify(newDetModelos)
        );
    };

    const resetFindVeh = () => {
        localStorage.setItem("itemswishlistadd", JSON.stringify(null));
        sessionStorage.setItem("findbyvehicle", JSON.stringify(false));
    };

    return (
        <section className="section-bannerMR">
            <Grid container style={{ width: "100%" }}>
                <Grid item xs={12} md={6} lg={6} style={{ padding: 0 }}>
                    <div className="contenedorsearchhome">
                        <div className="titleamarilloazul">
                            <p>INGRESA TU VEHÍCULO PARA EMPEZAR!</p>
                        </div>
                        <div className="iconossearchhome">
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="titleazultipovehiculo">
                                        <p>Tipo de vehículo!</p>
                                    </div>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid
                                        container
                                        spacing={1}
                                        justifyContent="center">
                                        <Grid item xs={4} md={3} lg={2}>
                                            <div
                                                className={disabledAutos}
                                                onClick={() =>
                                                    selectTipoVeh(2)
                                                }>
                                                <RiPoliceCarFill />
                                            </div>
                                            <div className="texticonsearchhome">
                                                <p>
                                                    CARROS Y <br />
                                                    CAMIONETAS
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3} lg={2}>
                                            <div
                                                className={disabledMotos}
                                                onClick={() =>
                                                    selectTipoVeh(1)
                                                }>
                                                <RiMotorbikeFill />
                                            </div>
                                            <div className="texticonsearchhome">
                                                <p>MOTOS</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3} lg={2}>
                                            <div
                                                className={disabledCamiones}
                                                onClick={() =>
                                                    selectTipoVeh(3)
                                                }>
                                                <BsBusFrontFill />
                                            </div>
                                            <div className="texticonsearchhome">
                                                <p>CAMIONES</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <div
                                                className={disabledBuses}
                                                onClick={() =>
                                                    selectTipoVeh(6)
                                                }>
                                                <FaBusAlt />
                                            </div>
                                            <div className="texticonsearchhome">
                                                <p>
                                                    BUSES Y <br /> VANS
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} md={2} lg={2}>
                                            <div
                                                className={disabledElectricos}
                                                onClick={() =>
                                                    selectTipoVeh(4)
                                                }>
                                                <IoCarSport />
                                            </div>
                                            <div className="texticonsearchhome">
                                                <p>ELECTRICOS</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} lg={6}>
                                <Dropdown
                                    onSelect={handleChangeCarroceria}
                                    style={{ width: "100%" }}>
                                    <Dropdown.Toggle
                                        className="alinearizquierda searchcarroceriashome"
                                        variant="outline-light"
                                        disabled={disabledCarroceria}
                                        id="dropdown-basic"
                                        style={{
                                            width: "100%",
                                            margin: "0 auto",
                                            display: "block",
                                        }}>
                                        <Row>
                                            <Col xs={1} sm={1} md={1} lg={1}>
                                                <h3
                                                    className={
                                                        alertarCarroceria
                                                    }>
                                                    {" "}
                                                    *{" "}
                                                </h3>
                                            </Col>
                                            <Col
                                                xs={10}
                                                sm={10}
                                                md={10}
                                                lg={10}
                                                className={alertaCarroceria}>
                                                {nombreCarroceriaVeh}
                                            </Col>
                                        </Row>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        variant="outline-light"
                                        className="optionssearchinteractivecarrocerias">
                                        {selectCarrocerias &&
                                            selectCarrocerias.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        eventKey={item.value}
                                                        onClick={() =>
                                                            setNombreCarroceriaVeh(
                                                                item.label
                                                            )
                                                        }>
                                                        {item.label}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Grid>
                            <Grid item xs={12} sm={6} spacing={1}>
                                <Dropdown
                                    onSelect={handleChangeBrand}
                                    style={{ width: "100%" }}>
                                    <Dropdown.Toggle
                                        className="alinearizquierda searchcarroceriashomedos"
                                        variant="outline-light"
                                        disabled={disabledMarca}
                                        id="dropdown-basic"
                                        style={{
                                            width: "100%",
                                            margin: "0 auto",
                                            display: "block",
                                        }}>
                                        <Row>
                                            <Col xs={1} sm={1} md={1} lg={1}>
                                                <h3 className={alertarMarca}>
                                                    {" "}
                                                    *{" "}
                                                </h3>
                                            </Col>
                                            <Col
                                                xs={10}
                                                sm={10}
                                                md={10}
                                                lg={10}
                                                className={alertaMarca}>
                                                {nombreMarcaVeh}
                                            </Col>
                                        </Row>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        variant="outline-light"
                                        className="optionssearchinteractivecarrocerias">
                                        {selectMarcas &&
                                            selectMarcas.map((item) => {
                                                return (
                                                    <Dropdown.Item
                                                        className="itemsdropdowncustom"
                                                        eventKey={item.id}
                                                        onClick={() => {
                                                            setNombreMarcaVeh(
                                                                item.text
                                                            );
                                                            localStorage.setItem(
                                                                "custommarca",
                                                                JSON.stringify(
                                                                    item.text
                                                                )
                                                            );
                                                        }}>
                                                        {item.text}
                                                    </Dropdown.Item>
                                                );
                                            })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                className="nuevaHomeFer">
                                <div
                                    className={classBtnSearchHome}
                                    onClick={() => {
                                        router.push({
                                            pathname:
                                                "/searchinteractive/searchinteractive",
                                            query: {
                                                tipoVehiculo:
                                                    JSON?.stringify(
                                                        tipoVehiculo
                                                    ),
                                                carroceriaVehiculo:
                                                    JSON?.stringify(
                                                        carroceriaVehiculo
                                                    ),
                                                marcaVehiculo:
                                                    JSON?.stringify(
                                                        marcaVehiculo
                                                    ),
                                            },
                                        });
                                        resetFindVeh();
                                    }}>
                                    Continuar
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    style={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Carousel
                        slide={false}
                        nextIcon={
                            <CustomButton iconUrl={nextIcon} tipo="next" />
                        }
                        prevIcon={
                            <CustomButton iconUrl={prevIcon} tipo="prev" />
                        }
                        nextLabel=""
                        prevLabel="">
                        {imagenes.map((imagen, index) => (
                            <Carousel.Item key={imagen.id} interval={4000}>
                                <img
                                    className="imgcarrusel"
                                    src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`}
                                    alt={`Imagen ${index + 1}`}
                                    //style={{ width: "100%", height: "auto" }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Grid>
            </Grid>
        </section>
    );
};

export default HomeOneTopBanners;
