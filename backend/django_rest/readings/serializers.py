from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from readings.models import Reading
from users.serializers import UserSerializer


class ReadingSerializer(ModelSerializer):
    class Meta:
        model = Reading
        fields = '__all__'
