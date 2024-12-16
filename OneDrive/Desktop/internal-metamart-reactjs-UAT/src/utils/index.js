import { ACTIVE_NETWORK, NetworkDetails, RPC_URL } from "src/constants";
import { Contract } from "@ethersproject/contracts";
import Web3 from "web3";
import { toast } from "react-toastify";

// export function sortAddress(add) {
//   const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
//   return sortAdd;
// }
export function sortAddress(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
    return sortAdd;
  } else return add;
}
// export function sortAddressamount(add) {
//   if (add) {
//     const sortAdd = `${add?.slice(0, 6)}`;
//     return sortAdd;
//   } else return add;
// }
export const deadAddress = "0x0000000000000000000000000000000000000000";

export function firstAddress(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 6)}...`;
    return sortAdd;
  } else return add;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
function validatePassportNumber(passportNumber) {
  const passportRegex = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;
  return passportRegex.test(passportNumber);
}
function validateDrivingLicenseNumber(drivingLicenseNumber) {
  const drivingLicenseRegex = /^[A-Z]{1}[0-9]{8}$/;
  return drivingLicenseRegex.test(drivingLicenseNumber);
}
function validatePANNumber(panNumber) {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(panNumber);
}

export function validUrl(value) {
  const re =
    /((http|https):\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return re.test(value);
}
export function validinsta(value) {
  const re =
    /((http|https):\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return re.test(value);
}
export function validtwitter(value) {
  const re =
    /((http|https):\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return re.test(value);
}
export function validtelegram(value) {
  const re =
    /((http|https):\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return re.test(value);
}
export function validemailUrl(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}
export function isValidFacebookURL(value) {
  const re =
    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
  return re.test(value);
}
export function isValidInstaURL(value) {
  const re =
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)/;
  return re.test(value);
}
export const getWeb3Provider = async () => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  return httpProvider;
};

export const getWeb3Obj = async () => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = await new Web3(httpProvider);
  return web3;
};

export const getWeb3ContractObject = async (abi, contractAddress) => {
  const web3 = await getWeb3Obj();
  const contract = await new web3.eth.Contract(abi, contractAddress);
  return contract;
};

export const getBalanceOf = async (abi, address, account) => {
  try {
    const contract = await getWeb3ContractObject(abi, address);
    const balanceOf = await contract.methods.balanceOf(account).call();
    return balanceOf.toString();
  } catch (error) {
    console.log("ERROR", error);

    return 0;
  }
};

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};

export function copyTextByID(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  toast.info(`Copied ${copyText.value}`);
}

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};
export function changeExtenstion(str) {
  const checkFormat1 = str.includes(".png");
  const checkFormat2 = str.includes(".jpg");
  const checkFormat3 = str.includes(".jpeg");
  const checkFormat4 = str.includes(".webp");
  const checkFormat5 = str.includes(".gif");
  const checkFormat6 = str.includes(".mp4");
  const checkFormat7 = str.includes(".svg");

  const checkFormat8 = str.includes(".avif");

  if (checkFormat8) {
    return str.replace(".avif", ".avif");
  }
  if (checkFormat1) {
    return str.replace(".png", ".webp");
  }
  if (checkFormat2) {
    return str.replace(".jpg", ".webp");
  }
  if (checkFormat3) {
    return str.replace(".jpeg", ".webp");
  }
  if (checkFormat4) {
    return str;
  }
  if (checkFormat5) {
    return str;
  }
  if (checkFormat6) {
    return str.replace(".mp4", ".webp");
  }
  if (checkFormat7) {
    return str;
  }
}
export function numberCompactFormat(value) {
  if (value < 1) {
    return value.toFixed(4);
  }
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
