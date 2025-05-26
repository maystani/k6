// Import the HTTP module from k6 to make HTTP requests
import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the load test options
// noinspection JSUnusedGlobalSymbols
export const options = {
    duration: "3m", // Total duration of the test: 3 minutes
    vus: 50, // Number of virtual users running concurrently
    noConnectionReuse: true, // Disable HTTP keep-alive; each request uses a new TCP connection
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of the requests should take less than 500ms
        http_req_failed: ['rate<0.01'],   // Error rate < 1%
    },
};

// This is the main function executed by each virtual user in a loop
// noinspection JSUnusedGlobalSymbols
export default function () {
    // Send a GET request to the target URL
    const res = http.get("http://simple-go/load?duration=1");

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // Optional: short pause to simulate more realistic user interactions
    sleep(Math.random() * 2);
};
