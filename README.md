# Bookstock

A small, installable web app for scanning book ISBNs, looking up bibliographic details, and preparing product rows that match `product_template.csv` exactly (61 columns, same order).

## Use

1. Serve this folder over HTTPS (camera access requires a secure origin). For a quick local preview, run `python3 -m http.server 8000` here and open `http://localhost:8000` on the same computer. For iPhone camera use, publish the folder to an HTTPS static host such as GitHub Pages, Netlify, or Vercel.
2. Open the site in Safari on your iPhone. Use **Share → Add to Home Screen** to install it like an app.
3. Scan a barcode or type the ISBN. The app checks Google Books, then Open Library.
4. Tap the pencil on a result to edit the title, author, price, product type, tags, and description. Unfilled Shopify fields can also be completed in the sheet.
5. Tap **Export sheet** to download the Shopify CSV. Import the CSV into Google Sheets or into Shopify’s product CSV importer.

The batch is saved in the browser on that device. It is not sent anywhere until you export it or configure the optional sheet connection.

## Direct Google Sheets connection (optional)

1. Create/open the destination Google Sheet and choose **Extensions → Apps Script**.
2. Paste in `apps-script.gs` and save.
3. Deploy as a **Web app**, executing as yourself, with access set to **Anyone**. Copy the deployed `/exec` URL.
4. In Bookstock, open the gear settings, paste the URL, and save.
5. **Export sheet** appends the 61-column header on a blank sheet, followed by the scanned product rows.

Google Apps Script's `Anyone` web-app access means anyone possessing that URL may append rows to the sheet. Keep the URL private. If your Google Workspace policy does not allow that access setting, use CSV export instead.

## Shopify fields prefilled

Book title, URL handle, lookup description, vendor (`Sparkling Bookshelf`), product category (`Media > Books`), type (`Books`), tags, draft status, ISBN barcode, default variant, tax/shipping/inventory defaults, cover image URL, image alt text, and SEO fields. Price and SKU remain blank. The lookup description is source metadata and should be reviewed/rewritten before publishing.

The app uses Google Books and Open Library public endpoints. Book metadata and cover availability vary by ISBN and source.
