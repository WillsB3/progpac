from django.views.generic import FormView, TemplateView, View
from django.utils import simplejson as json
from django.http import HttpResponseRedirect, HttpResponse

from progpac.core import forms
from progpac.core import models
from progpac.language import language


class Home(TemplateView):
    template_name = "home.html"

    def post(self, *args, **kwargs):
        self.request.session['username'] = self.request.POST.get('username')

        if self.request.POST.get('submit') == 'Tutorial':
            levels = models.Level.objects.filter(tier__name="Tutorial")
        elif self.request.POST.get('submit') == 'Start Game':
            levels = models.Level.objects.exclude(tier__name="Tutorial")

        return HttpResponseRedirect(levels[0].get_absolute_url())


class Level(FormView):
    template_name = "level.html"
    form_class = forms.Editor

    def get_initial(self):
        return {"text": self.request.session.get(self.level.hash, "")}

    @property
    def level(self):
        return models.Level.objects.get(hash=self.kwargs.get('level_hash'))

    def get_context_data(self, *args, **kwargs):
        context = super(Level, self).get_context_data(*args, **kwargs)
        context["level_json"] = json.dumps(self.level.lines)
        context["level"] = self.level
        return context

    def form_valid(self, form):
        self.request.session[self.level.hash] = form.cleaned_data['text']

        parser = language.Language(
            form.cleaned_data['text'],
        )

        bug = language.Bug(parser.code, self.level)
        bug_steps = bug.walk()

        code = "".join(bug_steps)

        context = {
            "errors": parser.errors,
            "code": code,
            'success': False
        }

        if code.find("@") > -1 and parser.program_length <= self.level.maxsize:
            context['success'] = True
            next_level = self.level.next

            if next_level:
                context['next_level'] = next_level.get_absolute_url()

        return HttpResponse(json.dumps(context), 'application/json')


class Help(TemplateView):
    template_name = "help.html"


class Results(TemplateView):
    template_name = "results.html"

    def get_context_data(self, *args, **kwargs):
        return {
            "levels": models.Level.objects.all()
        }

class ResultsLevel(TemplateView):
    template_name = "results_level.html"

    def get_context_data(self, *args, **kwargs):
        results = models.Result.objects\
                               .filter(level__pk=kwargs['level_pk'])\
                               .order_by("program_length", "commited")

        return {
            "results": results
        }

