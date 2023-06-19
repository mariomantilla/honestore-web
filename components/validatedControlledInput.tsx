import TextField from "@mui/material/TextField";
import { useState } from "react";

export const ValidatedControlledInput = (props: { label: string, pattern: RegExp, setValue: (val: string | null) => void, helper: string, initialValue?: string }) => {

    const [value, setValue] = useState(props.initialValue??'');
    const [error, setError] = useState(false);

    return (
        <TextField
            variant="filled"
            helperText={props.helper}
            label={props.label}
            fullWidth
            error={error}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
                if (event.target.value === '' || event.target.value.match(props.pattern)) {
                    setError(false)
                    props.setValue(event.target.value);
                } else {
                    props.setValue(null);
                    setError(true)
                }
            }}
        />
    );
}
