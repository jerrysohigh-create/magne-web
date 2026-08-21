const plainNotFound = () => new Response("Not found", {
  status: 404,
  headers: { "content-type": "text/plain; charset=utf-8" }
});

async function notFound(request, env) {
  if (!env.ASSETS?.fetch) return plainNotFound();
  const notFoundUrl = new URL("/404.html", request.url);
  const page = await env.ASSETS.fetch(new Request(notFoundUrl, request));
  if (!page.ok) return plainNotFound();
  const headers = new Headers(page.headers);
  headers.set("cache-control", "no-store");
  return new Response(page.body, { status: 404, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { allow: "GET, HEAD" }
      });
    }

    if (url.pathname === "/") {
      return Response.redirect(new URL("/en/", url), 308);
    }

    if (!env.ASSETS?.fetch) return plainNotFound();

    const response = await env.ASSETS.fetch(new Request(url, request));
    return response.status === 404 ? notFound(request, env) : response;
  }
};
