const notFound = () => new Response("Not found", {
  status: 404,
  headers: { "content-type": "text/plain; charset=utf-8" }
});

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

    if (!env.ASSETS?.fetch) return notFound();

    const response = await env.ASSETS.fetch(new Request(url, request));
    return response.status === 404 ? notFound() : response;
  }
};
