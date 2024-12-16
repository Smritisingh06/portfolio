import { Box, Container, Link, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    "& a": {
      color: "#686868",
    },
    "& p": {
      color: "#686868",
      marginBottom: "10px",
    },
    "& h5": {
      marginBottom: "10px",
      marginTop: "20px",
    },
    "& li": {
      color: "#686868",
      marginBottom: "10px",
      fontSize: "14px",
    },
  },
  heading: {
    textAlign: "start",

    "& h1": {
      // color: "#000",
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  details: {
    "& h4": {
      fontSize: "15px",
      lineHeight: "25px",
    },
  },
  colorbox: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    padding: "10px",
    background:
      " linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    // backdropFilter: "blur(42px)",
  },
}));
const Privacy = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Paper elevation={2}>
          <Box className={classes.heading}>
            <Typography variant="h2" color="primary">
              Privacy Policy
            </Typography>
            {/* <h1>Privacy Policy of nft.fierex.com</h1> */}

            <h2>Owner and Data Controller</h2>
            <p>
              <strong>Mobiloitte - AI & Blockchain-Led Digital Transformation</strong>
              {/* <br />
              Ul. Bartycka 22B/21A
              <br />
              Warsaw, Mazowieckie, Poland
              <br />
              Postal Code: 00-716
              <br /> */}
              <br />
              <br />
              Owner contact email:{" "}
              <Link href="mailto:NFT@metamart.com">abc@example.com</Link>
            </p>
          </Box>

          <h2>Types of Data collected</h2>
          <p>
            Among the types of Personal Data that nft.metamart.com collects, by
            itself or through third parties, there are:
          </p>
          <p>
            Complete details on each type of Personal Data collected are
            provided in the dedicated sections of this privacy policy or by
            specific explanation texts displayed prior to the Data collection.
          </p>
          <p>
            Personal Data may be freely provided by the User, or, in case of
            Usage Data, collected automatically when using nft.metamart.com.
            Unless specified otherwise, all Data requested by nft.metamart.com is
            mandatory and failure to provide this Data may make it impossible
            for nft.metamart.com to provide its services. In cases where
            nft.metamart.com specifically states that some Data is not mandatory,
            Users are free not to communicate this Data without consequences to
            the availability or the functioning of the Service. Users who are
            uncertain about which Personal Data is mandatory are welcome to
            contact the Owner.
          </p>
          <p>
            Any use of Cookies – or of other tracking tools — by nft.metamart.com
            or by the owners of third-party services used by nft.metamart.com
            serves the purpose of providing the Service required by the User, in
            addition to any other purposes described in the present document.
          </p>
          <p>
            Users are responsible for any third-party Personal Data obtained,
            published, or shared through nft.metamart.com.
          </p>
          <ul>
            {/* <li>First name</li>
        <li>Last name</li>
        <li>Email address</li>
        <li>Trackers</li>
        <li>Usage Data</li>
        <li>Device information</li>
        <li>Session statistics</li>
        <li>Browser information</li>
        <li>Device logs</li>
        <li>Country</li>
        <li>Geographic position</li>
        <li>Company name</li>
        <li>Website</li>
        <li>Password</li>
        <li>Username</li>
        <li>Picture</li>
        <li>City</li>
        <li>Phone number</li>
        <li>Answers to questions</li>
        <li>Clicks</li>
        <li>Keypress events</li>
        <li>Motion sensor events</li>
        <li>Mouse movements</li>
        <li>Scroll position</li>
        <li>Touch events</li>
        <li>Payment info</li>
        <li>Purchase history</li>
        <li>User content</li>
        <li>Various types of Data</li>
        <li>Data communicated in order to use the Service</li>
        <li>Profile picture</li> */}
          </ul>

          <h2>Mode and place of processing the Data</h2>
          <p>
            The Owner takes appropriate security measures to prevent
            unauthorized access, disclosure, modification, or unauthorized
            destruction of the Data. The Data processing is carried out using
            computers and/or IT enabled tools, following organizational
            procedures and modes strictly related to the purposes indicated. In
            addition to the Owner, in some cases, the Data may be accessible to
            certain types of persons in charge, involved with the operation of
            nft.metamart.com (administration, sales, marketing, legal, system
            administration) or external parties (such as third-party technical
            service providers, mail carriers, hosting providers, IT companies,
            communications agencies) appointed, if necessary, as Data Processors
            by the Owner. The updated list of these parties may be requested
            from the Owner at any time.
          </p>

          <p>
            Place: The Data is processed at the Owner's operating offices and in
            any other places where the parties involved in the processing are
            located. Depending on the User's location, data transfers may
            involve transferring the User's Data to a country other than their
            own. To find out more about the place of processing of such
            transferred Data, Users can check the section containing details
            about the processing of Personal Data.
          </p>

          <h2>Retention time</h2>
          <p>
            Unless specified otherwise in this document, Personal Data shall be
            processed and stored for as long as required by the purpose they
            have been collected for and may be retained for longer due to
            applicable legal obligation or based on the Users’ consent.
          </p>

          <h2>The purposes of processing</h2>
          <p>
            The Data concerning the User is collected to allow the Owner to
            provide its Service, comply with its legal obligations, respond to
            enforcement requests, protect its rights and interests (or those of
            its Users or third parties), detect any malicious or fraudulent
            activity, as well as the following: Contacting the User, Analytics,
            Displaying content from external platforms, Beta Testing, Collection
            of privacy-related preferences, Hosting and backend infrastructure,
            Infrastructure monitoring, Interaction with live chat platforms,
            Platform services and hosting, Registration and authentication
            provided directly by nft.metamart.com, Social features, SPAM
            protection, Tag Management, Traffic optimization and distribution,
            User database management, and Handling payments.
          </p>

          <h2>Detailed information on the processing of Personal Data</h2>
          <p>
            Personal Data is collected for the following purposes and using the
            following services:
          </p>
          <ul>
            <li>Analytics</li>
            <li>Beta Testing</li>
            <li>Collection of privacy-related preferences</li>
            <li>Contacting the User</li>
            <li>Displaying content from external platforms</li>
            <li>Handling payments</li>
            <li>Hosting and backend infrastructure</li>
            <li>Infrastructure monitoring</li>
            <li>Interaction with live chat platforms</li>
            <li>Platform services and hosting</li>
            <li>
              Registration and authentication provided directly by
              nft.metamart.com
            </li>
            <li>Social features</li>
            <li>SPAM protection</li>
            <li>Tag Management</li>
            <li>Traffic optimization and distribution</li>
            <li>User database management</li>
          </ul>

          <p>
            <strong>
              Cookie Policy: nft.metamart.com uses Trackers. To learn more, Users
              may consult the
              {/* <Link href="/cookie-policy"> */}
              Cookie Policy
              {/* </Link>. */}
            </strong>
          </p>

          <h2>Further Information for Users in the European Union</h2>
          <p>
            This section applies to all Users in the European Union, according
            to the General Data Protection Regulation (the “GDPR”), and, for
            such Users, supersedes any other possibly divergent or conflicting
            information contained in the privacy policy. Further details
            regarding the categories of Data processed, the purposes of
            processing, the categories of recipients of the Personal Data, if
            any, and further information about Personal Data can be found in the
            section titled “Detailed information on the processing of Personal
            Data” within this document.
          </p>

          <h3>Legal basis of processing</h3>
          <p>
            The Owner may process Personal Data relating to Users if one of the
            following applies:
          </p>
          <ul>
            <li>
              Users have given their consent for one or more specific purposes.
            </li>
            <li>
              Provision of Data is necessary for the performance of an agreement
              with the User and/or for any pre-contractual obligations thereof.
            </li>
            <li>
              Processing is necessary for compliance with a legal obligation to
              which the Owner is subject.
            </li>
            <li>
              Processing is related to a task that is carried out in the public
              interest or in the exercise of official authority vested in the
              Owner.
            </li>
            <li>
              Processing is necessary for the purposes of the legitimate
              interests pursued by the Owner or by a third party.
            </li>
          </ul>

          <p>
            In any case, the Owner will gladly help to clarify the specific
            legal basis that applies to the processing, and in particular
            whether the provision of Personal Data is a statutory or contractual
            requirement, or a requirement necessary to enter into a contract.
          </p>

          <h3>Further information about retention time</h3>
          <p>
            Unless specified otherwise in this document, Personal Data shall be
            processed and stored for as long as required by the purpose they
            have been collected for and may be retained for longer due to
            applicable legal obligation or based on the Users’ consent.
          </p>

          <p>Therefore:</p>
          <ul>
            <li>
              Personal Data collected for purposes related to the performance of
              a contract between the Owner and the User shall be retained until
              such contract has been fully performed.
            </li>
            <li>
              Personal Data collected for the purposes of the Owner’s legitimate
              interests shall be retained as long as needed to fulfill such
              purposes. Users may find specific information regarding the
              legitimate interests pursued by the Owner within the relevant
              sections of this document or by contacting the Owner.
            </li>
            <li>
              The Owner may be allowed to retain Personal Data for a longer
              period whenever the User has given consent to such processing, if
              such consent is not withdrawn. Furthermore, the Owner may be
              obliged to retain Personal Data for a longer period whenever
              required to fulfill a legal obligation or upon order of an
              authority.
            </li>
            <li>
              Once the retention period expires, Personal Data shall be deleted.
              Therefore, the right of access, the right to erasure, the right to
              rectification, and the right to data portability cannot be
              enforced after expiration of the retention period.
            </li>
          </ul>

          <h3>
            The rights of Users based on the General Data Protection Regulation
            (GDPR)
          </h3>
          <p>
            Users may exercise certain rights regarding their Data processed by
            the Owner. Users have the right to do the following, to the extent
            permitted by law:
          </p>
          <ul>
            <li>
              Withdraw their consent at any time. Users have the right to
              withdraw consent where they have previously given their consent to
              the processing of their Personal Data.
            </li>
            <li>
              Object to processing of their Data. Users have the right to object
              to the processing of their Data if the processing is carried out
              on a legal basis other than consent.
            </li>
            <li>
              Access their Data. Users have the right to learn if Data is being
              processed by the Owner, obtain disclosure regarding certain
              aspects of the processing and obtain a copy of the Data undergoing
              processing.
            </li>
            <li>
              Verify and seek rectification. Users have the right to verify the
              accuracy of their Data and ask for it to be updated or corrected.
            </li>
            <li>
              Restrict the processing of their Data. Users have the right to
              restrict the processing of their Data. In this case, the Owner
              will not process their Data for any purpose other than storing it.
            </li>
            <li>
              Have their Personal Data deleted or otherwise removed. Users have
              the right to obtain the erasure of their Data from the Owner.
            </li>
            <li>
              Receive their Data and have it transferred to another controller.
              Users have the right to receive their Data in a structured,
              commonly used and machine-readable format and, if technically
              feasible, to have it transmitted to another controller without any
              hindrance.
            </li>
            <li>
              Lodge a complaint. Users have the right to bring a claim before
              their competent data protection authority.
            </li>
          </ul>

          <p>
            Users are also entitled to learn about the legal basis for Data
            transfers abroad, including to any international organization
            governed by public international law or set up by two or more
            countries, such as the UN, and about the security measures taken by
            the Owner to safeguard their Data.
          </p>

          <h3>Details about the right to object to processing</h3>
          <p>
            Where Personal Data is processed for a public interest, in the
            exercise of an official authority vested in the Owner, or for the
            purposes of the legitimate interests pursued by the Owner, Users may
            object to such processing by providing a ground related to their
            particular situation to justify the objection. Users must know that,
            however, should their Personal Data be processed for direct
            marketing purposes, they can object to that processing at any time,
            free of charge and without providing any justification. Where the
            User objects to processing for direct marketing purposes, Personal
            Data will no longer be processed for such purposes. To learn whether
            the Owner is processing Personal Data for direct marketing purposes,
            Users may refer to the relevant sections of this document.
          </p>

          <h3>How to exercise these rights</h3>
          <p>
            Any requests to exercise User rights can be directed to the Owner
            through the contact details provided in this document. Such requests
            are free of charge and will be answered by the Owner as early as
            possible and always within one month, providing Users with the
            information required by law. Any rectification or erasure of
            Personal Data or restriction of processing will be communicated by
            the Owner to each recipient, if any, to whom the Personal Data has
            been disclosed unless this proves impossible or involves
            disproportionate effort. At the Users’ request, the Owner will
            inform them about those recipients.
          </p>
        </Paper>
      </Container>
    </Box>
  );
};

export default Privacy;
