from django.contrib import admin
from .models import Note # The dot (.) means "look in this same folder"

admin.site.register(Note)