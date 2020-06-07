from django.db import models


class User(models.Model):
    name = models.CharField(max_length=128)
    book_target = models.PositiveSmallIntegerField(blank=True, null=True)
    page_target = models.PositiveSmallIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
