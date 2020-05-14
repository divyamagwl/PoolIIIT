from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Checks if the user should be allowed to (Update, Destroy) booking details or not
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user.username == request.user.username
