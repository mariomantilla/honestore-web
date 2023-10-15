export const clampStyles = (lines: number, lineHeight: number = 1.43) => {
    return {
        lineHeight: `${lineHeight}rem`,
        maxHeight: `${lineHeight * lines}rem`,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: lines,
        lineClamp: lines,
        WebkitBoxOrient: "vertical",
        transition: "max-height 2s"
    }
}
