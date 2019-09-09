- CURRENT BRANCH SPECIFIC
  - almost only creating things by prefab - markers still get 'created' when they shouldn't
  - basescene should be the one responsible for creating the adventurer, not the areamanager

- map areas shouldn't have an adventurer layer, but instead declare it needs an adventurer
  - should have a marker where the adventurer should start
- adventurer should be a prefab that gets created by the area manager

- should the hasInteractionCircle have concepts for 'entering' and 'leaving'? right now the indicator animation is force-played and it shouldn't be
  - yes.
  - have 3 lists - `entering`, `active` and `exiting`. each frame an id gets sent to the next list, if applicable

- systems probably should put their vars on the entities in buckets, rather than keep them all on the same flat level

- interact with the sign

- state graph visualization

- enemy

- controlable controls should be used every where, no raw key codes
