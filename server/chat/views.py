from rest_framework import viewsets
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer
import time 

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        
        user_id = self.request.query_params.get('user')
        if user_id:
            return Message.objects.filter(user=user_id).order_by('created_at')
        return Message.objects.all()

    def perform_create(self, serializer):
        user_input = self.request.data.get('text', '')
        user_id = self.request.data.get('user', 'A')

        if user_id == 'A':
            mock_response = "Obrigado por seu contato, Usuário A. Em breve responderemos."
        else:
            mock_response = "Olá Usuário B! Recebemos sua mensagem e já estamos analisando."

        serializer.save(response=mock_response)