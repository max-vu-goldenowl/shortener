from django.shortcuts import render
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.http import JsonResponse, Http404, HttpResponseRedirect
import json

from .serializers import ShortenerSerializer
from .models import Shortener
from .utils import create_shortened_url

class ShortenerView(viewsets.ModelViewSet):
  queryset = Shortener.objects.all().only('original_url', 'short_url')
  ShortenerSerializer(queryset, many=True, fields = ('original_url', 'short_url')).data

@csrf_exempt
def save_url_view(request):
  if request.method == 'POST':
    json_data = json.loads(request.body.decode('UTF-8'))
    short_url_object = Shortener.objects.filter(original_url=json_data['original_url'])
    if short_url_object:
      data = {
        'original_url': short_url_object[0].original_url,
        'short_url': request.build_absolute_uri('/') + short_url_object[0].short_url
      }
    else:
      short_url_object = Shortener.objects.create(original_url=json_data['original_url'])
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
