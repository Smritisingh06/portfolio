/* eslint-disable import/no-anonymous-default-export */
import {
  Box,
  Container,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Step1Kyc from "./Step1kyc";
import Step2kyc from "./Step2kyc";
import { Form, Formik } from "formik";
import * as yep from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/ApiConfig/ApiConfig";
import LinearProgress from "@material-ui/core/LinearProgress";
import Step3kyc from "./Step3kyc";
import { UserContext } from "src/context/User";
import StepSelfykyc from "./StepSelfykyc";
import StepProofOfRecidentkyc from "./StepProofOfRecidentkyc";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  KycMainContainer: {
    padding: "10px 40px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 20px",
    },
    "& .subHeadKyc": {
      padding: "20px 0px 5px",

      "& span": {
        color: "#9d9d9d",
        paddingLeft: "20px",
        fontWeight: "300",
      },
    },
    "& .componentCallBox": {
      padding: "30px 0px",
    },
  },
  MainKycBox: {
    padding: "50px 0px 100px 0px",
  },
}));
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#FFFFFF14",
  },
  bar: {
    borderRadius: 5,
    background:
      "hsl(230.54deg 95.03% 63.21%)",
  },
}))(LinearProgress);
export default function () {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [tabView, setTabView] = useState("step1");
  const [progressData, setProgressData] = useState("10");
  const [headingData, setHeadingData] = useState("Basic Information");
  const [documents, setDocuments] = React.useState("0");
  const [idNumber, setIdNumber] = React.useState("");
  const [profileImage3, setProfileImage3] = useState("");
  const [profileImage3Selfi, setProfileImage3Selfi] = useState("");
  const [profileImage3ProofofResidence, setProfileImage3ProofofResidence] =
    useState("");
  const [backImage, setBackImage] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [selfiImage, setSelfiImage] = useState("");
  const [ProofofResidence, setProofofResidence] = useState("");

  const [profileImage, setProfileImage] = useState("");
  // const [] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alldocument, setAlldocument] = useState({});
  const [profileImage643, setProfileImage643] = useState("");
  const [profileImage643Selfi, setProfileImage643Selfi] = useState("");
  const [profileImage643ProofOfRecident, setProfileImage643ProofOfRecident] =
    useState("");
  const [profileImage64, setProfileImage64] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [countrydata, setCountrydata] = useState({ name: "", id: "" });
  const [stateList, setStateList] = useState({ name: "", id: "" });
  const [mobileNumber, setFieldValue] = useState("");
  const [timeData, settimeData] = useState("1");
  const [oldKYCData, setOldKYCData] = useState();
  const [isCheaking, SetisCheaking] = useState(true);
  const [isResubmit, SetIsResubmit] = useState(false);
  const [isLoadingFont, setisLoadingFont] = useState(false);
  const [isLoadingSelfi, setisLoadingSelfi] = useState(false);
  const [isLoadingBack, setisLoadingBack] = useState(false);
  // const [isResubmit, SetIsResubmit] = useState(false);
  const [isUploadingImage, SetIsUploadingImage] = useState({
    back: false,
    front: false,
    Selfi: false,
    ProofofResidence: false,
  });

  const props = {
    setTabView,
    setProgressData,
    setHeadingData,
    settimeData,
  };

  const [formValue, setFormValue] = useState({
    firstname: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    city: "",
    fullAddress: "",
    state: "",
    dob: moment().subtract(18, "Year"),
    IBIName: "",
    IBIID: "",
    SourceofIncome: "",
    Occupation: "",
    ProofofResidence: "",
  });

  useEffect(() => {
    if (formValue.dob == undefined) {
      const temp = { ...formValue, ["dob"]: moment().subtract(18, "Year") };
      setFormValue(temp);
    }
  }, [formValue.dob]);
  useEffect(() => {
    const userData = user?.userData;
    if (user?.userData) {
      setFormValue({
        firstname: userData?.name ? userData?.name : "",
        lastName: "",
        email: userData?.email ? userData?.email : "",
        mobileNumber: "",
        gender: "",
        city: "",
        fullAddress: "",
        state: "",
        IBIName: "",
        IBIID: "",
        SourceofIncome: "",
        Occupation: "",
        ProofofResidence: "",
      });
    }
  }, [user?.userData]);

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };
  const handleFormSubmit = async () => {
    setIsSubmit(true);
    if (
      formValue.firstname != "" &&
      formValue.lastName != "" &&
      formValue.email != "" &&
      mobileNumber != "" &&
      formValue.gender != "" &&
      formValue.city != "" &&
      formValue.state != "" &&
      formValue.IBIName != "" &&
      formValue.IBIID != "" &&
      countrydata.name != "" &&
      formValue.SourceofIncome != "" &&
      countrydata.Occupation != "" &&
      formValue.fullAddress != ""
    )
      setTabView("step2");
    setProgressData("36");
    setHeadingData("Upload Documents");
    settimeData("2");
  };

  const NextPage = () => {
    let docCheck = false;
    if (tabView === "step2") {
      if (documents === "passport" && profileImage === "") {
        if (
          documents != "0" &&
          profileImage3 != "" &&
          idNumber != "" &&
          !isLoadingBack &&
          !isLoadingFont
        ) {
          setTabView("step3");
          setProgressData("55");
          setHeadingData("Upload your selfie");
          settimeData("3");
        }
      } else {
        if (
          documents != "0" &&
          profileImage != "" &&
          profileImage3 != "" &&
          idNumber != "" &&
          !isLoadingBack &&
          !isLoadingFont
        ) {
          setTabView("step3");
          setProgressData("55");
          setHeadingData("Upload your selfie");
          settimeData("3");
        }
      }
    } else if (tabView === "step3") {
      if (
        documents != "0" &&
        profileImage3 != "" &&
        // profileImage != "" &&
        idNumber != "" &&
        !isLoadingBack &&
        !isLoadingFont
      ) {
        setTabView("step4");
        setProgressData("76");
        setHeadingData("Details Confirmation");
        settimeData("4");
      }
    } else if (tabView === "step4") {
      if (
        documents != "0" &&
        profileImage3 != "" &&
        // profileImage != "" &&
        idNumber != "" &&
        !isLoadingBack &&
        !isLoadingFont
      ) {
        setTabView("step5");
        setProgressData("100");
        setHeadingData("Details Confirmation");
        settimeData("5");
      }
    } else {
      if (
        documents != "0" &&
        profileImage3 != "" &&
        selfiImage != "" &&
        idNumber != "" &&
        !isLoadingBack &&
        !isLoadingFont
      ) {
        setTabView("step5");
        setProgressData("100");
        setHeadingData("Details Confirmation");
        settimeData("5");
      }
    }
  };
  // };

  const handleChangeStatus2 = async () => {
    try {
      const formDataImages = new FormData();
      formDataImages.append("file", profileImage3);
      // SetIsUploadingImage({ ...isUploadingImage, front: true });
      setisLoadingFont(false);

      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadImage,
        data: formDataImages,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (response.data.statusCode === 200) {
        setFrontImage(response.data.result);
        // SetIsUploadingImage({ ...isUploadingImage, front: false });
        setisLoadingFont(false);
      } else {
      }
    } catch (error) {
      console.log(error);
      // SetIsUploadingImage({ ...isUploadingImage, front: false });
      setisLoadingFont(false);
    }
  };
  const handleChangeProofofResidence = async () => {
    try {
      const formDataImages = new FormData();
      formDataImages.append("file", profileImage3ProofofResidence);
      SetIsUploadingImage({ ...isUploadingImage, ProofofResidence: true });

      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadImage,
        data: formDataImages,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (response.data.statusCode === 200) {
        setProofofResidence(response.data.result);
        SetIsUploadingImage({ ...isUploadingImage, ProofofResidence: false });
      } else {
      }
    } catch (error) {
      console.log(error);
      SetIsUploadingImage({ ...isUploadingImage, ProofofResidence: false });
    }
  };
  const handleChangeStatusSelfi = async () => {
    try {
      const formDataImages = new FormData();
      formDataImages.append("file", profileImage3Selfi);
      // SetIsUploadingImage({ ...isUploadingImage, Selfi: true });
      setisLoadingSelfi(true);

      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadImage,
        data: formDataImages,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (response.data.statusCode === 200) {
        setSelfiImage(response.data.result);
        // SetIsUploadingImage({ ...isUploadingImage, Selfi: false });
        setisLoadingSelfi(false);
      } else {
      }
    } catch (error) {
      console.log(error);
      // SetIsUploadingImage({ ...isUploadingImage, Selfi: false });
      setisLoadingSelfi(false);
    }
  };
  useEffect(() => {
    if (profileImage3) {
      handleChangeStatus2();
    }
  }, [profileImage3]);
  useEffect(() => {
    if (profileImage3Selfi) {
      handleChangeStatusSelfi();
    }
  }, [profileImage3Selfi]);
  useEffect(() => {
    if (profileImage3ProofofResidence) {
      handleChangeProofofResidence();
    }
  }, [profileImage3ProofofResidence]);
  const handleChangeStatus = async (file) => {
    try {
      const formDataImages = new FormData();
      formDataImages.append("file", profileImage);
      // SetIsUploadingImage({ ...isUploadingImage, back: true });
      setisLoadingBack(true);

      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadImage,
        data: formDataImages,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (response.data.statusCode === 200) {
        setBackImage(response.data.result);
        // SetIsUploadingImage({ ...isUploadingImage, back: false });
        setisLoadingBack(false);
      } else {
      }
    } catch (error) {
      console.log(error);
      // SetIsUploadingImage({ ...isUploadingImage, back: false });
      setisLoadingBack(false);
    }
  };
  useEffect(() => {
    if (profileImage) {
      handleChangeStatus();
    }
  }, [profileImage]);

  const Handlerupdate = async () => {
    setLoading(true);
    try {
      const url =
        user.userData.approveStatus === "REJECTED" ||
        user.userData.approveStatus === "REJECT"
          ? ApiConfig.editKYC
          : ApiConfig.addKYC;
      const res = await axios({
        method: "POST",
        url: url,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          firstName: formValue.firstname,
          lastName: formValue.lastName,
          email: formValue.email,
          mobileNumber: mobileNumber,
          country: countrydata.name,
          gender: formValue.gender,
          state: formValue.state,
          DOB: new Date(formValue.dob).toISOString().split("T")[0],
          IBIName: formValue.IBIName,
          IBIID: formValue.IBIID,
          selfi: selfiImage,
          city: formValue.city,
          fullAddress: formValue.fullAddress,
          SourceofIncome: formValue.SourceofIncome,
          Occupation: formValue.Occupation,
          ProofofResidence: ProofofResidence,
          [documents]: {
            idNumber: idNumber,
            documentName: documents,
            backImage: documents !== "passport" ? backImage : undefined,
            frontImage: frontImage,
          },
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Confirm your KYC Documents!");
        user.getProfileHandler(sessionStorage.getItem("token"));
        setLoading(false);
        SetIsResubmit(false);
      } else {
        setLoading(false);
        SetIsResubmit(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const viewKyc = async () => {
    SetisCheaking(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.viewKycUser,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOldKYCData(res.data.result);
        SetisCheaking(false);
      }
    } catch (error) {
      console.log(error);
      SetisCheaking(false);
    }
  };

  useEffect(() => {
    if (user.userData && user.userData.approveStatus) {
      viewKyc();
    } else {
      setOldKYCData();
      SetisCheaking(false);
      SetIsResubmit(false);
    }
  }, [user.userData]);

  const reSubmit = () => {
    SetIsResubmit(true);
  };

  return (
    <Box className={classes.MainKycBox}>
      <Container>
        <Paper elevation={2} className={classes.KycMainContainer}>
          <Typography variant="h1" color="primary">
            KYC
          </Typography>
          {!oldKYCData && (
            <>
              <Box className="subHeadKyc">
                <Typography variant="h5" color="primary">
                  {headingData}
                  <span>{timeData} of 4</span>
                </Typography>
              </Box>
              <BorderLinearProgress
                variant="determinate"
                value={progressData}
              />
            </>
          )}

          <Box mt={1}>
            {oldKYCData ? (
              oldKYCData.approveStatus === "PENDING" ? (
                <Typography variant="h6" style={{ color: "#868586" }}>
                  Your KYC request is{" "}
                  <span style={{ color: "#beba0f" }}>under review!</span>
                </Typography>
              ) : user.userData.approveStatus === "REJECTED" ||
                user.userData.approveStatus === "REJECT" ? (
                <Typography
                  variant="h6"
                  style={{
                    color: "#868586",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  Your KYC request has been{" "}
                  <span
                    style={{
                      color: "red",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    rejected
                  </span>
                  , Reason : {oldKYCData.reason}
                </Typography>
              ) : (
                <Typography variant="h6" style={{ color: "#868586" }}>
                  Your KYC request has been{" "}
                  <span style={{ color: "green" }}>Approved!</span>
                  {/* {oldKYCData.reason} */}
                </Typography>
              )
            ) : (
              <>
                {tabView === "step3" ? (
                  <>
                    "Confirm your details, if they are the same as they appear
                    on your identification document."
                  </>
                ) : (
                  <>
                    {tabView === "step4" ? (
                      <>
                        "Please upload your selfie with holding the "Passport"
                        you uploaded in the previous step."
                      </>
                    ) : (
                      <>
                        "Enter your details as they appear on your
                        identification document."
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {oldKYCData &&
              (user.userData.approveStatus === "REJECTED" ||
                user.userData.approveStatus === "REJECT") &&
              !isResubmit && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={reSubmit}
                  >
                    Re Submit
                  </Button>
                </Box>
              )}
          </Box>

          {oldKYCData && !isResubmit ? (
            <Box className="componentCallBox">
              <Step3kyc
                {...props}
                Handlerupdate={Handlerupdate}
                formValue={formValue}
                mobileNumber={mobileNumber}
                stateList={stateList}
                countrydata={countrydata}
                loading={loading}
                profileImage643={profileImage643}
                profileImage64={profileImage64}
                oldKYCData={oldKYCData}
              />
            </Box>
          ) : (
            <>
              {!isCheaking &&
                user.userData &&
                (!user.userData.approveStatus ||
                  user.userData.approveStatus === "REJECTED") && (
                  <>
                    <Box className="componentCallBox">
                      {tabView === "step1" ? (
                        <Step1Kyc
                          {...props}
                          handleFormSubmit={handleFormSubmit}
                          _onInputChange={_onInputChange}
                          formValue={formValue}
                          setFormValue={setFormValue}
                          isSubmit={isSubmit}
                          // setGender={setGender}
                          // gender={gender}
                          setCountrydata={setCountrydata}
                          countrydata={countrydata}
                          setStateList={setStateList}
                          setFieldValue={setFieldValue}
                          mobileNumber={mobileNumber}
                        />
                      ) : (
                        ""
                      )}
                      {tabView === "step2" ? (
                        <Step2kyc
                          {...props}
                          setAlldocument={setAlldocument}
                          NextPage={NextPage}
                          documents={documents}
                          setDocuments={setDocuments}
                          profileImage3={profileImage3}
                          setProfileImage3={setProfileImage3}
                          profileImage={profileImage}
                          setProfileImage={setProfileImage}
                          setProfileImage643={setProfileImage643}
                          profileImage643={profileImage643}
                          setProfileImage64={setProfileImage64}
                          profileImage64={profileImage64}
                          setIdNumber={setIdNumber}
                          idNumber={idNumber}
                          // isUploadingImage={isUploadingImage}
                          isLoadingFont={isLoadingFont}
                          isLoadingSelfi={isLoadingSelfi}
                          isLoadingBack={isLoadingBack}
                        />
                      ) : (
                        ""
                      )}
                      {tabView === "step3" ? (
                        <StepSelfykyc
                          {...props}
                          setAlldocument={setAlldocument}
                          NextPage={NextPage}
                          documents={documents}
                          setDocuments={setDocuments}
                          profileImage3={profileImage3}
                          setProfileImage3Selfi={setProfileImage3Selfi}
                          profileImage={profileImage}
                          setProfileImage={setProfileImage}
                          setProfileImage643Selfi={(e) =>
                            setProfileImage643Selfi(e)
                          }
                          // setProfileImage643Selfi={setProfileImage3Selfi}
                          profileImage643Selfi={profileImage643Selfi}
                          setProfileImage64={setProfileImage64}
                          profileImage64={profileImage64}
                          setIdNumber={setIdNumber}
                          idNumber={idNumber}
                          isUploadingImage={isUploadingImage}
                        />
                      ) : (
                        ""
                      )}
                      {tabView === "step4" ? (
                        <StepProofOfRecidentkyc
                          {...props}
                          setAlldocument={setAlldocument}
                          NextPage={NextPage}
                          documents={documents}
                          setDocuments={setDocuments}
                          profileImage3ProofofResidence={
                            profileImage3ProofofResidence
                          }
                          setProfileImage3ProofofResidence={
                            setProfileImage3ProofofResidence
                          }
                          profileImage={profileImage}
                          setProfileImage={setProfileImage}
                          setProfileImage643ProofOfRecident={(e) =>
                            setProfileImage643ProofOfRecident(e)
                          }
                          profileImage643ProofOfRecident={
                            profileImage643ProofOfRecident
                          }
                          setProfileImage64={setProfileImage64}
                          profileImage64={profileImage64}
                          setIdNumber={setIdNumber}
                          idNumber={idNumber}
                          isUploadingImage={isUploadingImage}
                          ProofofResidence={ProofofResidence}
                        />
                      ) : (
                        ""
                      )}
                      {tabView === "step5" ? (
                        <Step3kyc
                          {...props}
                          Handlerupdate={Handlerupdate}
                          formValue={formValue}
                          mobileNumber={mobileNumber}
                          stateList={stateList}
                          countrydata={countrydata}
                          loading={loading}
                          profileImage643={profileImage643}
                          profileImage643Selfi={profileImage643Selfi}
                          profileImage64={profileImage64}
                          documents={documents}
                          idNumber={idNumber}
                          selfiImage={selfiImage}
                          ProofofResidence={ProofofResidence}
                        />
                      ) : (
                        ""
                      )}
                    </Box>
                  </>
                )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
