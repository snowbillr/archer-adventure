- shooting in the air

- move camera to be more towards the direction the player is facing

- npcs and dialog

- enemy

- replace hurtboxes, bounding box, interaction circle all with an `Attachment` class that takes care of syncing location/offset/rotation/scale

- use an `InteractionTracker` for the entered/active/exiting states of entity ids

- state graph visualization

- reset slide state to old movement values
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
