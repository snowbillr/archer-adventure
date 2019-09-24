CURRENT BRANCH:
  - shoot left and shoot right states

- npcs and dialog

- bow attacks
  - projectiles


- enemy

- state graph visualization

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
