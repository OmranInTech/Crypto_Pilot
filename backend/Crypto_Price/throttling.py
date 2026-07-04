from rest_framework.throttling import UserRateThrottle, AnonRateThrottle


# =========================================================
# BEFORE PROTECTION (BASELINE / NO SECURITY LIMITS)
# =========================================================

# class NoLimitUserThrottle(UserRateThrottle):
#     rate = "10000/day"


# class NoLimitAnonThrottle(AnonRateThrottle):
#     rate = "10000/day"


# =========================================================
# AFTER PROTECTION (RATE LIMITING ENABLED)
# =========================================================

class BurstRateThrottle(UserRateThrottle):
    rate = "10/second"


class BurstAnonRateThrottle(AnonRateThrottle):
    rate = "10/second"

