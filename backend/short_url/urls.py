from django.urls import path

from .views import save_url_view

app_name = 'short_url'

urlpatterns = [
  path('save/', save_url_view, name='save_url'),
]
