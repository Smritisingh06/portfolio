import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import SearchItem from "./views/pages/Searchh/Index";

import DashboardLayout from "./layouts/HomeLayout/DashboardLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home")),
  },

  {
    exact: true,
    path: "/item",
    layout: HomeLayout,
    component: SearchItem,
  },

  {
    exact: true,
    path: "/marketplace",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Marketplace/Index")),
  },

  {
    exact: true,
    path: "/marketplace-Detail",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Marketplace/MarketplaceDetail")
    ),
  },
  {
    exact: true,
    path: "/search-data",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/layouts/HomeLayout/DashboardLayout/SearchBox")
    ),
  },

  {
    guard: true,
    exact: true,
    path: "/my-mints",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Mint/MyMint")),
  },
  {
    exact: true,
    path: "/conect-wallet",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Connect/ConnectWallet")),
  },
  {
    guard: true,
    exact: true,
    path: "/mint",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Mint/Index")),
  },
  {
    guard: true,
    exact: true,
    path: "/mint-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Mint/MintNftDetails")),
  },

  {
    // guard: true,
    exact: true,
    path: "/edit-profile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EditProfile/EditProfile")),
  },
  {
    guard: true,
    exact: true,
    path: "/nft-report",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/NFTDetails")),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/user-management",
    component: lazy(() => import("src/views/pages/Admin/Admin")),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/nft-management",
    component: lazy(() => import("src/views/pages/Admin/NftManagement")),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/dashboard",
    component: lazy(() => import("src/views/pages/Admin/Dashboard")),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/control",
    component: lazy(() => import("src/views/pages/AdminControls/Controls")),
  },
  {
    exact: true,
    path: "/category-view",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Category/CategoryDetails")),
  },
  {
    guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/category",
    component: lazy(() =>
      import("src/views/pages/AdminControls/CategoryCreate")
    ),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/kyc-management",
    component: lazy(() =>
      import("src/views/pages/AdminControls/KYCmanagement/BrandAddlist")
    ),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/revenue-management",
    component: lazy(() =>
      import("src/views/pages/AdminControls/Revenuemanagement/RevenueMangement")
    ),
  },

  {
    exact: true,
    layout: DashboardLayout,
    path: "/add-static",
    component: lazy(() =>
      import("src/views/pages/AdminControls/StaticContent/AddStatic")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/static-content",
    component: lazy(() =>
      import("src/views/pages/AdminControls/StaticContent/ListStaticContent")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/view-static",
    component: lazy(() =>
      import("src/views/pages/AdminControls/StaticContent/ViewStaticContent")
    ),
  },

  {
    exact: true,
    layout: DashboardLayout,
    path: "/faqadd-list",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/ViewFaq")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/brand-adminlist",
    component: lazy(() =>
      import("src/views/pages/AdminControls/KYCmanagement/BrandAddlist")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/faq-list",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/Faq")
    ),
  },

  {
    exact: true,
    layout: DashboardLayout,
    path: "/editfaq-list",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/EditFaq")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/view-faqdata",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/ViewFaq")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/view-kycdetails",
    component: lazy(() =>
      import("src/views/pages/AdminControls/KYCmanagement/ViewBrandNft")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/my-viewbrand",
    component: lazy(() =>
      import("src/views/pages/AdminControls/KYCmanagement/MyViewBrand")
    ),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/add-faqdata",
    component: lazy(() =>
      import("src/views/pages/AdminControls/FaqManagement/AddFaq")
    ),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/add-subadmin",
    component: lazy(() => import("src/views/pages/AdminControls/SubAdmin")),
  },
  {
    // guard: true,
    exact: true,
    layout: DashboardLayout,
    path: "/subadmin-management",
    component: lazy(() => import("src/views/pages/Admin/SubAdmin")),
  },
  // {
  //   // guard: true,
  //   exact: true,
  //   layout: DashboardLayout,
  //   path: "/subadmin-management",
  //   component: lazy(() => import("src/views/pages/AdminControls/SubAdmin")),
  // },
  {
    exact: true,
    path: "/creators-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Creator/index")),
  },
  {
    // guard: true,
    exact: true,
    path: "/profile",
    layout: DashboardLayout,
    // layout: HomeLayout,

    component: lazy(() => import("src/views/pages/Profile/Profile")),
  },
  {
    guard: true,
    exact: true,
    path: "/feedback-list",
    layout: DashboardLayout,
    // layout: HomeLayout,

    component: lazy(() => import("src/views/pages/Admin/FeedbackList")),
  },
  {
    // guard: true,
    exact: true,
    path: "/subscribers",
    layout: DashboardLayout,
    // layout: HomeLayout,

    component: lazy(() => import("src/views/pages/Admin/SubscribersList")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/request-message",
    component: lazy(() =>
      import("src/views/pages/RequestBlockMessage/RequestMessage")
    ),
  },
  // Done
  {
    guard: true,
    exact: true,
    path: "/activity",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Activity/index")),
  },
  {
    exact: true,
    path: "/collections",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Collections/Collections")),
  },

  {
    exact: true,
    path: "/hot-collection",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Collections/HotCollection")),
  },
  {
    exact: true,
    path: "/my-collections",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyCollection/MyCollection")),
  },
  {
    exact: true,
    path: "/my-brandlist",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyBrand/MybrandNFT")),
  },
  {
    exact: true,
    path: "/mybrand-collectionlist",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/MyBrand/MybrandCollectionlist")
    ),
  },
  {
    // guard: true,
    exact: true,
    path: "/create",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Create/CreateNFT")),
  },

  {
    guard: true,
    exact: true,
    path: "/resale-nft",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Create/ResellNFT")),
  },

  {
    exact: true,
    path: "/creators",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Creator/index")),
  },
  {
    exact: true,
    path: "/author",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Author/Author")),
  },
  {
    exact: true,
    path: "/collection-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Details/Nft")),
  },

  {
    exact: true,
    path: "/auction",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/FeatureAuction/Auction")),
  },
  {
    exact: true,
    path: "/explore",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Marketplace/Index")),
  },
  {
    exact: true,
    path: "/feedback",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Feedback/Feedback.js")),
  },
  {
    exact: true,
    path: "/faqs",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/FAQs/Index")),
  },
  {
    exact: true,
    path: "/support-tickets",
    layout: HomeLayout,
    component: lazy(() => import("src/component/SupportTickets")),
  },
  {
    exact: true,
    path: "/ranking",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Ranking/Ranking.js")),
  },
  {
    exact: true,
    path: "/search",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Search")),
  },
  {
    exact: true,
    path: "/searchprofile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Search")),
  },
  {
    exact: true,
    path: "/help-center",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/HelpCenter/HelpCenter.js")),
  },
  {
    exact: true,
    path: "/edit-pressmedia",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/EditPressmedia")),
  },
  {
    exact: true,
    path: "/edit-media",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/EditMedia")),
  },
  {
    exact: true,
    path: "/edit-category",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EditCategory/EditCategory")),
  },
  {
    exact: true,
    path: "/media-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/MediaList")),
  },
  {
    exact: true,
    path: "/view-media",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PressMedia/ViewMedia")),
  },
  {
    exact: true,
    path: "/about",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/About/About")),
  },
  {
    exact: true,
    path: "/aml",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/AdminControls/StaticContent/StaticView")
    ),
  },
  {
    exact: true,
    path: "/legal",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/AdminControls/StaticContent/KycStaticView")
    ),
  },
  {
    exact: true,
    path: "/terms-conditions",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/T&C/Term")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Privacy/Privacy")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/request-message",
    component: lazy(() =>
      import("src/views/pages/RequestBlockMessage/RequestMessage")
    ),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/kyc",
    component: lazy(() => import("src/views/pages/KYC")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
