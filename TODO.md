- should the hasInteractionCircle have concepts for 'entering' and 'leaving'? right now the indicator animation is force-played and it shouldn't be
  - yes.
  - have 3 lists - `entering`, `active` and `exiting`. each frame an id gets sent to the next list, if applicable

- systems probably should put their vars on the entities in buckets, rather than keep them all on the same flat level

- interact with the sign

- state graph visualization

- enemy

- controlable controls should be used every where, no raw key codes
