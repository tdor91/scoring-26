import React from 'react';
import { Checkbox, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    playerInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '4px'
    },
    playerName: {
        flex: '1 0',
    }
}));

export default function EditPlayerInput(props) {
    const classes = useStyles();

    const [disabled, setDisabled] = React.useState(props.disabled);
    const [name, setName] = React.useState('');

    const textChanged = (event) => {
        setName(event.target.value);
        props.playerChanged({
            enabled: !disabled,
            name: event.target.value
        });
    }

    const checkBoxClicked = (event) => {
        setDisabled(!event.target.checked);
        props.playerChanged({
            enabled: event.target.checked,
            name: name
        });
    }

    return (
        <div className={classes.playerInput}>
            <TextField variant="outlined" className={classes.playerName} label={props.label}
                disabled={disabled}
                onChange={textChanged}
                defaultValue={props.defaultValue}
            />
            <Checkbox color="primary" onChange={checkBoxClicked} checked={!disabled} />
        </div>
    );
}