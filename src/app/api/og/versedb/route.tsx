import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import {VDBLogo} from "../../../logo";
import slugify from "slugify";

export const runtime = "edge";

// limit the text length
function limit(string = "", limit = 0) {
  return string.substring(0, limit);
}

// load font file
const regularFont = fetch(new URL("/public/font.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

// api GET
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") || "DATABASE";
  const title = searchParams.get("title") || "VERSE.DB";
  const description =
    searchParams.get("description") ||
    "verse.db isn't just a database, it's your universal data bridge. Designed for unmatched flexibility, security, and performance, verse.db empowers you to manage your data with ease.";

  const clean_type = slugify(type, {
    replacement: " ",
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: false,
  });
  const clean_word = slugify(title, {
    replacement: " ",
    remove: /[*+~()'"!:@]/g,
    lower: false,
    strict: false,
  });
  const clean_description = slugify(description, {
    replacement: " ",
    remove: /[*+~()'"!:@]/g,
    lower: false,
    strict: false,
  });

  const typeCleaned = limit(clean_type, 200);
  const word = limit(clean_word, 200);
  const CleanedDescription = limit(clean_description, 200);
  const [regularFontData] = await Promise.all([regularFont]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle, rgba(10,25,47,1) 0%, rgba(13,16,20,1) 90%)",
            fontSize: "4rem",
            fontWeight: 600,
          }}
        >
          <VDBLogo width="120" height="120" />
          <div
            style={{
              marginBottom: "-60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: "rgba(250, 250, 250, 0.5)",
                display: "flex",
                marginBottom: "-20px"
              }}
            >
              {typeCleaned}
            </div>
            <div style={{ color: "#fff", display: "flex" }}>{word}</div>
            <div
              style={{
                color: "rgba(250, 250, 250, 0.5)",
                display: "flex",
                fontSize: "18px",
                marginBottom: "-10px",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "80%",
              }}
            >
              {CleanedDescription}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 40,
              color: "#808080",
              fontSize: 19,
            }}
          >
            JEDI Studio.
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [
        {
          name: "Baloo Thambi",
          data: regularFontData,
          style: "normal",
        },
      ],
    }
  );
}
