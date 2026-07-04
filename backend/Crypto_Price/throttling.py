from rest_framework.throttling import UserRateThrottle, AnonRateThrottle


class BurstRateThrottle(UserRateThrottle):
    scope = "burst"
    rate = "5/min"   # logged-in users


class BurstAnonRateThrottle(AnonRateThrottle):
    scope = "anon_burst"
    rate = "3/min"   # anonymous users