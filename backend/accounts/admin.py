from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import Lisence


class CustomUserAdmin(UserAdmin):

    fieldsets = (
        (None, {"fields": ('email', 'password', 'username', 'phone')}),
        ('Personal Info', {
         'fields': ('first_name', 'last_name', 'role',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active',
         'is_superuser', 'groups', 'user_permissions',)}),
        ('Important dates', {
         'fields': ('last_login', 'date_joined',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2',)
        }),
    )

    list_display = ('email', 'username', 'first_name',
                    'last_name', 'is_staff', 'phone')
    search_fields = ('email', 'username', 'first_name', 'last_name',)
    ordering = ('email',)


admin.site.register(get_user_model(), CustomUserAdmin)
admin.site.register(Lisence)
