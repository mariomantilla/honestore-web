import React from "react";

export default function Underline(props: {children: React.ReactNode | React.ReactNode}) {
    return (
        <span className="mark">{props.children}</span>
    )
}