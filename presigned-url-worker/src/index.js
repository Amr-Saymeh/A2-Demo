export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Basic CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Upload endpoint: POST /upload with multipart/form-data
      if (url.pathname === "/upload" && request.method === "POST") {
        const form = await request.formData();
        const file = form.get("file");
        if (!(file instanceof File)) {
          return new Response(JSON.stringify({ error: "Missing file" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
        }

        // Optional prefix for organization (e.g. restaurant/category/item)
        const pathPrefix = (form.get("pathPrefix") || "").toString().replace(/(^\/+|\/+$)/g, "");

        // Derive extension safely
        const originalName = file.name || "upload";
        const m = /\.([a-zA-Z0-9]{1,10})$/.exec(originalName);
        const ext = (m ? m[1] : "bin").toLowerCase();
        const key = `${pathPrefix ? pathPrefix + "/" : ""}uploads/${crypto.randomUUID()}.${ext}`;

        // Store into R2
        await env.MY_BUCKET.put(key, file.stream(), {
          httpMetadata: { contentType: file.type || "application/octet-stream" },
        });

        // Public URL via this Worker (streaming proxy)
        const base = `${url.protocol}//${url.host}`;
        const publicUrl = `${base}/file/${encodeURIComponent(key)}`;

        return new Response(JSON.stringify({ key, publicUrl }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // File serving endpoint: GET /file/<key>
      if (url.pathname.startsWith("/file/") && request.method === "GET") {
        const key = decodeURIComponent(url.pathname.replace(/^\/file\//, ""));
        if (!key) {
          return new Response("Not Found", { status: 404, headers: corsHeaders });
        }
        const obj = await env.MY_BUCKET.get(key);
        if (!obj) {
          return new Response("Not Found", { status: 404, headers: corsHeaders });
        }
        const headers = new Headers(corsHeaders);
        const type = obj.httpMetadata?.contentType || "application/octet-stream";
        headers.set("Content-Type", type);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        // Inline display, include filename if we can
        const filename = key.split("/").pop() || "file";
        headers.set("Content-Disposition", `inline; filename="${filename}"`);
        return new Response(obj.body, { headers });
      }

      // Default route info
      return new Response(JSON.stringify({ ok: true, routes: ["POST /upload", "GET /file/<key>"] }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};