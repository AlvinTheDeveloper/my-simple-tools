import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from "react-router-dom";

import LoadingComponent from './Loading'
const WelcomePage = React.lazy(()=>import('./WelcomePage'))
const SnipcartButtonGenerator = React.lazy(()=>import('./tool/SnipcartButtonGenerator'))

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        textAlign: 'center',
        maxWidth:'1200px'
    },
}));

function App(props) {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {[
                    {name: "Home", path: "/"},
                    {name: "Snipcart Cart Button Generator", path: "/snipcart-button-generator"},].map((item, index) => (
                    <Link href={item.path}>
                        <ListItem button key={item.name}>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Router>
                <React.Suspense fallback={LoadingComponent()}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                Responsive drawer
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <nav className={classes.drawer} aria-label="mailbox folders">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Switch>
                            <Route path="/snipcart-button-generator">
                                <SnipcartButtonGenerator/>
                            </Route>
                            <Route path="/">
                                <WelcomePage/>
                            </Route>
                        </Switch>
                    </main>
                </React.Suspense>
            </Router>
        </div>
    );
}

export default App;
