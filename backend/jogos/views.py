from rest_framework import generics
from .models import Jogo
from .serializer import JogoSerializer


# Listar jogos

class ListaJogosView(generics.ListCreateAPIView):
    serializer_class = JogoSerializer

    def get_queryset(self):
        queryset = Jogo.objects.all()

        nome = self.request.query_params.get('nome')

        if nome:
            queryset = queryset.filter(nome__icontains=nome) #faz com que a pesquisa não diferencie letras maiúsculas de minúsculas

        return queryset



class DetalheJogoView(generics.RetrieveDestroyAPIView):
    queryset = Jogo.objects.all()
    serializer_class = JogoSerializer


