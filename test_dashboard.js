async function test() {
  try {
    // 1. Login
    const loginRes = await fetch("http://localhost:3000/api/auth/login", {
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
    const loginJson = await loginRes.json();
    const token = loginJson.data.token;

    // 2. Get dashboard
    const res = await fetch("http://localhost:3000/api/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    console.log("Status:", res.status);
    const json = await res.json();
    console.log("JSON response:", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
