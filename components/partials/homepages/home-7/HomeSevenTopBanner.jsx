import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { getEditData } from "../../../../store/editdata/action";
import { getAddEdToCart } from "../../../../store/addedtocart/action";
import { getDuplicarPrd } from "../../../../store/duplicarprd/action";
import { useRouter } from "next/router";

import {
    RiArrowDownSLine,
    RiArrowUpSLine,
    RiPoliceCarFill,
} from "react-icons/ri";
import { FaBusAlt } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5"; //electrico
import { BsBusFrontFill } from "react-icons/bs"; //camion
import { RiMotorbikeFill } from "react-icons/ri";
import { getViewVehPrd } from "~/store/viewvehprd/action";
import { getViewAddCart } from "~/store/viewaddcart/action";

const HomeSevenTopBanner = (props) => {
    const router = useRouter();
    const { setSelectedForm } = props;
    const dispatch = useDispatch();
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [showRightContainer, setShowRightContainer] = useState(false);

    const userlogged = useSelector((state) => state.userlogged.userlogged);

    const vender = () => {
        //console.log("DATOS USUARIO : ", userlogged)
        let item = {
            login: true,
        };
        localStorage.setItem("loginvender", JSON.stringify(item));
        //localStorage.setItem("accion", JSON.stringify("noaplica"));
        if (userlogged.idinterno === 0) {
            Swal.fire({
                width: "450px",
                borderRadius: "16px",
                showCancelButton: false,
                showConfirmButton: false,
                html: `  <div style="border-radius: 16px; padding: 2rem;">
                <button id="closeButton" style="position: absolute; right: 2rem; top: 2rem; font-size: 25px; color: #2D2E83;">
                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2D2E83" viewBox="0 0 320 512">
                    <path d="M310.6 361.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L160 273.3 54.6 378.7c-12.5 12.5-32.8 12.5-45.3
                    0s-12.5-32.8 0-45.3L114.7 228.7 9.4 123.3c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 183.7 265.4 78.3c12.5-12.5
                    32.8-12.5 45.3 0s12.5 32.8 0 45.3L205.3 228.7l105.3 105.3z"/>
                </svg>
                </button>
                <img src="/static/img/favicon_2.png" alt="Mercado Repuesto" style="width: 50%; height: auto; margin: 0 auto;"/>
       
                <br />
                <h4>Vive una experiencia diferente en la compra o venta de tu repuesto</h4>
      
                <h4>Por favor ingresa a tu cuenta</h4>
       
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 1rem; width: 100%;">
                    <a href="/my-account" style="width: 100%; height: auto; margin: 0 auto; margin-top: .5rem; margin-bottom: 1.5rem;">
                        <button style="border-radius: 10px; color: #2D2E83; background-color: white; border: 3px solid #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Soy nuevo</button>
                    </a>
                    
                    <a href="/loginaccount" style="width: 100%; height: auto; margin: 0 auto;"> 
                        <button style="border-radius: 10px; color: white; background-color: #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Ya tengo una cuenta</button> 
                    </a>
                </div>
            </div>
            `,
                didOpen: () => {
                    document
                        .getElementById("closeButton")
                        ?.addEventListener("click", () => {
                            Swal.close();
                        });
                },
            });
        } else setSelectedForm("login");
    };

    const comprar = () => {
        let item = {
            login: false,
        };
        localStorage.setItem("loginvender", JSON.stringify(item));
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        setSelectedForm("login");
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        localStorage.setItem("ira", JSON.stringify(0));
        localStorage.setItem("rutaira", JSON.stringify(""));

        let row = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
            cantidad: 0,
        };

        dispatch(getAddEdToCart(row));
        localStorage.setItem("addedtocart", JSON.stringify(row));
        let datprd = [];
        localStorage.setItem("duplicarprd", JSON.stringify(datprd));
        localStorage.setItem("vehproductos", JSON.stringify(datprd));
        dispatch(getDuplicarPrd(0));
    };

    const selectTipoVeh = (selectedOptions) => {
        sessionStorage.setItem("findbyvehicle", JSON.stringify(true));
        dispatch(getViewVehPrd(null));
        dispatch(getViewAddCart(1));
        
        localStorage.setItem("urlviewprd", JSON.stringify(null));
        router.push({
            pathname: "/searchinteractive/searchinteractive",
            query: {
                tipoVehiculoMain: JSON.stringify(selectedOptions),
            },
        });
    };

    return (
        <div className="ps-top-banners">
            <div className="newContHomepage  flex min-h-screen flex-col md:flex-row">
                <div className="leftContainerHome flex flex-col items-center  w-full  anchoPrincipalFer p-4">
                    <div className="flex flex-col justify-between  md:justify-start lg:justify-between min-h-[430px] mt-[145px] sm:mt-[108px] md:mt-[17px] lg:mt-[108px]">
                        <div className="leftContainerHomeLogo">
                            <img
                                src="/static/img/LogoBlancoMR/LogoBlancoMR.png"
                                alt=""
                            />
                        </div>
                        <div className="leftContainerHomeButtons">
                            <button onClick={comprar}>COMPRAR</button>
                            <button onClick={vender}>VENDER</button>
                        </div>
                        <div className="leftContainerHomeStock">
                            <p>REPUESTOS EN STOCK: 1234</p>
                            <p>REPUESTOS CARGANDOSE EN TIEMPO REAL: 1234</p>
                        </div>
                    </div>
                </div>
                <button
                    className="noneHidden absolute top-5 left-1/2  transform -translate-x-1/2 text-4xl text-black bg-white/50 rounded-full p-4"
                    onClick={() => setShowRightContainer(true)}>
                    <RiArrowDownSLine />
                </button>

                <div
                    className={`RightContainerHome fixed inset-0 bg-black/90t ext-white md:p-[27px_10px_75px_10px] transition-transform duration-300  md:bg-transparent anchoPrincipalDos ${
                        showRightContainer
                            ? "translate-y-0"
                            : "translate-y-full translateright"
                    }`}
                    style={{
                        backgroundImage:
                            'url("https://i.postimg.cc/mDg6RjS7/Fondoinicio2.png")',
                    }}>
                    <button
                        className="noneHidden absolute top-5 right-5 text-4xl bg-yellow-500 rounded-full p-2"
                        onClick={() => setShowRightContainer(false)}>
                        <RiArrowUpSLine />
                    </button>

                    <div className="middleRightContainerHome">
                        <div className="fisrTitleHomepage">
                            <p className="text-[40px] sm:text-[45px] md:text-[50px]">
                                ACCESORIOS Y REPUESTOS
                            </p>
                        </div>
                        <div className="titleAmarillo">
                            <p className="xs:text-[20px] sm:text-[25px] md:text-[35px]">
                                PARA TU VEHICULO
                            </p>
                        </div>
                        <div className="iconosHome">
                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(2)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <RiPoliceCarFill />
                                </div>
                                <div className="textIconHome">
                                    <p>
                                        CARROS Y <br />
                                        CAMIONETAS
                                    </p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(1)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <RiMotorbikeFill size={50} />
                                </div>
                                <div className="textIconHome">
                                    <p>MOTOS</p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(3)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <BsBusFrontFill size={50} />
                                </div>
                                <div className="textIconHome">
                                    <p>CAMIONES</p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(6)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <FaBusAlt size={50} />
                                </div>
                                <div className="textIconHome">
                                    <p>
                                        BUSES Y <br /> VANS
                                    </p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(4)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <IoCarSport size={50} />
                                </div>
                                <div className="textIconHome">
                                    <p>ELECTRICOS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSevenTopBanner;

/*
 <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src="/static/img/carritodecompra.jpg"
                            />
                            <Card.Body>
                                <Card.Title onClick={prueba}>
                                    Card Title
                                </Card.Title>
                                <Card.Text>
                                    ssss
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
*/
