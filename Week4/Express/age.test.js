const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const { createRideApp, isOldEnough } = require("./age");

function requestJson(server, path) {
  return new Promise((resolve, reject) => {
    const port = server.address().port;
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method: "GET",
      },
      (res) => {
        let body = "";

        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            body: body ? JSON.parse(body) : null,
          });
        });
      }
    );

    req.on("error", reject);
    req.end();
  });
}

test("isOldEnough returns true for adults", () => {
  assert.equal(isOldEnough(18), true);
  assert.equal(isOldEnough(22), true);
});

test("isOldEnough returns false for minors", () => {
  assert.equal(isOldEnough(17), false);
  assert.equal(isOldEnough(0), false);
});

test("ride endpoint accepts valid adults", async () => {
  const app = createRideApp();
  const server = app.listen(0);

  try {
    const response = await requestJson(server, "/ride1?age=21");

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, {
      msg: "You have successfully ridden Ride1",
    });
  } finally {
    server.close();
  }
});

test("ride endpoint rejects missing age", async () => {
  const app = createRideApp();
  const server = app.listen(0);

  try {
    const response = await requestJson(server, "/ride1");

    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, {
      msg: "Age query parameter must be a number",
    });
  } finally {
    server.close();
  }
});

test("ride endpoint rejects underage riders", async () => {
  const app = createRideApp();
  const server = app.listen(0);

  try {
    const response = await requestJson(server, "/ride1?age=16");

    assert.equal(response.statusCode, 411);
    assert.deepEqual(response.body, {
      msg: "Sorry you are not at required age yet",
    });
  } finally {
    server.close();
  }
});