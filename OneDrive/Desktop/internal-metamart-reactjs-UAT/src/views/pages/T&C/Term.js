import { Box, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
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
    },
  },
  details: {
    "& h4": {
      fontSize: "15px",
      lineHeight: "25px",
    },
  },
}));
const Privacy = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Paper elevation={2}>
          <Box className={classes.heading}>
            {/* <Typography variant="h2" color="primary">
              Terms of Use
            </Typography> */}
          </Box>
          <Box className={classes.details} mt={2}>
            <h2>TERMS AND CONDITIONS</h2>
            <p>
              <strong>Version 1</strong>
            </p>
            <p>
              <strong>Date: 27th October 2023</strong>
            </p>

            <h2>1. Acceptance of NFT Terms; Modification of NFT Terms</h2>
            <p>
              Marketplace is an NFT Marketplace operated and owned by
              Mobiloitte ("Company," "we," "us," or
              "our"). These Terms and Conditions ("NFT Terms") constitute a
              legally binding agreement between the Company and each registered
              or unregistered end user (each, a "User," "you," or "your") of the
              Fieres Marketplace located at nft.metamart.com or other such URL as
              may be designated by Company from time to time, as well as any
              mobile apps or other related services or applications to that
              (collectively, the "NFT Marketplace"). The Marketplace is a part
              of the "MetaMart Services" as defined in the MetaMart Terms of Use
              ("MetaMart Terms") set forth here. The MetaMart Terms are incorporated
              into these NFT Terms and govern your use and access to the NFT
              Marketplace. In the event of a conflict between the NFT Terms and
              the MetaMart Terms, the NFT Terms will prevail. The NFT terms should
              be carefully reviewed. By accessing and using the NFT Marketplace
              (including by purchasing or bidding on any items herein), you are
              deemed to have read, accepted, executed, and agreed to the herein
              rules (including the MetaMart Terms incorporated by reference
              herein). The Company may change or amend the NFT Marketplace or
              these NFT Terms at any time at our sole and absolute discretion.
              Any changes to these NFT Terms will be in effect as of the "Last
              Revised" date at the top of this page. You acknowledge and agree
              that the form and nature of the NFT Marketplace, and any part of
              it, may be changed with time without prior notice to you. IF ANY
              PROVISION OF THESE NFT TERMS, THE MetaMart TERMS, OR ANY FUTURE
              CHANGES ARE UNACCEPTABLE TO YOU, PLEASE RECONSIDER REGISTERING OR
              USING THE NFT MARKETPLACE. YOUR CONTINUED USE OF THE NFT
              MARKETPLACE FOLLOWING THE POSTING OF ANY NOTICE OF ANY CHANGE TO
              THESE TERMS OF SERVICE SHALL CONSTITUTE YOUR ACCEPTANCE AND
              AGREEMENT TO SUCH CHANGE.
            </p>

            <p>
              <strong>
                ARBITRATION NOTICE: THE MetaMart TERMS CONTAIN AN ARBITRATION
                CLAUSE. EXCEPT FOR CERTAIN TYPES OF DISPUTES MENTIONED IN THAT
                ARBITRATION CLAUSE AND GOVERNING LAW CLAUSE, YOU AND THE COMPANY
                AGREE THAT DISPUTES BETWEEN THE COMPANY AND THE USER WILL BE
                RESOLVED BY MANDATORY BINDING ARBITRATION UNDER THE ARBITRATION
                CLAUSE AND GOVERNING LAW CLAUSE IN THE MetaMart TERMS. YOU AND THE
                COMPANY WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS-ACTION LAWSUIT
                OR CLASS-WIDE ARBITRATION.
              </strong>
            </p>

            <h2>2. Overview of the NFT Marketplace</h2>
            <p>
              The NFT Marketplace provides you with the opportunity to create
              (or mint), sell, purchase, bid on, collect, trade, showcase, and
              otherwise transact digital blockchain collectibles, which may be
              represented as a non-fungible token (NFT) linked with certain
              digital media and art ("NFT Media"). WE FACILITATE TRANSACTIONS
              BETWEEN BUYER AND SELLER OF AN NFT, BUT WE ARE NOT A PARTY TO ANY
              AGREEMENT BETWEEN BUYER AND SELLER OF AN NFT ON THE NFT
              MARKETPLACE. We collect revenue on the NFT Marketplace via
              transaction fees and other applicable fees, which we display when
              you interact with the NFT Marketplace. To avoid doubt, NFTs
              transacted on the NFT Marketplace are considered "Digital Assets"
              as defined in the MetaMart Terms. The Company reserves the right to
              (but is not required or obligated to) take any action to any
              disputes arising from purchases via the NFT Marketplace, including
              in connection with any auctions or other purchase methods.
            </p>

            <p>
              <strong>For NFT Sellers:</strong>By minting, providing, or selling
              an NFT through the NFT Marketplace, you hereby agree and warrant
              that you own all legal rights, title, and interest in all
              intellectual property rights to the NFT Media linked or associated
              with such NFT, or you are legally authorised by the intellectual
              property owner to mint, provide or sell the NFT on the NFT
              Marketplace. Except for NFTs minted on the NFT Marketplace, to
              list any NFT for sale on the NFT Marketplace, you must first
              deposit the NFT for sale for custody with MetaMart exchange (not the
              Company) until the NFT is sold or you decide to remove the NFT
              from the NFT Marketplace. For clarity, Company has no obligation
              or liability to you for keeping, storing, or helping you recover
              any NFT Media associated with your NFTs.
              <strong>For NFT Buyers:</strong> When you purchase an NFT, you own
              the NFT related to certain NFT Media, but you do not own any
              intellectual property rights in such NFT Media except for the
              license grants expressly set forth herein. In certain cases, we
              may help to evaluate or provide you with information about a
              seller of an NFT. However, such information is provided for
              informational purposes only. You are responsible for verifying the
              authenticity, legitimacy, and identity of any NFT you purchase on
              the NFT Marketplace. We make no representations, guarantees, or
              promises about the identity, legitimacy, legality, decency,
              quality, or authenticity of any NFT on the NFT Marketplace.
              Notwithstanding any sale clearing period that may be implemented
              for the sale of any NFTs, you acknowledge that Company is not
              required or obligated to adjudicate or decide on any disputes in
              connection with any NFTs sold on the NFT Marketplace.
            </p>

            <h2>3. License to Your Content</h2>
            <p>
              In connection with your use of the NFT Marketplace, you may be
              able to post, upload, or submit content to be made available
              through the NFT Marketplace, including NFT Media that is tied to
              NFTs you wish to sell on the NFT Marketplace as a seller, and any
              other content associated with your NFTs (Your Content). You retain
              all rights to Your Content you post, upload, submit, or otherwise
              make available through the NFT Marketplace, except for rights
              expressly granted herein. To operate the NFT Marketplace, we must
              obtain from you certain license rights in Your Content so that the
              actions we take in operating the NFT Marketplace are not
              considered legal violations. Accordingly, by using the NFT
              Marketplace and uploading your content or otherwise making Your
              Content available, you grant us a license to access, use, host,
              cache, store, copy, reproduce, transmit, display, publish,
              distribute, adapt and modify (e.g., resize) Your Content for the
              purpose of displaying Your Content to you and other users of the
              NFT Marketplace and to facilitate the display of Your Content on
              the NFT Marketplace. You must understand that by creating listings
              or other content on the NFT Marketplace, and to the extent that
              you make use of any features that allow you to interact with
              others on the NFT Marketplace, we may collect, record, and store
              data about the interaction, including the content of the
              interaction, all communications between parties, and the contact
              information of parties. You acknowledge and agree that Company may
              transfer, distribute, publicly display, publicly perform, market,
              sell, and transmit Your Content for these purposes. You grant
              Company permission to use Your Content for the aforementioned
              purposes. You may remove Your Content from the NFT Marketplace at
              any time, but you acknowledge that the Company may retain archived
              copies of Your Content. The NFT Marketplace provides features that
              allow you to publicly or privately interact with other users on
              the NFT Marketplace.
            </p>

            <h2>4. License to Use NFT Media and Content</h2>
            <p>
              For the NFT Marketplace to display NFTs, there must be a license
              to access, use, host, cache, store, copy, reproduce, transmit,
              display, publish, distribute, adapt, and modify NFT Media linked
              with your NFTs (e.g., resizing digital images). When you upload or
              provide Your Content through the NFT Marketplace, you agree to
              these terms, and you agree that we can automatically grant you a
              license to display Your Content on the NFT Marketplace by using
              the NFT Marketplace or Company Services, and the Company's and the
              NFT Marketplace's users (the "Permitted License"). You represent
              and warrant that you have the right to grant the license set forth
              herein. You acknowledge and agree that when you upload or post
              Your Content through the NFT Marketplace, you grant a license to
              any viewer to view Your Content, and a Permitted License to
              access, use, host, cache, store, copy, reproduce, transmit,
              display, publish, distribute, adapt, and modify Your Content. For
              the avoidance of doubt, the Permitted License is automatically
              granted to users by accessing or using Your Content through the
              NFT Marketplace as permitted by these Terms of Service. Any user
              shall be deemed to be authorized to access or use Your Content and
              display Your Content on the NFT Marketplace by viewing your
              Content or using the NFT Marketplace as permitted by these Terms
              of Service. You represent and warrant that the NFT Media for your
              NFTs and other materials related to the NFTs is not subject to any
              royalty or other limitations that would require Company to pay or
              be required to pay any amounts to any third party or to obtain
              licenses for any intellectual property rights under any relevant
              intellectual property laws, rules, or regulations in any
              jurisdictions in which the NFTs are transacted or accessed. You
              represent and warrant that you will not create or provide listings
              or other content related to the NFT Marketplace or any NFTs that
              infringe the copyright, trademark, patent, trade secret, right of
              privacy, right of publicity, or any other legal right of any third
              party. You represent and warrant that you have all the rights,
              title, and interest in the NFT Media associated with your NFTs, as
              well as the content associated with your NFTs. You represent and
              warrant that you have the necessary licenses, rights, consents,
              and permissions to use and authorize the Company and users of the
              NFT Marketplace to use Your Content to enable the licenses and
              permissions granted by these Terms of Service without infringing
              or violating the rights of any third party. For any users that
              view or use Your Content through the NFT Marketplace, you hereby
              grant them a Permitted License to view and use Your Content by
              viewing Your Content through the NFT Marketplace. You agree to
              provide accurate and complete information in connection with your
              use of the NFT Marketplace, and you agree not to use the NFT
              Marketplace for any illegal purpose or in violation of any
              applicable laws.
            </p>

            <h2>5. User Restrictions and Responsibilities</h2>
            <p>
              You are responsible for your conduct and activities on the NFT
              Marketplace. Any violation of these Terms of Service may result in
              Company taking action against you. You must comply with these
              Terms of Service and all applicable laws, rules, and regulations
              when you access and use the NFT Marketplace. In addition, we
              expect you to be respectful and courteous to other users of the
              NFT Marketplace. Although we do not have the responsibility to
              monitor your use of the NFT Marketplace, we have the right to do
              so for the purpose of operating the NFT Marketplace, to ensure
              your compliance with these Terms of Service, and to comply with
              applicable laws or other legal requirements. We have the right to
              investigate and prosecute violations of any of the above to the
              fullest extent of the law. We may involve and cooperate with law
              enforcement authorities in prosecuting users who violate the Terms
              of Service.
            </p>

            <h2>6. Updates to NFT Marketplace and these NFT Terms</h2>
            <p>
              We may release updates or other modifications to the NFT
              Marketplace, which may modify, add, or remove features from the
              NFT Marketplace. You can stop using the NFT Marketplace at any
              time. Company may also stop providing the NFT Marketplace, or add
              or create new limits to the NFT Marketplace at any time. We
              believe that you own your data and preserving your access to such
              data is important. If we discontinue a NFT Marketplace, where
              reasonably possible, we will give you reasonable advance notice
              and a chance to get your information out of that NFT Marketplace.
            </p>

            <h2>7. Third-party Sites and Services</h2>
            <p>
              The NFT Marketplace contains links to third-party websites and
              online services that are not owned or controlled by the Company.
              Company has no control over, and assumes no responsibility for,
              the content, privacy policies, or practices of any third-party
              websites. In addition, Company will not and cannot censor or edit
              the content of any third-party site. By using the NFT Marketplace,
              you expressly relieve the Company from any and all liability
              arising from your use of any third-party website. Additionally,
              your dealings with or participation in promotions of advertisers
              found on the NFT Marketplace, including payment and delivery of
              goods, and any other terms (such as warranties) are solely between
              you and such advertisers. You agree that Company will not be
              responsible for any loss or damage of any sort relating to your
              dealings with such advertisers.
            </p>

            <h2>8.Assumption of Risks </h2>
            <p>
              DO YOUR RESEARCH. You accept and acknowledge that (i) the value of
              an NFT is subjective; prices of an NFT are subject to volatility,
              and fluctuations in the price of the cryptocurrency can also
              materially and adversely affect NFT prices; (ii) a lack of use or
              public interest in NFTs could negatively impact the potential
              utility of NFTs; (iii) the regulatory regime governing NFTs is
              uncertain, and new regulations or policies may materially
              adversely affect the utility of NFTs; and (iv) there are risks
              associated with purchasing items associated with content created
              by third parties through peer-to-peer transactions, including but
              not limited to, the risk of purchasing counterfeit items,
              mislabelled items, items that are vulnerable to metadata decay,
              items on smart contracts with bugs, and items that may become
              untransferable. You represent and warrant that you have done
              sufficient research before making any decisions to sell, buy,
              transfer, or otherwise interact with any NFTs. You further
              acknowledge and agree that it is your sole responsibility to do
              all necessary due diligence for all your activities relating to
              NFTs. You represent and warrant that you have not and are not
              relying on and shall have no remedies in respect of any statement
              or representation made by Company and/or MetaMart (as defined in the
              MetaMart Terms) concerning any sale, buy, transfer or interaction
              otherwise with any NFTs. Any purchase or sale you make, accept or
              facilitate outside of the NFT Marketplace of an NFT will be at
              your risk. You acknowledge that you have obtained sufficient
              information to make an informed decision to purchase an NFT,
              including carefully reviewing the code of the smart contract and
              the NFT and fully understanding and accepting the functions of the
              same. We do not control or endorse purchases or sales of NFTs
              outside of the NFT Marketplace. We expressly deny and disclaim any
              liability to you and deny any obligation to indemnify you or hold
              you harmless for any losses you may incur by transacting, or
              facilitating transactions, in NFTs outside of the NFT Marketplace.
              Certain parts of the NFT Marketplace may display, include or make
              available content, data, information, applications, or materials
              from third parties (Third Party Materials). By using the NFT
              Marketplace, you acknowledge and agree that Company is not
              responsible for examining or evaluating the content, accuracy,
              completeness, availability, timeliness, validity, copyright
              compliance, legality, decency, quality, or any other aspect of
              such Third Party Materials. We do not warrant or endorse and do
              not assume. We will not have any liability or responsibility to
              you or any other person for any third-party services, Third Party
              Materials, or any other materials, products, or services of third
              parties. If you have a dispute with one or more users, YOU RELEASE
              US FROM CLAIMS, DEMANDS, AND DAMAGES OF EVERY KIND AND NATURE,
              KNOWN AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH
              SUCH DISPUTES. IN ENTERING INTO THIS RELEASE, YOU EXPRESSLY WAIVE
              ANY PROTECTIONS (WHETHER STATUTORY OR OTHERWISE) THAT WOULD
              OTHERWISE LIMIT THE COVERAGE OF THIS RELEASE TO INCLUDE THOSE
              CLAIMS WHICH YOU MAY KNOW OR SUSPECT TO EXIST IN YOUR FAVOUR AT
              THE TIME OF AGREEING TO THIS RELEASE.
            </p>
            <h2>9.Limitation of Liability </h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AGREE THAT THE COMPANY
              will not BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFIT
              OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
              PUNITIVE DAMAGES RELATED TO THE LOSS OF REVENUE, LOSS OF PROFIT,
              LOSS OF BUSINESS OR ANTICIPATED SAVING, LOSS OF USE, LOSS OF
              GOODWILL OR LOSS OF DATA, WHETHER CAUSED BY TORT (INCLUDING
              NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF PARTIES
              HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; AND (B) FOR
              ANY OTHER CLAIM, DEMAND, OR DAMAGES WHATSOEVER RESULTING FROM OR
              ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OF THE DELIVERY,
              USE, OR PERFORMANCE OF THE SERVICE. ACCESS TO AND USE OF THE
              SERVICE, PRODUCTS, OR THIRD-PARTY SITES AND PRODUCTS ARE AT YOUR
              OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR
              ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF
              DATA RESULTING THEREFROM. NOTWITHSTANDING ANYTHING TO THE CONTRARY
              CONTAINED HEREIN, IN NO EVENT SHALL THE MAXIMUM AGGREGATE
              LIABILITY OF THE COMPANY ARISING OUT OF OR IN ANY WAY RELATED TO
              THESE TERMS, THE ACCESS TO AND USE OF THE SERVICE, CONTENT, OR
              NFTS EXCEED $100.
            </p>
            <h2>10.Termination</h2>
            <p>
              If you violate any of the provisions of these NFT Terms, we
              reserve the right, with or without notice and in our sole
              discretion, to suspend, disable, terminate, or delete your account
              and/or your ability to access or use the NFT Marketplace (or any
              part of the preceding) at any time and for any or no reason, and
              you acknowledge and agree that we shall have no liability or
              obligation to you in such event and that you will not be entitled
              to a refund of any amounts that you have already paid to us.
            </p>
            <h2>11.Contact</h2>
            <p>
              General questions or comments about the NFT Marketplace or these
              NFT Terms should be sent by contacting the customer support team.
            </p>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Privacy;
