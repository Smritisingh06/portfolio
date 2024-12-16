// export const baseurl = "https://nodenft.fierex.com/"; /// live

export const baseurl = "https://node-metamart.mobiloitte.io/"; /// stage

// export const baseurl = "http://172.16.1.53:1965/"; // local
// export const baseurl = process.env.REACT_APP_BASE_URL;

let user = `${baseurl}api/v1/user`;
let collection = `${baseurl}api/v1/collection`;
let nft = `${baseurl}api/v1/nft`;
let order = `${baseurl}api/v1/order`;
let bid = `${baseurl}api/v1/bid`;
let activity = `${baseurl}api/v1/activity`;
let admin = `${baseurl}api/v1/admin`;
let staticlist = `${baseurl}api/v1/static`;
let brand = `${baseurl}api/v1/brand`;
let tracking = `${baseurl}api/v1/tracking`;
let physicalNft = `${baseurl}api/v1/physicalNft`;
const Apiconfigs = {
  connectWallet: `${user}/connectWallet`,
  profile: `${user}/profile`,
  updateProfile: `${user}/updateProfile`,
  // myCollectionList: `${collection}/myCollectionList`,
  // createCollection: `${collection}/createCollection`,
  // viewCollection: `${collection}/viewCollection/`,
  expiredNft: `${order}/expiredNft`,
  editCollection: `${collection}/editCollection`,
  userOwendCount: `${user}/userOwendCount/`,
  followUnfollow: `${user}/followUnfollow/`,
  userLikesCount: `${user}/userLikesCount/`,
  userOnSaleCount: `${user}/userOnSaleCount/`,
  userCreatedCount: `${user}/userCreatedCount/`,
  userFollowerCount: `${user}/userFollowerCount/`,
  userFollowingCount: `${user}/userFollowingCount/`,
  userBuyAndCreatedList: `${user}/userBuyAndCreatedList/`,
  nftSoldCount: `${user}/nftSoldCount/`,
  createCollectionReports: `${user}/createCollectionReports`,

  dashboardCount: `${user}/dashboardCount`,
  userSubscribe: `${user}/userSubscribe`,
  userVerifySubscription: `${user}/userVerifySubscription`,
  onSaleCount: `${user}/onSaleCount`,
  userFavourateCount: `${user}/userFavourateCount/`,
  createOrderReports: `${user}/createOrderReports`,
  sendOtpEmail: `${user}/sendOtpOnEmail`,
  verifyotpEmail: `${user}/verifyOTP`,

  //collection
  myCollectionList: `${collection}/myCollectionList`,
  createCollection: `${collection}/createCollection`,
  collectionList: `${collection}/collectionList`,
  viewCollection: `${collection}/viewCollection/`,
  getColData: `${collection}/getColData/`,

  // userlist
  userList: `${user}/userList`,
  userReports: `${user}/userReports`,
  getUserDetails: `${user}/getUserDetails/`,
  requestForUnblock: `${user}/requestForUnblock`,
  dashboardSearch: `${user}/dashboardSearch`,
  listUserToUserReport: `${user}/listUserToUserReport`,
  addKYC: `${user}/addKYC`,
  viewKycUser: `${user}/viewKyc`,
  editKYC: `${user}/editKYC`,

  // admin
  dashboard: `${admin}/dashboard`,
  listUser: `${admin}/listUser`,
  listTransaction: `${admin}/listTransaction`,
  soldNftList: `${admin}/soldNftList`,
  reportsList: `${admin}/reportsList`,
  viewReport: `${admin}/viewReport/`,
  blockReport: `${admin}/blockReport/`,
  kycApproveReject: `${admin}/kycApproveReject`,
  addSubAdmin: `${admin}/addSubAdmin`,
  editPermission: `${admin}/editPermission`,
  listSubAdmin: `${admin}/listSubAdmin`,
  blockUnblockUser: `${admin}/blockUnblockUser`,
  listCategory: `${admin}/listCategory`,
  activeDeactiveCategory: `${admin}/activeDeactiveCategory`,
  addCategory: `${admin}/addCategory`,
  deleteCategory: `${admin}/deleteCategory`,
  unblockRequestList: `${admin}/unblockRequestList`,
  changeCollectionFee: `${admin}/changeCollectionFee`,
  getCollectionFee: `${admin}/getCollectionFee`,
  editCategory: `${admin}/editCategory`,
  brandadminlist: `${admin}/brandRequestList`,
  activeBlockbrand: `${admin}/activeBlockBrand`,
  Approvebrand: `${admin}/acceptBrandRequest`,
  rejectbrand: `${admin}/rejectBrandRequest`,
  userSubscriberList: `${admin}/userSubscriberList`,
  listkyc: `${admin}/listkyc`,
  viewKyc: `${admin}/viewKyc`,
  approveRejectKyc: `${admin}/approveRejectKyc`,
  updateFee: `${admin}/updateFee`,
  getFee: `${admin}/getFee`,
  listSubAdmin: `${admin}/listSubAdmin`,

  // nft
  createNFT: `${nft}/createNFT`,
  uploadNFT: `${nft}/uploadNFT`,
  ipfsUpload: `${nft}/ipfsUpload`,
  addNft: `${nft}/addNft`,
  listNFT: `${nft}/listNFT`,
  viewNFT: `${nft}/viewNFT/`,
  showNftHistory: `${nft}/showNftHistory`,
  showActivity: `${nft}/showActivity`,
  uploadImage: `${nft}/uploadImage`,

  //nfttopseller

  topBuyers: `${user}/topBuyers`,
  topSellers: `${user}/topSalers`,
  contactUs: `${user}/contactUs`,

  //order
  likeDislikeOrder: `${order}/likeDislikeOrder/`,
  orderCollectionListByCategory: `${order}/orderCollectionListByCategory`,
  createOrder: `${order}/createOrder`,
  editOrder: `${order}/editOrder`,
  // viewOrder: `${order}/viewOrder/`,
  feedBack: `${order}/feedBack`,
  listfeedback: `${order}/listfeedback`,
  particularCollectionOrderList: `${order}/particularCollectionOrderList/`,
  favouriteUnFavouriteOrder: `${order}/favouriteUnFavouriteOrder/`,
  floorTradeCount: `${order}/floorTradeCount`,
  buyPhysicalNft: `${order}/buyPhysicalNft`,
  viewPhysicalOrder: `${order}/viewPhysicalOrder/`,
  //hotCollection
  hotCollections: `${user}/hotCollections`,
  addAddress: `${user}/addAddress`,
  listAddress: `${user}/listAddress`,

  //activity
  userListActivity: `${activity}/userListActivity`,
  //activity
  hotBid: `${bid}/hotBid`,
  createBid: `${bid}/createBid`,
  listBid: `${bid}/listBid`,

  //order

  allListOrder: `${order}/allListOrder`,
  viewOrder: `${order}/viewOrder/`,
  buyOrder: `${order}/buyOrder`,
  downloadPrivateurl: `${order}/downloadPrivateurl`,

  sendOrderToUser: `${order}/sendOrderToUser`,
  cancelOrder: `${order}/cancelOrder`,
  deleteOrder: `${order}/deleteOrder`,
  // staticlist
  faqList: `${staticlist}/faqList`,
  addFAQ: `${staticlist}/addFAQ`,
  viewFAQ: `${staticlist}/viewFAQ/`,
  deleteFAQ: `${staticlist}/deleteFAQ`,
  editFAQ: `${staticlist}/editFAQ/`,
  staticContentList: `${staticlist}/staticContentList`,
  viewStaticContent: `${staticlist}/viewStaticContent`,
  editStaticContent: `${staticlist}/editStaticContent`,
  addStaticContent: `${staticlist}/addStaticContent`,
  addPressMediaContent: `${staticlist}/addPressMediaContent`,
  pressMediaList: `${staticlist}/pressMediaList`,
  deletePressMedia: `${staticlist}/deletePressMedia`,
  viewPressMedia: `${staticlist}/viewPressMedia/`,
  editPressMedia: `${staticlist}/editPressMedia`,
  //Brand
  addBrand: `${brand}/addBrand`,
  brandListParticular: `${brand}/brandListParticular`,
  ViewBrandnft: `${brand}/viewBrand`,
  myAllBrandList: `${brand}/myAllBrandList`,
  getCollectionOnBrand: `${brand}/getCollectionOnBrand`,
  listAllApproveBrand: `${brand}/listAllApproveBrand`,
  getCollectionOnBrandMultiple: `${brand}/getCollectionOnBrandMultiple`,
  PhysicalbrandList: `${brand}/brandList`,
  brandCollectionList: `${brand}/brandCollectionList`,

  //PhysicalNFT
  createPhysicalNft: `${physicalNft}/createPhysicalNft`,
  createPhysicalOrder: `${physicalNft}/createPhysicalOrder`,
  cancelPhysicalOrder: `${physicalNft}/cancelPhysicalOrder`,
  updatePhysicalNft: `${physicalNft}/editPhysicalNft`,
  userOwnedPhyCount: `${physicalNft}/userOwnedCount/`, //
  userSoldPhyCount: `${physicalNft}/soldNFts/`, //
  userOnPhySaleCount: `${physicalNft}/userOnSaleCount/`,
  userCreatedPhyCount: `${physicalNft}/userCreatedCount/`,
  userBuyAndCreatedPhyList: `${physicalNft}/userBuyAndCreatedList/`,
  userFavouratePhyCount: `${physicalNft}/userFavourateCount/`,
  physicallistNFT: `${physicalNft}/listNFT`,
  favouriteUnFavourite: `${physicalNft}/favouriteUnFavourite/`,
  likeDislike: `${physicalNft}/likeDislike/`,
  viewPhysicalNFT: `${nft}/viewPhysicalNFT/`,
  createPhysicalNftupdated: `${physicalNft}/createPhysicalNftupdated/`,
  createOrderPhysicalNftUpdated: `${physicalNft}/createOrderPhysicalNftUpdated/`,
  buyPhysicalOrderUpdated: `${physicalNft}/buyPhysicalOrderUpdated`,
  updatePriceOrquantity: `${physicalNft}/updatePriceOrquantity`,
  // viewPhysicalNFT: `${physicalNft}/viewPhysicalNFT/`,
  // viewPhysicalNFT: `${physicalNft}/viewPhysicalNFT/`,
  editPhysicalOrderUpdated: `${physicalNft}/editPhysicalOrderUpdated`,
  createPhysicalOrderUpdated: `${physicalNft}/createPhysicalOrderUpdated`,
  nftsBrandList: `${physicalNft}/listNftOnBrand`,
  addtracking: `${tracking}/addTracking`,
  completeTracking: `${tracking}/completeTracking`,
  listTracking: `${tracking}/listTracking`,
  submitaddress: `${tracking}/editTrackingByCustomer`,
};

export default Apiconfigs;
