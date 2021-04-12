from django.test import TestCase
from .models import Recommandation

class RecommandationTestCase(TestCase):

    def setUp(self):
        Recommandation.objects.create(title='test rec')
        Recommandation.objects.create(description='test description')
        Recommandation.objects.create(trackId="123123123")

    def test_title_contnet(self):
        recomands = Recommandation.objects.get(id=1)
        expected_object_name = f'{recomands.title}'
        self.assertEqual(expected_object_name, 'test rec')

    def test_description_content(self):
        recomands = Recommandation.objects.get(id=2)
        expected_object_name = f'{recomands.description}'
        self.assertEqual(expected_object_name, 'test description')
