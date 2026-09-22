from django.urls import path
from .views import ListaJogosView, DetalheJogoView


urlpatterns = [
    path('jogos/', ListaJogosView.as_view(), name ='lista-jogos'),
    path('jogos/<int:pk>/', DetalheJogoView.as_view(), name='detalhe-jogo'),
]