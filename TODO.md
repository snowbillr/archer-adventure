- hitboxes
  - enemy

- damage system
  - hitboxes and hurtboxes interacting

- scale up graphics 2x
  - change the actual sprites and get rid of the `scale` property
  - gives a chance to do some asset cleanup work
  - use a mouse

- wall cling and wall jump

- replace hurtboxes, bounding box, interaction circle, hitboxes all with an `Attachment` class that takes care of syncing location/offset/rotation/scale

- move camera to be more towards the direction the player is facing

- npcs and dialog

- state graph visualization

- create Abilities

Abilities:
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

- refactor: register prefabs in one place, register state sets in another. need to make uniform
- each system should define a shape for its EntityRegistrationData. makes it easy to find the list of properties to put in the prefab
