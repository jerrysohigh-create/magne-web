const plainNotFound = () => new Response("Not found", {
  status: 404,
  headers: { "content-type": "text/plain; charset=utf-8" }
});

const legacyCertificationRoutes = new Map([
  ["/magne-web/google-approval.html", "/google-approval.html"],
  ["/magne-web/fcc-lookup.html", "/fcc-lookup.html"],
  ["/magne-web/gsma-tac-lookup.html", "/gsma-tac-lookup.html"],
  ["/magne-web/cb-lookup.html", "/cb-lookup.html"],
  ["/magne-web/un383-lookup.html", "/un383-lookup.html"],
  ["/magne-web/cp65-lookup.html", "/cp65-lookup.html"],
  ["/magne-web/ce-lookup.html", "/ce-lookup.html"],
]);

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

    const certificationRoute = legacyCertificationRoutes.get(url.pathname);
    if (certificationRoute) {
      url.pathname = certificationRoute;
      return Response.redirect(url, 308);
    }

    if (url.pathname === "/magne-web/lottery-dashboard.html" || url.pathname === "/lottery-dashboard.html") {
      return Response.redirect("https://w3.magne.ai/season-1.html", 308);
    }

    if (!env.ASSETS?.fetch) return plainNotFound();

    const response = await env.ASSETS.fetch(new Request(url, request));
    return response.status === 404 ? notFound(request, env) : response;
  }
};
