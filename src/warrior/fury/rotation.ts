import { AutoAttack, Charge, HeroicStrike } from './spells';

const Module = Caffeine.Module.New('warrior_fury');

const Player = Caffeine.UnitManager.Get('player');
const Target = Caffeine.UnitManager.Get('target');
const None = Caffeine.UnitManager.Get('none');

const CombatAPL = Caffeine.APL.New('default');
const RestingAPL = Caffeine.APL.New('resting');

CombatAPL.AddSpell(
  AutoAttack.CastableIf(
    (Spell) =>
      Spell.IsKnownAndUsable() &&
      Target.Exists() &&
      Target.IsHostile() &&
      Player.IsFacing(Target) &&
      !IsCurrentSpell(AutoAttack.GetID())
  ).SetTarget(Target)
);

CombatAPL.AddSpell(
  Charge.CastableIf(
    (spell) =>
      spell.IsKnownAndUsable() &&
      Target.Exists() &&
      Target.IsHostile() &&
      Target.GetDistance(Player) > 8 &&
      Player.IsFacing(Target) &&
      spell.IsInRange(Target)
  ).SetTarget(Target)
);

CombatAPL.AddSpell(
  HeroicStrike.CastableIf(
    (Spell) =>
      Spell.IsKnownAndUsable() &&
      Target.Exists() &&
      Target.IsHostile() &&
      Player.IsFacing(Target) &&
      Spell.IsInRange(Target)
  ).SetTarget(Target)
);

Module.Sync(() => {
  if (Player.IsMounted()) return;

  if (Player.IsAffectingCombat()) {
    if (!Player.IsCastingOrChanneling()) {
      CombatAPL.Execute();
    }
  } else {
    RestingAPL.Execute();
  }
});

Caffeine.Register(Module);
