const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");

const { getFdk } = require("./fdk");


(async () => {
  const app = express();
  app.use(cookieParser("ext.session"));
  app.use(bodyParser.json({ limit: "2mb" }));

  /**
   * FDK SETUP
   */
  let fdk = null;
  try {
    fdk = await getFdk();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }

  const fdkHandler = fdk.fdkHandler;
  app.use(fdkHandler);

  /**
   * PLATFORM
   */
  const apiRoutes = fdk.apiRoutes;
  apiRoutes.use("/company", async (req, res) => {
    const {
      query: { company_id },
    } = req;

    const response = await req.platformClient.catalog.getProducts({
      pageNo: 1,
      pageSize: 10,
    });

    res.setHeader("Content-type", "text/html").send(`
            <h1>Wizzy extension for the company ${company_id}</h1>
            <h2>Products</h2>
            ${response.items.map((product, index) => {
              return `
              <div>
                <h3>Product ${index + 1}<h3>
                ${JSON.stringify(product)}
              </div>
              `;
            })}
        `);
  });
  app.use(apiRoutes);

  /**
   * RITIK
   */
  const applicationProxyRoutes = fdk.applicationProxyRoutes;

  /**
   * FDK HANDLERS (install, auth, autoinstall)
   */
  

  

  app.listen(8000, () => console.log(`SERVER: http:\\localhost:8000`));
})();
