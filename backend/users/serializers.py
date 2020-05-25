from rest_framework import serializers
from rest_framework.reverse import reverse
from users.models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField('make_user_url')

    class Meta:
        model = CustomUser
        fields = ('id', 'url', 'first_name', 'last_name', 'username',
                  'email', 'password', 'phone')
        write_only_fields = ('password',)

    #To store password in hash format we need to overwrite create and update functions
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super(UserRegistrationSerializer, self).update(instance, validated_data)

    #Build URL for User instance
    def make_user_url(self, obj):
        kwargs = {'username': obj.username}
        url = reverse('user-detail', kwargs=kwargs)
        return self.context['request'].build_absolute_uri(url)


class UserUpdateSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField('make_user_url')

    class Meta:
        model = CustomUser
        fields = ('id', 'url', 'first_name', 'last_name', 'username',
                  'email', 'password', 'phone')
        read_only_fields = ('username','password')
    
    #Build URL for User instance
    def make_user_url(self, obj):
        kwargs = {'username': obj.username}
        url = reverse('user-detail', kwargs=kwargs)
        return self.context['request'].build_absolute_uri(url)


class UpdatePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
