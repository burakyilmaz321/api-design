from django.db.models import Count, Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer
from readings.models import Reading


@api_view(['GET'])
def leaderboard(request):
    readings = Reading.objects.all()
    leaderboard = readings.values('user__name').annotate(
        page=Sum('page'), book=Count('id')
    )
    return Response(list(leaderboard))

@api_view(['GET', 'POST'])
def users_list(request):
    if request.method == 'GET':
        res = index()
    elif request.method == 'POST':
        res = create(request.data)
    return Response(res)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def users_detail(request, id):
    if request.method == 'GET':
        res = show(id)
    elif request.method == 'PUT':
        res = update(request.data, id, False)
    elif request.method == 'PATCH':
        res = update(request.data, id, True)
    elif request.method == 'DELETE':
        res = delete(id)
    return Response(res)


def create(data):
    serializer = UserSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return serializer.data


def show(id):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user)
    return serializer.data


def update(data, id, partial):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user, data=data, partial=partial)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return serializer.data


def delete(id):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user)
    user.delete()
    return serializer.data


def index():
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return serializer.data

