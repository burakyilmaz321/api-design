from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer
from readings.models import Reading
from readings.serializers import ReadingSerializer


@api_view(['GET', 'POST', 'DELETE'])
def readings_list(request, user_id):
    if request.method == 'GET':
        res = index(user_id)
    elif request.method == 'POST':
        res = create(user_id, request.data)
    return Response(res)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def readings_detail(request, user_id, id):
    if request.method == 'GET':
        res = show(user_id, id)
    elif request.method == 'PUT':
        res = update(request.data, user_id, id, False)
    elif request.method == 'PATCH':
        res = update(request.data, user_id, id, True)
    elif request.method == 'DELETE':
        res = delete(user_id, id)
    return Response(res)


def create(user_id, data):
    serializer = ReadingSerializer(data={"user": user_id, **data})
    serializer.is_valid(raise_exception=True)
    reading = serializer.save()
    return serializer.data


def show(user_id, id):
    user = User.objects.get(id=user_id)
    reading = user.reading_set.get(id=id)
    serializer = ReadingSerializer(reading)
    return serializer.data


def update(data, user_id, id, partial):
    user = User.objects.get(id=user_id)
    reading = user.reading_set.get(id=id)
    serializer = ReadingSerializer(reading, data={"user": user_id, **data}, partial=partial)
    serializer.is_valid(raise_exception=True)
    reading = serializer.save()
    return serializer.data


def delete(user_id, id):
    user = User.objects.get(id=user_id)
    reading = user.reading_set.get(id=id)
    serializer = ReadingSerializer(reading)
    reading.delete()
    return serializer.data


def index(user_id):
    user = User.objects.get(id=user_id)
    readings = user.reading_set.all()
    serializer = ReadingSerializer(readings, many=True)
    return serializer.data
