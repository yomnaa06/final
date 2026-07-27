async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "admin@seghaier.com",
        password: "adminpassword",
        clientType: "ADMIN"
      })
    });
    console.log("Status:", res.status);
    const json = await res.json();
    console.log("JSON response:", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
