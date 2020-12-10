import { Button } from '@material-ui/core';

const ModifierButton = (props) => {
    const onClick = () => props.onClick();

    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {props.text}
        </Button>
    );
}

export default ModifierButton;