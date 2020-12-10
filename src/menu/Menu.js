import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import TemporaryDrawer from './TemporaryDrawer';
import EditPlayersDialog from './EditPlayersDialog';

export default function Menu(props) {
  const [isDrawerExpanded, expandDrawer] = React.useState(false);
  const [isEditPlayersDialogOpen, openEditPlayerDialog] = React.useState(false);

  const savePlayers = (players) => {
    openEditPlayerDialog(false);
    props.onPlayersChanged(players);
  }

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    expandDrawer(open);
  };

  const resetScore = () => {
    toggleDrawer(false);
    props.onResetScore();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" style={{ marginRight: "8px" }}
          onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5">
          Scoring 26
        </Typography>
      </Toolbar>
      <TemporaryDrawer open={isDrawerExpanded}
        onClose={toggleDrawer(false)}
        editPlayers={() => openEditPlayerDialog(true)} 
        resetScore={resetScore}
        />

      <EditPlayersDialog open={isEditPlayersDialogOpen}
        onClose={() => openEditPlayerDialog(false)}
        onSave={savePlayers}
      />
    </AppBar>
  );
}
