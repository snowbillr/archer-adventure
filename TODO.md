- npcs and dialog

- bow attack animations
  - bounds
  - hurtboxes
- bow projectiles

- sys manager plugin shouldn't need to have its `update` method called by the scene

- enemy

- state graph visualization

- controlable controls should be used every where, no raw key codes
  - or at least have a `jumpKey` and a `jumpKeyCode` or something like that

- get rid of slide state
- replace with 'ability'

ability is either dash or anchor
level them up on a slider, so you are either working towards dash or anchor, but not both
both are limited by the number of charges and the recharge time
dash:
  you dash forward for a short distance
  level ups:
    - distance increased
    - invincible while dashing
    - damage enemy while dashing through them
    - if you kill an enemy it refills a charge imeediately
anchor:
  you anchor yourself in place and do more damage with your arrows
  level ups:
    - damage increased
    - take less damage when hit
    - arrows pass through 1 enemy
    - if you kill an enemy behind another one, you refill a charge immediately
