"use client";
import React, { FC, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isInvalid?: boolean;
    messageError?: string;
    hint?: boolean;
}

const Input: FC<IProps> = ({ label, isInvalid, messageError, hint, ...props }) => {
    const classError =
        isInvalid && !props.readOnly
            ? "border-red-500 text-red-500 placeholder:text-red-500"
            : "border-zinc-400";
    const classlabelError = isInvalid && !props.readOnly ? "text-red-500" : null;
    const classLabelReadOnly = props.readOnly ? "text-zinc-600/70" : null;

    return (
        <div className="flex flex-col">
            <label className={`block ${classlabelError} ${classLabelReadOnly}`}>
                {label}
            </label>
            <input
                {...props}
                className={`outline-none rounded-md border-2 border-solid p-2 w-full read-only:border-zinc-500/20 read-only:text-zinc-600/70 read-only:pointer-events-none ${classError}`}
            />
            {hint && !isInvalid && (
                <span className="text-slate-600 text-xs ml-2">
                    {props.value?.toString().length} / {props.maxLength}
                </span>
            )}
            {isInvalid && !props.readOnly && (
                <span className="text-red-500 text-xs ml-2">{messageError}</span>
            )}
        </div>
    );
};

export default Input;
