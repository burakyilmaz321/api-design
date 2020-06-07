"""django_rest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from users.views import users_list, users_detail, leaderboard
from readings.views import readings_list, readings_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    # users
    path('users/', users_list),
    path('users/<int:id>/', users_detail),
    # readings
    path('users/<int:user_id>/readings/', readings_list),
    path('users/<int:user_id>/readings/<int:id>/', readings_detail),
    # leaderboard
    path('leaderboard/', leaderboard)
]
