import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from '@material-ui/icons/Group';
import FiberNewIcon from '@material-ui/icons/FiberNew';

export default function TemporaryDrawer(props) {
    const onClose = () => props.onClose();
    const editPlayers = () => props.editPlayers();
    const resetScore = () => props.resetScore();

    return (
        <Drawer anchor={"left"} open={props.open} onClose={onClose}>
            <div style={{ width: "250px" }} role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <List>
                    <ListItem button key={"Set Players"} onClick={editPlayers}>
                        <ListItemIcon><GroupIcon /></ListItemIcon>
                        <ListItemText primary={"Set Players"} />
                    </ListItem>

                    <ListItem button key={"Reset Score"} onClick={resetScore}>
                        <ListItemIcon><FiberNewIcon /></ListItemIcon>
                        <ListItemText primary={"Reset Score"} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}