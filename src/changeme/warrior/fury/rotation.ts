import { AutoAttack } from './spells';

const Module = Caffeine.Module.New('warrior_fury');

const Player = Caffeine.UnitManager.Get('player');
const Target = Caffeine.UnitManager.Get('target');

AutoAttack.CastableIf(
  (self) =>
    self.IsKnownAndUsable() &&
    !Player.IsCastingOrChanneling() &&
    Target.Exists() &&
    Target.IsAffectingCombat()
);

AutoAttack.Condition('attack', (self) => !IsCurrentSpell(self.GetID()));
AutoAttack.OnCast(() => Caffeine.Print('Casting Auto Attack'));

Module.Sync(() => {
  Caffeine.Print('test');
  AutoAttack.Cast(Target);
});

Caffeine.Register(Module);
