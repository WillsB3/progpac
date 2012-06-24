import json

from django.views.generic import FormView, RedirectView, TemplateView, View
from django.utils import simplejson as json
from django.http import HttpResponseRedirect, HttpResponse

from progpac.core import forms
from progpac.core import models
from progpac.language import language


class Home(RedirectView):
    permanent = False

    def get_redirect_url(self, **kwargs):
        last_level_hash = self.request.session.get('last_level_hash', None)
        if last_level_hash:
            level = models.Level.objects.get(hash=last_level_hash)
        else:
            level = models.Level.objects.all()[:1].get()
            self.request.session['last_level_hash'] = level.hash

        return level.get_absolute_url()


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
            # "form": form,
            "errors": parser.errors,
            "code": code
        }

        if code.find("@") > -1 and parser.program_length <= self.level.maxsize:
            context['level_next'] = self.level.next
            initial=dict(
                level=self.level,
                program=form.cleaned_data['text'],
                email=self.request.session.get("email", "someone@somewhere.com"),
                username=self.request.session.get("username", "someone")
            )
            context['result_form'] = forms.ResultForm(initial=initial)
            self.request.session['last_level_hash'] = self.level.next.hash

        if self.request.POST['submit'] == 'Debug':
            context.update({
                "debug_code1": code,
            })
        return HttpResponse(json.dumps(context), 'application/json')


class ResultSave(View):

    def post(self, request):
        form = forms.ResultForm(request.POST)

        if form.is_valid():

            self.request.session["email"] = form.cleaned_data['email']
            self.request.session["username"] = form.cleaned_data['username']

            level = form.cleaned_data['level']

            parser = language.Language(
                form.cleaned_data['program']
            )
            bug = language.Bug(parser.code, level)
            bug_steps = bug.walk()

            code = "".join(bug_steps)

            if code.find("@") > -1 and parser.program_length <= level.maxsize:
                result = form.save(commit=False)
                result.program_length = parser.program_length
                result.save()
                return HttpResponseRedirect(level.next.get_absolute_url())

        return HttpResponseRedirect(level.get_absolute_url())


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

