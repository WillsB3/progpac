def default(request):
    from progpac.core.models import Level

    # last_level_hash = request.session.get('last_level_hash')
    # if last_level_hash:
    #     last_level = Level.objects.get(hash=last_level_hash)
    # else:
    #     last_level = Level.objects.all()[0]

    return {
        'tutorial_levels': Level.objects.filter(tier__name="Tutorial"),
        'game_levels': Level.objects.exclude(tier__name="Tutorial")
    }
