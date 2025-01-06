/* eslint-disable react/react-in-jsx-scope */
"use client";
import React from "react";
import Select, { GroupBase, Props } from "react-select";

// interface SelectWithErrorProps {
//   label?: string;
//   name?: string;
//   options: { value: string; label: string }[];
//   error?: string;
//   placeholder?: string;
//   [x: string | number | symbol]: unknown;
// }

// export interface IOption {
//   label: string;
//   value: string;
// }

export default function SelectWithErrorCustomSelect(props) {
  console.log('IN SELECTION',props);
  return (
    <div className="w-full">
      {props.label && (
        <label className="text-co-black font-bold text-base" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <Select
        {...props}
        // styles={{
        //   control: (baseStyles) => ({
        //     ...baseStyles,
        //     borderColor: !props.error ? "grey" : "red",
        //   }),
        //   valueContainer: (base) => ({
        //     ...base,
        //     textTransform: "capitalize",
        //   }),
        //   option: (base) => ({
        //     ...base,
        //     textTransform: "capitalize",
        //   }),
        // }}
      />
      {props.error && <p className="text-red-500 text-xs">{props.error}</p>}
    </div>
  );
}
