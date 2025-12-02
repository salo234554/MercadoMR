import axios from "axios";
import { FormattedVehicle } from "~/types/Filter";
import { URL_BD_MR } from "~/helpers/Constants";

export interface VehicleWithId extends FormattedVehicle {
    id: number;
}

export const getAllFilters = () =>
    axios.get(URL_BD_MR + "997");

export const findVehiclesByUserId = (id: number) =>
    axios({
        method: "post",
        url: URL_BD_MR +  "29",
        params: { idusuario: id },
    });

export const submitVehicle = (vehicle: FormattedVehicle) => {
    const params = {
        ...vehicle,
    };

    return axios({
        method: "post",
        url: URL_BD_MR +  "27",
        params,
    });
};

export const deleteVehicleById = (id: number) =>
    axios({
        method: "post",
        url: URL_BD_MR +  "31",
        params: { id: id },
    });

export const updateVehicleById = (vehicle: VehicleWithId) => {
    const params = {
        ...vehicle,
    };

    return axios({
        method: "post",
        url: URL_BD_MR +  "30",
        params,
    });
};
