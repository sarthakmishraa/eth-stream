const axios = require("axios");

const URL = "https://eth-stream.vercel.app/";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

describe("Production Status", () => {
    test("Checking if the status code of webapp is 200", async () => {
        const response = await axios.get(URL);
        expect(response.status).toBe(200);
    });
});

describe("API Link Status", () => {
    if(API_URL) {
        test("Checking if the API URL is working fine", async () => {
            const response = await axios.get(API_URL);
            expect(response.status).toBe(200);
        });
    }
});