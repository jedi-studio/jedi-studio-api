import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
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

  const title = searchParams.get("title") || "sanweb";
  const clean_word = slugify(title, {
    replacement: " ",
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: false,
  });

  const word = limit(clean_word, 200);
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
            height: "95%",
            width: "95%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            fontSize: 32,
            fontWeight: 600,
            borderRadius: 18,
          }}
        >
          <svg
            height="120"
            fill="none"
            enableBackground="new 0 0 512 512"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.507 2.138a1 1 0 00-1.155.102L4.196 9.197c-2.924 2.924-2.924 7.682 0 10.606a7.471 7.471 0 005.3 2.192c1.924 0 3.85-.734 5.317-2.202l6.903-7.096A1.001 1.001 0 0021 11h-3.301l4.175-7.514a1.002 1.002 0 00-1.359-1.36l-7.11 3.95.576-2.88a1.002 1.002 0 00-.474-1.058zM14 14.5a4.5 4.5 0 01-9 0c0-1.57.807-2.95 2.025-3.754-.01.084-.025.167-.025.254a2 2 0 103.845-.772C12.669 10.802 14 12.486 14 14.5z"
              data-original="#000000"
              fill="#fff"
            ></path>
          </svg>
          <div style={{ marginTop: 40, color: "#fff", display: "flex" }}>
            {word}
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
            jsonverse.vercel.app
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
