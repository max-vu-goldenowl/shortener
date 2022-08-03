from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, Http404, HttpResponseRedirect
import json

from .models import Shortener

@csrf_exempt
def save_url_view(request):
  if request.method == 'POST':
    json_data = json.loads(request.body.decode('UTF-8'))
    short_url_object, created = Shortener.objects.get_or_create(original_url=json_data['original_url'])

    data = {
        'original_url': short_url_object.original_url,
        'short_url': request.build_absolute_uri('/') + short_url_object.short_url
    }

    return JsonResponse(data)

def redirect_url_view(request, shortened_part):
  try:
    shortener = Shortener.objects.get(short_url=shortened_part)
    shortener.click += 1
    shortener.save()

    return HttpResponseRedirect(shortener.original_url)
  except:
    raise Http404('Sorry this link is broken :(')
