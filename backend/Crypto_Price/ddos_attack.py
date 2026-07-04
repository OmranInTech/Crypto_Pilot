import requests
import threading
import time

URL = "http://127.0.0.1:8000/api/crypto/ddos/"

REQUESTS_PER_THREAD = 50
THREADS = 30   # safer simulation

def spam(thread_id):
    for i in range(REQUESTS_PER_THREAD):
        try:
            r = requests.get(URL, timeout=3)
            print(f"Thread {thread_id} request {i} -> {r.status_code}")
        except Exception as e:
            print(f"Thread {thread_id} error:", e)


threads = []

start = time.time()
print("Starting DDOS simulation...")

for i in range(THREADS):
    t = threading.Thread(target=spam, args=(i,))
    t.start()
    threads.append(t)

for t in threads:
    t.join()

end = time.time()

print("Finished in:", end - start, "seconds")