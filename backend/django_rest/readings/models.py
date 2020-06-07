from django.db import models


class Reading(models.Model):
    name = models.CharField(max_length=128)
    author = models.CharField(max_length=128)
    page = models.PositiveSmallIntegerField()
    user = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
