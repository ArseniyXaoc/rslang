import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar, Toolbar, Typography, ListItemProps,
} from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import headerStyles from "./HeaderStyles";
import themes from "./HeaderThemes";
import UserProfile from "./UserProfile/UserProfile";
import GlobalCss from "../../assets/stylesheets/GlobalCSS";
import homeIcon from "../../assets/icons/main.svg";
import bookIcon from "../../assets/icons/textbook.svg";
import dictionaryIcon from "../../assets/icons/language.svg";
import gamesIcon from "../../assets/icons/games.svg";
import settingIcon from "../../assets/icons/settings.svg";
import statIcon from "../../assets/icons/trend.svg";
import teamIcon from "../../assets/icons/group.svg";
import exitIcon from "../../assets/icons/logout.svg";
import bookImg from "../../assets/images/main/textbook.png";

const buttonsData = [
  /*   {
      label: "Главная",
      href: "/main",
    },
      {
      label: "Изучение",
      href: "/learning",
    },
    {
      label: "Словарь",
      href: "/dictionary",
      icon: dictionaryIcon,
    },*/
  {
    label: "Мини-игры",
    href: "/games",
    icon: gamesIcon,

  },
  {
    label: "Настройки",
    href: "/settings",
    icon: settingIcon,

  },
  {
    label: "Статистика",
    href: "/statistics",
    icon: statIcon,

  },
  {
    label: "Команда",
    href: "/team",
    icon: teamIcon,

  },
  /* {
     label: "Exit",
     href: "/",
     icon: exitIcon,
 
   },*/
];

function Header({ theme }) {

  const [{
    appBar, toolbar, logo, list, listLinkItemSection, listLinkItemLearn,
    listItemContainer, collapsedList, listLinkItem, closeButton,
    closeButtonContainer, menuIcon,
  }, setCalsses] = useState(headerStyles(themes[theme] || themes.normal));
  const [open, setOpen] = useState(false);
  const [openDictionary, setOpenDictionary] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpenLearning = () => {
    setOpen(!open);
  };

  const handleClickOpenDictionary = () => {
    setOpenDictionary(!openDictionary);
  };

  const displayMenu = () => {
    const handleDrawerOpen = () => setDrawerOpen(true);

    const handleDrawerClose = () => setDrawerOpen(false);

    const getListItems = (path: string) => {
      function ListItemLink(props: ListItemProps<NavLink, { button?: true }>) {
        return <ListItem button component={NavLink} {...props} />;
      }

      return [1, 2, 3, 4, 5, 6].map((listItem) => (
        <ListItemLink key={`k${listItem}`} to={`/${path}/${listItem}`} activeClassName="Mui-selected" onClick={handleDrawerClose}>
          <ListItemText className={listLinkItemSection} primary={`Раздел ${listItem}`} />
        </ListItemLink>
      ));
    };

    const getDrawerChoices = () => buttonsData.map(({ label, href, icon }) => (
      <NavLink
        className={listLinkItem}
        to={href}
        key={label}
        activeClassName="Mui-selected"
        onClick={() => {
          if (label === "Мини-игры") {
            dispatch({ type: "GAME_SET_DEFAULT" });
          }
          handleDrawerClose();
        }}
      >
        <div className={listItemContainer}>
          <img className={menuIcon} src={`${icon}`} alt={`${icon}`} />
          <MenuItem className={listLinkItem}>{label}</MenuItem>
        </div>
      </NavLink>
    ));

    return (
      <div >
        <Toolbar className={toolbar}>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon
              fontSize="large" />
          </IconButton>
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div>
              <IconButton className={closeButtonContainer}
                {...{
                  onClick: handleDrawerClose,
                }}
              >
                <CloseIcon className={closeButton}
                  fontSize="large" />
              </IconButton>
            </div>

            <List className={list}>
              <Link to="/" className={listLinkItem}>
                <div className={listItemContainer}>
                  <img className={menuIcon} src={homeIcon} alt="home" />
                  <MenuItem onClick={handleDrawerClose}>{"Главная"}</MenuItem>
                </div>
              </Link>

              <ListItem className={collapsedList} button onClick={handleClickOpenLearning}>
                <div className={listItemContainer}>
                  <img className={menuIcon} src={bookIcon} alt="textbook" />
                  <ListItemText className={listLinkItemLearn} primary="Изучение" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </div>
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {getListItems("section")}
                </List>
              </Collapse>
            </List>

            <List className={list}>
              <ListItem className={collapsedList} button onClick={handleClickOpenDictionary}>
                <div className={listItemContainer}>
                  <img className={menuIcon} src={dictionaryIcon} alt="dictionary" />
                  <ListItemText className={listLinkItemLearn} primary="Словарь" />
                  {openDictionary ? <ExpandLess /> : <ExpandMore />}
                </div>
              </ListItem>
              <Collapse in={openDictionary} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {getListItems("dictionary")}
                </List>
              </Collapse>
            </List>

            <div>
              {getDrawerChoices()}
            </div>
          </Drawer>

          <Typography variant="h5" component="h1" className={logo}>
            RS Lang
          </Typography>

          <UserProfile />

        </Toolbar>
      </div>
    );
  };

  return (
    <>
      <GlobalCss />
      <AppBar className={appBar}>
        {displayMenu()}
      </AppBar>
    </>
  );
}

export default Header;
