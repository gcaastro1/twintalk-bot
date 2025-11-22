from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Message
from .serializers import MessageSerializer


class MessageView(APIView):

    def get(self, request):
        user = request.query_params.get('user')

        if user not in ['A', 'B']:
            return Response(
                {"error": "Parâmetro 'user' deve ser A ou B"},
                status=status.HTTP_400_BAD_REQUEST
            )

        messages = Message.objects.filter(user=user).order_by('created_at')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.data.get('user')
        text = request.data.get('text')

        if not user or not text:
            return Response(
                {"error": "Campos 'user' e 'text' são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST
            )

        mock_responses = {
            'A': "Obrigado por sua mensagem, Usuário A. Em breve retornaremos.",
            'B': "Mensagem recebida, Usuário B! Aguarde nosso retorno.",
        }

        response_text = mock_responses.get(user, "Obrigado pelo contato.")

        message = Message.objects.create(
            user=user,
            text=text,
            response=response_text
        )

        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
