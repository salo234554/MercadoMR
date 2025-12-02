/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CloseWindowContext } from "../Header";
import {
    FilterContext,
    key,
    keys,
    SavedVehicle,
    state,
} from "../FilterWrapper";
import VehicleOverview from "./VehicleOverview";
import Button from "./Button";
import { Themes } from "~/utilities/StyleVariables";
import { useSelector, useDispatch } from "react-redux";
import { getFilterGarage } from "../../../../store/filtergarage/action";
import { getItemSelectGarage } from "../../../../store/itemselectgarage/action";
import { getDeleteItem } from "../../../../store/deleteitem/action";
import { getSelectItem } from "../../../../store/selectitem/action";
import { getVehiculosGarage } from "../../../../store/vehiculosgarage/action";
import { getCloseGarage } from "../../../../store/closegarage/action";
import { getReturn } from "../../../../store/return/action";
import { getCtlrVehSelected } from "../../../../store/ctlrvehselected/action";
import { useRouter } from "next/router";
import useGetProducts from "~/hooks/useGetProducts";

interface Props {
    vehicles: SavedVehicle[];
    setMostrar: React.Dispatch<React.SetStateAction<boolean>>;
    scrollRef: React.RefObject<HTMLDivElement>;
}

let itemvehsel = [];

const Select = ({ vehicles, setMostrar, scrollRef }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { setView } = useContext(FilterContext);
    const closeWindow = useContext(CloseWindowContext);
    const [itemSel, setItemSel] = useState(null);
    const [dataFind, setDataFind] = useState(null);

    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );

    const { loading, productItems, getProducts, dataPayload } =
        useGetProducts();

    const deleteitem = useSelector((state: any) => state.deleteitem.deleteitem);
    const selectitem = useSelector((state: any) => state.selectitem.selectitem);
    const datafind = useSelector((state: any) => state.returndata.return);
    const ctlrvehselected = useSelector((state: any) => state.ctlrvehselected.ctlrvehselected);

    //console.log("ctlrvehselected", ctlrvehselected);

    const goToCreate = () => {
        localStorage.setItem("prevvehselect", JSON.stringify(ctlrvehselected == 1000 ? null : ctlrvehselected));
        scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        localStorage.setItem("addvehgarage", JSON.stringify(true));
        localStorage.setItem("canceladdveh", JSON.stringify(false));
        //let idvehgarage = localStorage.getItem("idvehgarage");
        localStorage.setItem("vehdeletegarage", JSON.stringify(null));
        let longveh = vehicles.length;
        dispatch(getCtlrVehSelected(longveh));

        const limit = user ? 10 : 3;
        dispatch(getCloseGarage(0));
        dispatch(getDeleteItem(0));
        setItemSel(null);

        if (user) {
            localStorage.setItem("idvehgarage", JSON.stringify(0));
        } else
            if (!user && vehicles.length > 2)
                localStorage.setItem("idvehgarage", JSON.stringify(2));
            else
                if (!user)
                    localStorage.setItem("idvehgarage", JSON.stringify(vehicles.length));

        vehicles.length >= limit
            ? setView(state.Warning)
            : setView(state.Filter);
    };

    const onClose = async () => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        dispatch(getFilterGarage(false));
        dispatch(getCloseGarage(1));
        dispatch(getDeleteItem(0));
        closeWindow();
        setMostrar(false);

        setTimeout(() => {
            setMostrar(true);
        }, 10);

        const queries = {
            name_contains: dataFind,
        };
    };

    useEffect(() => {
        if (datafind) {
            dispatch(getReturn(false));
            onClose();
        }
    }, [datafind])

    const selectVeh = (indice) => {

        let idfind = indice;
        if (!indice)
            idfind = 0;

        let datafind = null;
        vehicles &&
            vehicles.map((row, index) => {
                if (index == idfind) {
                    datafind = row.brand + " " + row.cilinder + " " + row.year + " " + row.body + " " + row.model + " " + row.model;
                }
            });
        setDataFind(datafind);

        setItemSel(indice);

        let idvehgarage;

        idvehgarage = localStorage.getItem("idvehgarage");

        if (idvehgarage >= "0") {
            idvehgarage = localStorage.getItem("idvehgarage");
        } else {
            idvehgarage = "-1";
        }

        vehicles &&
            vehicles.map((row, index) => {
                if (index == indice) {
                    if (idvehgarage < 0) {

                        localStorage.setItem(
                            "selectvehgarage",
                            JSON.stringify(null)
                        );
                    } else {
                        if (deleteitem == 0 && selectitem == 0) {

                            localStorage.setItem(
                                "selectvehgarage",
                                JSON.stringify(row)
                            );
                        }
                    }
                    itemvehsel.push(row);
                    dispatch(getItemSelectGarage(row));
                }
            });

        if (deleteitem == 1) {
            let vehiguales = localStorage.getItem("vehiguales");
            let vehselected = localStorage.getItem("vehselected");
            let selectvehgarage = JSON.parse(localStorage.getItem("selectvehgarage"));

            if (!vehiguales)
                localStorage.setItem("selectvehgarage", JSON.stringify(null));
            else {
                let item = parseInt(vehselected) - 1;
                if (item == -1 && ctlrvehselected) {
                    localStorage.setItem("idvehgarage", JSON.stringify(0));
                } else
                    if (ctlrvehselected && selectvehgarage && selectvehgarage?.length) {
                        localStorage.setItem("idvehgarage", JSON.stringify(item));
                    }
            }
            dispatch(getDeleteItem(0));
        }
    };

    useEffect(() => {
        selectVeh(itemSel);
        dispatch(getItemSelectGarage(itemvehsel));
        dispatch(getVehiculosGarage(vehicles));

        const mayoramenor = (b, a) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        };

        vehicles && vehicles?.sort(mayoramenor);

    }, [vehicles, itemvehsel]);

    useEffect(() => {
        let idvehgarage = localStorage.getItem("idvehgarage");

        let item = parseInt(idvehgarage) + 1;

        if (item == vehicles?.length && !user && vehicles?.length > 0 && ctlrvehselected) {
            localStorage.setItem("selectvehgarage", JSON.stringify(vehicles[idvehgarage]));
        } else
            if (item == vehicles?.length && !user && vehicles?.length > 0 &&
                !ctlrvehselected && ctlrvehselected != 0) {
                localStorage.setItem("selectvehgarage", JSON.stringify(null));
                localStorage.setItem("idvehgarage", JSON.stringify(null));
            }
    }, [vehicles]);

    useEffect(() => {
        if (selectitem == 1) {
            localStorage.setItem("selectvehgarage", JSON.stringify(null));
            dispatch(getSelectItem(0));
        }
    }, [selectitem]);

    useEffect(() => {
        if (!ctlrvehselected && ctlrvehselected != 0) {
            localStorage.setItem("idvehgarage", JSON.stringify(null));
            localStorage.setItem("vehselected", JSON.stringify(null));
        }
    }, [ctlrvehselected]);

    return (
        <Container length={vehicles.length}>
            <div className="select-container">
                <p>Agrega tu vehículo para filtrar tu busqueda</p>
                <VehicleOverview type={state.None} scrollRef={scrollRef} />

                <div className="vehicles-container">
                    {vehicles
                        .sort((a, b) => (user ? b.id - a.id : 1))
                        .map((op, i) => (
                            <div onClick={() => selectVeh(i)}>
                                <VehicleOverview
                                    type={state.Select}
                                    key={i}
                                    index={user ? i : i}
                                    vehicle={op}
                                    scrollRef={scrollRef}
                                />
                            </div>
                        ))}
                </div>

                <button className="add-vehicle-button"
                    onClick={goToCreate}
                >
                    Agrega tu vehículo
                </button>
            </div>
            <div className="button-container">
                <Button onclick={onClose}>Listo</Button>
            </div>
        </Container>
    );
};

export default Select;

interface ContainerProps {
    length: number;
}

const Container = styled.div<ContainerProps>`
    display: grid;

    .select-container {
        .vehicles-container {
            /* max-height: 15rem;
      overflow-y: scroll;
      overflow-x: hidden; */
            /* padding-right: 0.4rem; */

            /* scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      } */

            & > div {
                &:first-child {
                    margin-top: 0;
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        & > p {
            font-size: 1.75rem;
            font-weight: 500;
            line-height: 1.75rem;
            color: ${Themes.main};
            padding: 0.5rem 0;
            padding-right: 2rem;
        }

        .add-vehicle-button {
            background-color: ${Themes.offWhite};
            border-radius: 999px;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            padding: 0.75rem 1.25rem;
            text-align: start;
            width: 100%;
            ${({ length }) => (length > 0 ? "margin-top: 1rem;" : "")}
        }
    }

    .button-container {
        justify-self: end;
    }
`;
