from locust import HttpUser, task, between


class CryptoLoadUser(HttpUser):
    wait_time = between(0.2, 1)

    # Main crypto endpoint test
    @task(3)
    def crypto_prices(self):
        self.client.get("/api/crypto/prices/")

    # Stress repeated hits (simulates real traffic spikes)
    @task(1)
    def burst_requests(self):
        for _ in range(3):
            self.client.get("/api/crypto/prices/")