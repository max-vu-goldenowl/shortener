from rest_framework import serializers
from .models import Shortener

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
  def __init__(self, *args, **kwargs):
    # Don't pass the 'fields' arg up to the superclass
    fields = kwargs.pop('fields', None)

    # Instantiate the superclass normally
    super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

    if fields is not None:
      # Drop any fields that are not specified in the `fields` argument.
      allowed = set(fields)
      existing = set(self.fields.keys())
      for field_name in existing - allowed:
        self.fields.pop(field_name)

class ShortenerSerializer(DynamicFieldsModelSerializer):
  class Meta:
    model = Shortener
    fields = '__all__'
