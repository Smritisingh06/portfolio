/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DiHtml5Multimedia } from "react-icons/di";
import { GiSwordBrandish } from "react-icons/gi";
import GroupIcon from "@material-ui/icons/Group";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "src/component/Logo";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import { VscFeedback } from "react-icons/vsc";

import {
  FaTachometerAlt,
  FaQuestionCircle,
  FaCreativeCommonsBy,
} from "react-icons/fa";
import NavItem from "./NavItem";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { AiOutlineControl } from "react-icons/ai";
import { SiFuturelearn } from "react-icons/si";
import { DiJqueryLogo } from "react-icons/di";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "src/context/User";
import { RiAdminLine } from "react-icons/ri";
import { MdSpaceDashboard, MdContentPaste } from "react-icons/md";
import { Category } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { BsCardList, BsCollectionFill } from "react-icons/bs";
const sections = [
  {
    items: [
      {
        title: "Marketplace",
        icon: BsCardList,
        href: "/explore",
      },
      {
        title: "Collections",
        icon: BsCollectionFill,
        href: "/collections",
      },
      {
        title: "Creators",
        icon: FaCreativeCommonsBy,
        href: "/creators-list",
      },
      {
        title: "My Collection",
        icon: FaTachometerAlt,
        href: "/my-collections",
      },
    ],
  },
];

const sectionsAfterLogin = [
  {
    items: [
      {
        title: "My Activity",
        icon: DashboardIcon,
        href: "/activity",
      },
      // {
      //   title: "Admin ",
      //   icon: DashboardIcon,
      //   href: "/add-subadmin",
      // },
    ],
  },
];

const sectionsAdmin = [
  {
    items: [
      {
        title: "Dashboard",
        sub: "Dashboard",
        icon: MdSpaceDashboard,
        href: "/dashboard",
      },
      {
        title: "User Management",
        sub: "userManagement",
        icon: RiAdminLine,
        href: "/user-management",
      },
      {
        title: "Sub-admin Management",
        icon: RiAdminLine,
        href: "/subadmin-management",
      },
      {
        title: "NFT Management",
        sub: "nftManagement",
        icon: ShoppingCartIcon,
        href: "/nft-management",
      },
      {
        title: "KYC Management",
        sub: "kycManagement",
        icon: DiJqueryLogo,
        href: "/kyc-management",
      },
      {
        title: "Revenue Management",
        sub: "revenueManagement",
        icon: SiFuturelearn,
        href: "/revenue-management",
      },
      {
        title: "Control",
        sub: "Control",
        icon: AiOutlineControl,
        href: "/control",
      },
      {
        title: "Category",
        sub: "categoryManagement",
        icon: Category,
        href: "/category",
      },
      {
        title: "Static Content",
        sub: "staticContentManagement",
        icon: MdContentPaste,
        href: "/static-content",
      },
      {
        title: "Feedback",
        sub: "feedbackManagement",
        icon: VscFeedback,
        href: "/feedback-list",
      },
      {
        title: "Media",
        sub: "mediaManagement",
        icon: DiHtml5Multimedia,
        href: "media-list",
      },
      {
        title: "Faq",
        sub: "faqManagement",
        icon: FaQuestionCircle,
        href: "faq-list",
      },
    ],
  },
];

const sectionsBelow = [
  {
    items: [
      {
        icon: ExitToAppIcon,
        href: "/terms-and-condition",
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: theme.palette.background.default,
    // backdropFilter: "blur(44px)",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: "100%",
    border: "none",
    background: theme.palette.background.blur,
    margin: "5px 5px 0px 16px",
    borderRadius: "15px",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  logoicon: {
    display: "flex",
    marginTop: "16px",
    alignItems: "center",
    marginLeft: "30px",
  },
  logoutbutton: {
    justifyContent: "space-between",
    paddingLeft: 10,
    borderRadius: 0,
    width: "60px",
    textAlign: "center",
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const location = useLocation();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  console.log(" ----- permissions ", user.permissions);

  const filteredItems = sectionsAdmin[0].items.filter((item) => {
    const permissionKey = item.sub;
    return (
      user.permissions[permissionKey] && user.permissions[permissionKey].read
    );
  });

  let SubAdminKeys = [
    {
      items: filteredItems,
    },
  ];
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box pt={4}>
          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}

          {user?.isLogin &&
            sectionsAfterLogin.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}

          {user?.isLogin &&
            user?.userData?.userType == "Admin" &&
            sectionsAdmin.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}
          {user?.isLogin &&
            user?.userData?.userType == "SubAdmin" &&
            SubAdminKeys &&
            SubAdminKeys.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}
        </Box>
        <Box className="side_nev_Bottom">
          {sectionsBelow.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            ></List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box style={{ margin: "10px 30px 0px" }}>
            <Link to="/">
              <Logo className="logoImg" />
            </Link>
          </Box>
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          <Box style={{ margin: "10px 30px 0px" }}>
            <Link to="/">
              <Logo className="logoImg" />
            </Link>
          </Box>
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
