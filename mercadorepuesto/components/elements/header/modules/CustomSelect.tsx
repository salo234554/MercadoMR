/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Themes } from "~/utilities/StyleVariables";
import { FaCaretDown } from "react-icons/fa";

interface Option {
    id: number;
    label: string;
}

interface Props {
    defaultValue: string | number;
    disabled?: boolean;
    setIdSelected: React.Dispatch<React.SetStateAction<string | null>>;
    options: Option[];
    value: string | null;
    maxLength?: number;
    maxLengthLg?: number;
}

const CustomSelect = ({
    defaultValue,
    disabled,
    setIdSelected,
    options,
    value,
    maxLength,
    maxLengthLg
}: Props) => {
    const getValue = ($value: string) => {
        return (
            options.find((option) => option.id.toString() === $value)?.label ??
            defaultValue
        );
    };

    const cortarTexto = (texto: string | number, max: number) => {
        const str = String(texto);
        return str.length > max ? str.slice(0, max) + "..." : str;
    };

    const [valueSelected, setValueSelected] = useState<string | number>(
        value !== null ? getValue(value) : defaultValue
    );
    const [hide, setHide] = useState<boolean>(true);
    const [filter, setFilter] = useState<string | null>("");

    const selectOption = (id: number) => {
        setIdSelected(id.toString());
        setValueSelected(
            options.find((op) => op.id === id)?.label ?? defaultValue
        );
        setHide(true);
    };

    const SelectContainer = useRef<HTMLDivElement>(null);
    const OpenButton = useRef<HTMLButtonElement>(null);

    const closeSelect = useCallback(() => setHide(true), []);

    useEffect(() => {
        setFilter("");
    }, [hide]);

    useEffect(() => {
        setValueSelected(value !== null ? getValue(value) : defaultValue);
    }, [value]);

    useEffect(() => {
        const node = SelectContainer.current;

        if (!node) return;

        node.onmouseout = () => {
            document.addEventListener("click", closeSelect);
        };

        node.onmouseover = () => {
            document.removeEventListener("click", closeSelect);
        };
    }, [SelectContainer.current]);

    return (
        <Container
            disabled={disabled !== undefined && disabled}
            className="select-container"
            ref={SelectContainer}>
            <button
                className="open-button"
                data-type={defaultValue}
                data-value={value}
                ref={OpenButton}
                onClick={() => {
                    !disabled && setHide((last) => !last);
                    OpenButton.current.classList.remove("empty");
                }}>
                
                <p className="pMedianoText">{valueSelected}</p>
                <p className="esconderPMobile">
                    {maxLengthLg && maxLengthLg > 0
                        ? cortarTexto(valueSelected, maxLengthLg)
                        : valueSelected}
                </p>
                <p className="ellipsis-50">{valueSelected}</p>
                <FaCaretDown style={{ marginLeft: "auto", fontSize: "15px", color: "#2C2E82", marginTop: "-2rem", marginRight:"8px" }} />
            </button>
            <ul className="options">
                {!hide && (
                    <>
                        <li>
                            <input
                                onChange={(e) => setFilter(e.target.value)}
                                type="text"
                                placeholder="Buscar..."
                            />
                        </li>
                        {options.map(
                            (option) =>
                                (!filter ||
                                    option.label
                                        .toLowerCase()
                                        .includes(
                                            filter.toLocaleLowerCase()
                                        )) && (
                                    <li className="option" key={option.id}>
                                        <button
                                            onClick={() =>
                                                selectOption(option.id)
                                            }>
                                            {option.label}
                                        </button>
                                    </li>
                                )
                        )}
                    </>
                )}
            </ul>
        </Container>
    );
};

export default CustomSelect;

interface ContainerProps {
    disabled: boolean;
}

const Container = styled.div<ContainerProps>`
    position: relative;
    font-size: 1.5rem;

    p {
        font-size: 1.5rem;
        color: #2C2E82;
    }

    button,
    input {
        width: 100%;
        text-align: start;
        padding: 0.75rem;
        outline: none;
        font-weight: 500;
    }

    input {
        /* color: black; */
    }

    .open-button {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* transition: 0.3s; */
        /* color: ${(props) => (props.disabled ? "gray" : Themes.main)}; */ 
        background-color: ${(props) => (props.disabled ? "#eee" : "white")};

        &.empty p{
            color: red; 
        }

        &.empty svg{
            color: red !important; 
        }
    }

    .options {
        background-color: white;
        border-radius: 0.5rem;
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 10;
        max-height: 20rem;
        overflow-y: scroll;
        box-shadow: 8px 8px 1rem rgba(0, 0, 0, 0.1);

        .option {
            border: 0.5px ${Themes.offWhite} solid;
            border-left: 0;
            border-right: 0;

            &:last-child {
                border-bottom: 0;
            }

            &:hover {
                color: ${Themes.main};
                background-color: ${Themes.lightBlue};
            }
        }
    }
`;
