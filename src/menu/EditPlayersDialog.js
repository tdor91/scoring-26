import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EditPlayerInput from './EditPlayerInput';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        marginBottom: '16px',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditPlayersDialog(props) {
    const classes = useStyles();

    const [players, setPlayers] = React.useState([
        { name: "Player 1", enabled: true },
        { name: "Player 2", enabled: true },
        { name: "Player 3", enabled: false },
        { name: "Player 4", enabled: false }
    ]);

    const onClose = () => props.onClose();
    const onSave = () => {
        const playerNames = players.filter(p => p && p.enabled).map(p => p.name);
        props.onSave(playerNames);
    };

    const playerChanged = (id, player) => {
        players[id] = player;
        setPlayers(players);
    }

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={onClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Set Players
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <EditPlayerInput label="Player 1" 
                    defaultValue={players[0].name}
                    playerChanged={(player) => playerChanged(0, player)} 
                    disabled={!players[0].enabled} />

                <EditPlayerInput label="Player 2" 
                    defaultValue={players[1].name}
                    playerChanged={(player) => playerChanged(1, player)} 
                    disabled={!players[1].enabled} />

                <EditPlayerInput label="Player 3" 
                    defaultValue={players[2].name}
                    playerChanged={(player) => playerChanged(2, player)} 
                    disabled={!players[2].enabled} />
                    
                <EditPlayerInput label="Player 4" 
                    defaultValue={players[3].name}
                    playerChanged={(player) => playerChanged(3, player)} 
                    disabled={!players[3].enabled} />
            </Dialog>
        </div>
    );
}
