from django.db import models


class Jogo(models.Model):
    nome = models.CharField(max_length=100)
    genero = models.CharField(max_length=50)
    plataforma = models.CharField(max_length=50)
    ano_lancamento = models.IntegerField()
    favorito = models.BooleanField(default=False)

    def __str__(self):
        return self.nome

