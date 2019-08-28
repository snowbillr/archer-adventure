- rename systems to `hasInteractionCircle`, `hasSprite`
  - what about the sign system? feels almost too specific. maybe there is an `interactsWith` system to be built that takes a set of tags and a callback?
  - oh shit - just use a new one for each pair of tags you assign it to
- organize types for tag/entity system
- having to mark some fields with a `!` all over the place feels wrong
- should we have concepts for 'entering' and 'leaving'? right now the indicator animation is force-played and it shouldn't be
- convert remaining "components" to tag/entity system

aside:
> this is starting to feel a hell of a lot like react hooks - especially the `hasIndicator` system

- interact with the sign

- animal walking around in fence

- state graph visualization

- enemy

- go into house

- controlable controls should be used every where, no raw key codes
