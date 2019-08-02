# updated version that should work with django 1.10 middleware style
# tested up to django 2.2

import time
from django.conf import settings
from django.shortcuts import redirect


class SessionIdleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        UserID = request.session.get('UserID')
        if UserID and UserID > 0:
            if 'last_request' in request.session:
                elapsed = time.time() - request.session['last_request']
                if elapsed > settings.SESSION_IDLE_TIMEOUT:
                    del request.session['last_request'] 
                    request.session.flush()  
                    return redirect('/home/login')
            request.session['last_request'] = time.time()
        else:
            if 'last_request' in request.session:
                del request.session['last_request']

        response = self.get_response(request)

        return response