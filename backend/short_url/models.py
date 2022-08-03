from django.db import models
from .utils import create_shortened_url

# Create your models here.
class Shortener(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  click = models.PositiveIntegerField(default=0)
  original_url = models.URLField()
  short_url = models.CharField(max_length=15, unique=True, blank=True)

  def __str__(self):
    return f'{self.original_url} to {self.short_url}'

  def save(self, *args, **kwargs):
    if not self.short_url:
      self.short_url = create_shortened_url(self)

    super().save(*args, **kwargs)
