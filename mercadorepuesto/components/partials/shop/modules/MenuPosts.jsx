import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useMediaQuery, useTheme } from "@mui/material";

let itemMenu = [];

const MenuPost = (props) => {
    const { selectOptions, setSelectOptions, estadoMyPost } = props;
    const [titulo, setTitulo] = useState("Ordenar por");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const sortByItems = [
        {
            id: 1,
            text: "Editar",
        },
        {
            id: 2,
            text: "Ver publicación",
        },
        {
            id: 3,
            text: "Ver estadisticas",
        },
        {
            id: 4,
            text: "Pausar publicación",
        },
        {
            id: 5,
            text: "Duplicar",
        },
        {
            id: 6,
            text: "Eliminar",
        },
        {
            id: 7,
            text: "Ayuda",
        },
    ];

    // <a href="#">{item.text}</a>
    const viewItems = sortByItems.map((item) => (
        <div className="cajaopcionesmenupost">
            <Menu.Item
                key={item.id}
                onClick={() => selectItem(item.id, item.text)}>
                <div className="textomenuposts">{item.text}</div>
            </Menu.Item>
        </div>
    ));

    const selectItem = (data, text) => {
        //let editduplicarprd = JSON.parse(sessionStorage.getItem("editduplicarprd"));
        sessionStorage.setItem("editduplicarprd", JSON.stringify(data));
        setSelectOptions(data);
        setTitulo(text);
    };

    const view = <Menu className="mt-[-6px]">{viewItems}</Menu>;
    // textoordenarporrev
    return (
        <div className="mt-10 mb-10 ps-shop__sortby">
            <Dropdown
                overlay={view}
                trigger={isMobile ? ["click"] : ["hover"]}
                placement="bottomLeft"
                className="ps-dropdown-toggle sinborder">
                <a className="flechaordenarpor">
                    <div>
                        <MoreVertIcon
                            className="tamanoiconomenu"
                            style={{ fontSize: 30 }}
                        />
                    </div>
                </a>
            </Dropdown>
        </div>
    );
};

export default MenuPost;
