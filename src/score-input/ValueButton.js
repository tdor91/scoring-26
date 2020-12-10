import { Button } from '@material-ui/core';

const ValueButton = (props) => {
    const modifierMap = {
        1: "",
        2: "D ",
        3: "T "
    }

    const onClick = () => props.onClick(props.value, props.modifier);

    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {modifierMap[props.modifier] + props.value}
        </Button>
    );
}

export default ValueButton;