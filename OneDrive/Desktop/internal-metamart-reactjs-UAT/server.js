const express = require("express");
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 2011;

const app = express();
const api_url = "https://nodenft.fierex.com/api/v1/";
// const api_url = "https://nftcreationmarketplace.mobiloitte.io/api/v1/";
app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/item", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/marketplace", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/marketplace-Detail", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  var postid = "";
  const checkURl = req.url.includes("fbclid");
  if (checkURl) {
    const sortedURL = req.url.split("?fbclid=")[0];
    const check2 = sortedURL.split("?");
    const finalId = check2[check2.length - 1];
    if (finalId) {
      postid = finalId;
    } else {
      postid = "";
    }
  } else {
    const id = req.url.split("?")[1];
    postid = id;
  }
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const fullUrl = `${protocol}://${host}${url}`;
  axios({
    method: "GET",
    url: `${api_url}order/viewOrder/${postid}`,
  }).then((response) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return console.log(err);
      }
      const image = response.data.result.nftId.mediaFileFI
        ? response.data.result.nftId.mediaFileFI
        : response.data.result.nftId.mediaFile;
      data = data
        .replace(/__TTITLE__/g, response.data.result.nftId.tokenName)
        .replace(/__KEYWORDS__/g, response.data.result.nftId.codeType)
        .replace(/__DESCRIPTION__/g, response.data.result.nftId.description)
        .replace(/__IMAGE__/g, image)
        .replace(/__TDESCRIPTION__/g, response.data.result.nftId.description)
        .replace(/__TIMAGE__/g, image)
        .replace(/__ARTICLE__/g, image)
        .replace(/__URL__/g, fullUrl)
        .replace(/__FULLDATA__/g, response.data.result.nftId.description);

      res.send(data);
    });
  });
});

app.get("/my-mints", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/conect-wallet", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/mint", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/mint-details", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/edit-profile", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/nft-report", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/user-management", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/nft-management", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/dashboard", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/control", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/category-view", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/category", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/kyc-management", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/revenue-management", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/add-static", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/static-content", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/view-static", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/faqadd-list", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/brand-adminlist", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/faq-list", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/editfaq-list", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/view-faqdata", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/view-kycdetails", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/my-viewbrand", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/add-faqdata", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/add-subadmin", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/creators-list", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/profile", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/feedback-list", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/subscribers", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/request-message", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/activity", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/collections", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/hot-collection", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/my-collections", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/my-brandlist", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/mybrand-collectionlist", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/create", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/resale-nft", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/creators", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/author", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/collection-details", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  var collection_id = "";
  const checkURl = req.url.includes("fbclid");
  if (checkURl) {
    const sortedURL = req.url.split("?fbclid=")[0];
    const check2 = sortedURL.split("?");
    const finalId = check2[check2.length - 1];
    if (finalId) {
      collection_id = finalId;
    } else {
      collection_id = "";
    }
  } else {
    const id = req.url.split("?")[1];
    collection_id = id;
  }
  console.log("collection_id==0", collection_id);
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const fullUrl = `${protocol}://${host}${url}`;

  axios({
    method: "GET",
    url: `${api_url}collection/viewCollection/${collection_id}`,
  }).then((response) => {
    console.log("response---collection", response.data.result);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return console.log(err);
      }
      // const image = response.data.result.nftId.mediaFileFI
      // ? response.data.result.nftId.mediaFileFI
      // : response.data.result.nftId.mediaFile;
      data = data
        .replace(/__TTITLE__/g, response.data.result.displayName)
        .replace(/__KEYWORDS__/g, response.data.result.symbol)
        .replace(/__DESCRIPTION__/g, response.data.result.description)
        .replace(/__IMAGE__/g, response.data.result.collectionImage)
        .replace(/__TDESCRIPTION__/g, response.data.result.description)
        .replace(/__TIMAGE__/g, response.data.result.collectionImage)
        .replace(/__ARTICLE__/g, response.data.result.bannerImage)
        .replace(/__URL__/g, fullUrl)
        .replace(/__FULLDATA__/g, response.data.result.description);

      res.send(data);
    });
  });
});

app.get("/auction", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/explore", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");
    res.send(data);
  });
});

app.get("/feedback", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/faqs", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")

      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png");

    res.send(data);
  });
});

app.get("/support-tickets", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/ranking", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/search", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/searchprofile", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/help-center", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/edit-pressmedia", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/edit-media", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/edit-category", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/media-list", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/view-media", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/about", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/aml", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/legal", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/terms-conditions", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/privacy-policy", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/request-message", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.get("/kyc", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const fullUrl = `${protocol}://${host}${url}`;
    data = data
      .replace(/__TTITLE__/g, "Fieres | Marketplace.")
      .replace(/__KEYWORDS__/g, "Fieres | Marketplace.")
      .replace(/__DESCRIPTION__/g, "Create Connect Trade")
      .replace(/__IMAGE__/g, "/images/favicon.png")
      .replace(/__TDESCRIPTION__/g, "Create Connect Trade")
      .replace(/__TIMAGE__/g, "/images/favicon.png")
      .replace(/__ARTICLE__/g, "/images/favicon.png")
      .replace(/__URL__/g, fullUrl)
      .replace(/__FULLDATA__/g, "Create Connect Trade");

    res.send(data);
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));
app.listen(PORT, () => {
  console.log(`Server is listening on port localhost:${PORT}`);
});
